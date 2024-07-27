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
            case "giám đốc":
                return this.luongCoBan * 3;
            case "trưởng phường":
                return this.luongCoBan * 2;
            case "nhân viên":
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
    var sv1 = laythongtintuInput();
    arrNv.push(sv1);
    console.log(arrNv);
    listNv();
    

})

// in ra table
function listNv(){
    var output = "";
    for(var i = 0; i < arrNv.length ; i++){
            var sv = arrNv[i];
            var tring = 
            `<tr>
            <td>${sv.code}</td>
            <td>${sv.ten}</td>
            <td>${sv.email}</td>
            <td>${sv.ngaylam}</td>
            <td>${sv.chucVu}</td>
            <td>${sv.tinhTongLuong()}</td>
            <td>${sv.xepLoai()}</td>
            <td>
            <button onclick ="xoaMa('${sv.code}')">xóa</button>
            <button onclick ="suaMa('${sv.code}')">sửa</button>
            </td>
            </tr>`
            output +=tring; 
    }
    getmyELe('tableDanhSach').innerHTML =output;
}
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