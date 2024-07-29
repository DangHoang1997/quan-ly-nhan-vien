/*

*/
let arrNv= [];
function getmyELe(id){
    return document.getElementById(id);
}
function PerSon(code, ten, email, pass, ngaylam, luongCoBan, chucVu, gioLam) {
    this.code = code;
    this.ten = ten;
    this.email = email;
    this.pass = pass;
    this.ngaylam = ngaylam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    // Gọi phương thức để tính lương
    

    // Định nghĩa phương thức tinhTongLuong
    this.tinhTongLuong = function() {
        switch (this.chucVu) {
            case "Giám đốc":
                return this.luongCoBan * 3;
            case "Trưởng phòng":
                return this.luongCoBan * 2;
            case "Nhân viên":
                return this.luongCoBan * 1;
            default:
                return 0;
        }
    };
    
    // phương thức xếp loại 
    this.xepLoai = function(){
        if(this.gioLam >= 192){return "nhân viên xuất sắc"}
        if(this.gioLam >= 176){return "nhân viên giỏi"}
        if(this.gioLam >= 160){return "nhân viên khá"}
        return "nhân viên trung bình";
    };
    
}

// Nếu bạn cần thêm phương thức xepLoai, hãy định nghĩa nó tương tự




getmyELe('btnThemNV').addEventListener('click',function(){
    // var code = getmyELe('tknv').value;
    // var ten = getmyELe('name').value;
    // var email = getmyELe('email').value;
    // var pass = getmyELe('password').value;
    // var ngaylam = getmyELe('datepicker').value;
    // var luongCoBan = getmyELe('luongCB').value*1;
    // var chucVu = getmyELe('chucvu').value;
    // var gioLam = getmyELe('gioLam').value;

    // var sv1 = new PerSon(code,ten,email,pass,ngaylam,luongCoBan,chucVu,gioLam);
    
       if(validateInput()==true){
        var sv1 = laythongtintuInput();
        arrNv.push(sv1);
        console.log(arrNv);
        listNv();
       }
    
   
    

})

// in ra table
// function listNv(){
//     var output = "";
//     for(var i = 0; i < arrNv.length ; i++){
//             var sv = arrNv[i];
//             var tring = 
//             `<tr>
//             <td>${sv.code}</td>
//             <td>${sv.ten}</td>
//             <td>${sv.email}</td>
//             <td>${sv.ngaylam}</td>
//             <td>${sv.chucVu}</td>
//             <td>${sv.tinhTongLuong()}</td>
//             <td>${sv.xepLoai()}</td>
//             <td>
//             <button onclick ="xoaMa('${sv.code}')">xóa</button>
//             <button onclick ="suaMa('${sv.code}')">sửa</button>
//             </td>
//             </tr>`
//             output +=tring; 
//     }
//     getmyELe('tableDanhSach').innerHTML =output;
// }


// xóa code
function xoaMa(code){
    var index = arrNv.findIndex(function(element){
        return element.code === code;
    })
    if(index !==-1){
        arrNv.splice(index,1);
        listNv();
    }
}
// sửa code 
function suaMa(code){
    var index = arrNv.findIndex(function(element){
        return element.code === code;
    })
    if(index !==-1){
        var sv = arrNv[index]
        getmyELe('tknv').value = sv.code;
        getmyELe('name').value = sv.ten;
        getmyELe('email').value= sv.email;
        getmyELe('password').value =  sv.pass;
        getmyELe('datepicker').value = sv.ngaylam;
        getmyELe('luongCB').value = sv.luongCoBan
        getmyELe('chucvu').value = sv.chucVu;
        getmyELe('gioLam').value = sv.gioLam;
        // không cho sửa id
        getmyELe('tknv').setAttribute('readonly', true);
        
    }

}
// hàm cập nhập
getmyELe( "btnCapNhat").addEventListener("click",function(){

    
     if(validateInput()==true){
        var sv = laythongtintuInput();
        console.log(sv);
        var code = getmyELe('tknv').value;
        var index = arrNv.findIndex(function(element){
            return  element.code === code;
        })
        if(index !==-1){
            arrNv[index] = sv;
            listNv();
        }
     }
    

})
// hàm lấy thông tin từ input 
function laythongtintuInput(){
    var code = getmyELe('tknv').value;
    var ten = getmyELe('name').value;
    var email = getmyELe('email').value;
    var pass = getmyELe('password').value;
    var ngaylam = getmyELe('datepicker').value;
    var luongCoBan = getmyELe('luongCB').value*1;
    var chucVu = getmyELe('chucvu').value;
    var gioLam = getmyELe('gioLam').value;

    var sv1 = new PerSon(code,ten,email,pass,ngaylam,luongCoBan,chucVu,gioLam);;

 return sv1;   
}
//hàm viết thêm validation 
function validateInput() {
    laythongtintuInput();
    var i = arrNv[index];

    // Kiểm tra các điều kiện
    if (!/^(\d{4,6})$/.test(i.code)) {
        alert("Tài khoản phải là 4 - 6 ký số và không để trống");
        return false;
    }
    if (!/^[A-Za-z\s]+$/.test(i.ten)) {
        alert("Tên nhân viên phải là chữ và không để trống");
        return false;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(i.email)) {
        alert("Email phải đúng định dạng và không để trống");
        return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,10}$/;
    if (!passwordRegex.test(i.pass)) {
        alert("Mật khẩu phải có 6-10 ký tự với ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt và không để trống");
        return false;
    }
    if (!isValidDate(i.ngaylam)) {
        alert("Ngày làm không hợp lệ, định dạng mm/dd/yyyy và không để trống");
        return false;
    }
    if (i.luongCoBan < 1000000 || i.luongCoBan > 20000000) {
        alert("Lương cơ bản phải từ 1.000.000 - 20.000.000 và không để trống");
        return false;
    }
    const validRoles = ["Giám đốc", "Trưởng phòng", "Nhân viên"];
    if (!validRoles.includes(i.chucVu)) {
        alert("Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng phòng, Nhân viên)");
        return false;
    }
    if (i.gioLam < 80 || i.gioLam > 200) {
        alert("Số giờ làm trong tháng phải từ 80 - 200 giờ và không để trống");
        return false;
    }
    return true; // Nếu tất cả điều kiện hợp lệ
}
function isValidDate(dateString) {
    const regex = /^(0[1-9]|1[0-2])\/([0-2][0-9]|3[0-1])\/(20[0-9]{2}|19[0-9]{2})$/;
    return dateString.match(regex);
}

// tìm kiếm nhân viên 



// Hàm hiển thị danh sách nhân viên
// Tìm kiếm nhân viên
function timKiemNhanVien() {
    let searchText = document.getElementById("searchName").value.toLowerCase().trim();
    let ketQuaTimKiem = arrNv.filter(nv => 
        nv.code.toLowerCase().includes(searchText) ||
        nv.ten.toLowerCase().includes(searchText) ||
        nv.email.toLowerCase().includes(searchText) ||
        nv.chucVu.toLowerCase().includes(searchText) ||
        nv.xepLoai().toLowerCase().includes(searchText) // Tìm kiếm theo loại xếp loại
    );
    listNv(ketQuaTimKiem);
}

// Thêm event listener cho nút tìm kiếm
document.getElementById("btnTimNV").addEventListener("click", function(event) {
    event.preventDefault(); // Ngăn chặn form submit (nếu nút nằm trong form)
    timKiemNhanVien();
});

// Thêm event listener cho input để tìm kiếm real-time (tùy chọn)
document.getElementById("searchName").addEventListener("input", timKiemNhanVien);

// Cập nhật hàm hiển thị danh sách nhân viên
function listNv(data = arrNv) {
    let output = "";
    for (let i = 0; i < data.length; i++) {
        let sv = data[i];
        let tring = 
        `<tr>
        <td>${sv.code}</td>
        <td>${sv.ten}</td>
        <td>${sv.email}</td>
        <td>${sv.ngaylam}</td>
        <td>${sv.chucVu}</td>
        <td>${sv.tinhTongLuong().toLocaleString()}</td>
        <td>${sv.xepLoai()}</td>
        <td>
        <button onclick="xoaMa('${sv.code}')">Xóa</button>
        <button onclick="suaMa('${sv.code}')">Sửa</button>
        </td>
        </tr>`;
        output += tring; 
    }
    getmyELe('tableDanhSach').innerHTML = output; // Cập nhật bảng hiển thị
}

// Hàm khởi tạo ban đầu
function init() {
    listNv(); // Hiển thị danh sách nhân viên khi trang được tải
}

// Gọi hàm khởi tạo khi trang web được load
window.onload = init;




