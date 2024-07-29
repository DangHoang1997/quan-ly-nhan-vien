let arrNv = [];

function getmyELe(id) {
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

    this.xepLoai = function() {
        if(this.gioLam >= 192) return "Nhân viên xuất sắc";
        if(this.gioLam >= 176) return "Nhân viên giỏi";
        if(this.gioLam >= 160) return "Nhân viên khá";
        return "Nhân viên trung bình";
    };
}

// Kiểm tra định dạng ngày hợp lệ
function isValidDate(dateString) {
    const regex = /^(0[1-9]|1[0-2])\/([0-2][0-9]|3[0-1])\/(20[0-9]{2}|19[0-9]{2})$/;
    return dateString.match(regex);
}

// Hàm kiểm tra tính hợp lệ
function validateInput() {
    const code = getmyELe('tknv').value;
    const ten = getmyELe('name').value;
    const email = getmyELe('email').value;
    const pass = getmyELe('password').value;
    const ngaylam = getmyELe('datepicker').value;
    const luongCoBan = +getmyELe('luongCB').value;
    const chucVu = getmyELe('chucvu').value;
    const gioLam = +getmyELe('gioLam').value;

    // Kiểm tra các điều kiện
    if (!/^(\d{4,6})$/.test(code)) {
        alert("Tài khoản phải là 4 - 6 ký số và không để trống");
        return false;
    }
    if (!/^[A-Za-z\s]+$/.test(ten)) {
        alert("Tên nhân viên phải là chữ và không để trống");
        return false;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        alert("Email phải đúng định dạng và không để trống");
        return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,10}$/;
    if (!passwordRegex.test(pass)) {
        alert("Mật khẩu phải có 6-10 ký tự với ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt và không để trống");
        return false;
    }
    if (!isValidDate(ngaylam)) {
        alert("Ngày làm không hợp lệ, định dạng mm/dd/yyyy và không để trống");
        return false;
    }
    if (luongCoBan < 1000000 || luongCoBan > 20000000) {
        alert("Lương cơ bản phải từ 1.000.000 - 20.000.000 và không để trống");
        return false;
    }
    const validRoles = ["Giám đốc", "Trưởng phòng", "Nhân viên"];
    if (!validRoles.includes(chucVu)) {
        alert("Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)");
        return false;
    }
    if (gioLam < 80 || gioLam > 200) {
        alert("Số giờ làm trong tháng phải từ 80 - 200 giờ và không để trống");
        return false;
    }
    return true; // Nếu tất cả điều kiện hợp lệ
}

// Sự kiện khi nh  
