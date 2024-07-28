// Định nghĩa lớp NhanVien
class NhanVien {
    constructor(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {
        this.taiKhoan = taiKhoan;
        this.hoTen = hoTen;
        this.email = email;
        this.matKhau = matKhau;
        this.ngayLam = ngayLam;
        this.luongCoBan = parseFloat(luongCoBan);
        this.chucVu = chucVu;
        this.gioLam = parseFloat(gioLam);
        this.tongLuong = this.tinhTongLuong();
        this.loaiNhanVien = this.xepLoai();
    }

    tinhTongLuong() {
        switch(this.chucVu) {
            case "Giám đốc":
                return this.luongCoBan * 3;
            case "Trưởng Phòng":
                return this.luongCoBan * 2;
            case "Nhân Viên":
                return this.luongCoBan;
            default:
                return 0;
        }
    }

    xepLoai() {
        if (this.gioLam >= 192) return "Xuất sắc";
        if (this.gioLam >= 176) return "Giỏi";
        if (this.gioLam >= 160) return "Khá";
        return "Trung bình";
    }
}

// Mảng lưu trữ danh sách nhân viên
let danhSachNhanVien = [];

// Hàm thêm nhân viên mới
function themNhanVien() {
    // Lấy dữ liệu từ form
    let taiKhoan = document.getElementById("tknv").value;
    let hoTen = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let matKhau = document.getElementById("password").value;
    let ngayLam = document.getElementById("datepicker").value;
    let luongCoBan = document.getElementById("luongCB").value;
    let chucVu = document.getElementById("chucvu").value;
    let gioLam = document.getElementById("gioLam").value;

    // Validation
    if (!validateInput(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam)) {
        return;
    }

    // Tạo đối tượng nhân viên mới
    let nhanVien = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);

    // Thêm vào mảng
    danhSachNhanVien.push(nhanVien);

    // Hiển thị danh sách
    hienThiDanhSach();

    // Reset form
    document.getElementById("formNhanVien").reset();
}

// Hàm hiển thị danh sách nhân viên
function hienThiDanhSach(danhSach = danhSachNhanVien) {
    let tbody = document.getElementById("tableDanhSach");
    tbody.innerHTML = "";
    danhSach.forEach((nv, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong.toLocaleString()}</td>
            <td>${nv.loaiNhanVien}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaNhanVien(${index})">Xóa</button>
                <button class="btn btn-warning" onclick="suaNhanVien(${index})">Sửa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Hàm xóa nhân viên
function xoaNhanVien(index) {
    danhSachNhanVien.splice(index, 1);
    hienThiDanhSach();
}

// Hàm sửa nhân viên
function suaNhanVien(index) {
    let nv = danhSachNhanVien[index];
    document.getElementById("tknv").value = nv.taiKhoan;
    document.getElementById("name").value = nv.hoTen;
    document.getElementById("email").value = nv.email;
    document.getElementById("password").value = nv.matKhau;
    document.getElementById("datepicker").value = nv.ngayLam;
    document.getElementById("luongCB").value = nv.luongCoBan;
    document.getElementById("chucvu").value = nv.chucVu;
    document.getElementById("gioLam").value = nv.gioLam;

    document.getElementById("btnThemNV").style.display = "none";
    document.getElementById("btnCapNhat").style.display = "inline-block";
    document.getElementById("btnCapNhat").onclick = function() {
        capNhatNhanVien(index);
    };

    $('#myModal').modal('show');
}

// Hàm cập nhật nhân viên
function capNhatNhanVien(index) {
    let taiKhoan = document.getElementById("tknv").value;
    let hoTen = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let matKhau = document.getElementById("password").value;
    let ngayLam = document.getElementById("datepicker").value;
    let luongCoBan = document.getElementById("luongCB").value;
    let chucVu = document.getElementById("chucvu").value;
    let gioLam = document.getElementById("gioLam").value;

    if (!validateInput(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam)) {
        return;
    }

    let nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);
    danhSachNhanVien[index] = nv;

    hienThiDanhSach();
    $('#myModal').modal('hide');

    document.getElementById("btnThemNV").style.display = "inline-block";
    document.getElementById("btnCapNhat").style.display = "none";
    document.getElementById("formNhanVien").reset();
}

// Hàm tìm kiếm nhân viên theo xếp loại
function timKiemNhanVien() {
    let xepLoai = document.getElementById("xepLoai").value.toLowerCase();
    let ketQuaTimKiem;
    
    if (xepLoai === "") {
        ketQuaTimKiem = danhSachNhanVien;
    } else {
        ketQuaTimKiem = danhSachNhanVien.filter(nv => 
            nv.loaiNhanVien.toLowerCase() === xepLoai
        );
    }
    
    hienThiDanhSach(ketQuaTimKiem);
}

// Hàm validation
function validateInput(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {
    let isValid = true;

    // Tài khoản
    if (taiKhoan.length < 4 || taiKhoan.length > 6 || !/^\d+$/.test(taiKhoan)) {
        document.getElementById("tbTKNV").innerHTML = "Tài khoản phải có 4-6 ký số";
        isValid = false;
    } else {
        document.getElementById("tbTKNV").innerHTML = "";
    }

    // Họ tên
    if (!/^[a-zA-Z\s]+$/.test(hoTen)) {
        document.getElementById("tbTen").innerHTML = "Tên nhân viên phải là chữ";
        isValid = false;
    } else {
        document.getElementById("tbTen").innerHTML = "";
    }

    // Email
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        document.getElementById("tbEmail").innerHTML = "Email không hợp lệ";
        isValid = false;
    } else {
        document.getElementById("tbEmail").innerHTML = "";
    }

    // Mật khẩu
    if (!/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,10}$/.test(matKhau)) {
        document.getElementById("tbMatKhau").innerHTML = "Mật khẩu phải từ 6-10 ký tự, chứa ít nhất 1 số, 1 ký tự in hoa, 1 ký tự đặc biệt";
        isValid = false;
    } else {
        document.getElementById("tbMatKhau").innerHTML = "";
    }

    // Ngày làm
    if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(ngayLam)) {
        document.getElementById("tbNgay").innerHTML = "Ngày làm không hợp lệ (mm/dd/yyyy)";
        isValid = false;
    } else {
        document.getElementById("tbNgay").innerHTML = "";
    }

    // Lương cơ bản
    if (luongCoBan < 1000000 || luongCoBan > 20000000) {
        document.getElementById("tbLuongCB").innerHTML = "Lương cơ bản phải từ 1,000,000 đến 20,000,000";
        isValid = false;
    } else {
        document.getElementById("tbLuongCB").innerHTML = "";
    }

    // Chức vụ
    if (chucVu === "0") {
        document.getElementById("tbChucVu").innerHTML = "Vui lòng chọn chức vụ";
        isValid = false;
    } else {
        document.getElementById("tbChucVu").innerHTML = "";
    }

    // Giờ làm
    if (gioLam < 80 || gioLam > 200) {
        document.getElementById("tbGiolam").innerHTML = "Số giờ làm phải từ 80 đến 200 giờ";
        isValid = false;
    } else {
        document.getElementById("tbGiolam").innerHTML = "";
    }

    return isValid;
}

// Event listeners
document.getElementById("btnThemNV").addEventListener("click", themNhanVien);
document.getElementById("btnTimKiem").addEventListener("click", timKiemNhanVien);

// Khởi tạo DatePicker
$(function() {
    $("#datepicker").datepicker({
        dateFormat: "mm/dd/yy"
    });
});

// Initial display
hienThiDanhSach();