// Định nghĩa lớp Nhân viên
class NhanVien {
    constructor(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {
        this.taiKhoan = taiKhoan;
        this.hoTen = hoTen;
        this.email = email;
        this.matKhau = matKhau;
        this.ngayLam = ngayLam;
        this.luongCoBan = luongCoBan;
        this.chucVu = chucVu;
        this.gioLam = gioLam;
        this.tongLuong = this.tinhTongLuong();
        this.loaiNhanVien = this.xepLoai();
    }

    tinhTongLuong() {
        switch (this.chucVu) {
            case 'Giám đốc':
                return this.luongCoBan * 3;
            case 'Trưởng phòng':
                return this.luongCoBan * 2;
            case 'Nhân viên':
                return this.luongCoBan;
            default:
                return 0;
        }
    }

    xepLoai() {
        if (this.gioLam >= 192) return 'Xuất sắc';
        if (this.gioLam >= 176) return 'Giỏi';
        if (this.gioLam >= 160) return 'Khá';
        return 'Trung bình';
    }
}

// Mảng lưu trữ danh sách nhân viên
let danhSachNhanVien = [];

// Hàm thêm nhân viên mới
function themNhanVien() {
    // Lấy thông tin từ form
    const taiKhoan = document.getElementById('tknv').value;
    const hoTen = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const matKhau = document.getElementById('password').value;
    const ngayLam = document.getElementById('datepicker').value;
    const luongCoBan = parseFloat(document.getElementById('luongCB').value);
    const chucVu = document.getElementById('chucvu').value;
    const gioLam = parseFloat(document.getElementById('gioLam').value);

    // Validation
    if (!validateInput(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam)) {
        return;
    }

    // Tạo đối tượng nhân viên mới
    const nhanVien = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);

    // Thêm vào danh sách
    danhSachNhanVien.push(nhanVien);

    // Cập nhật bảng
    hienThiDanhSachNhanVien();

    // Reset form
    document.getElementById('myModal').reset();
}

// Hàm hiển thị danh sách nhân viên
function hienThiDanhSachNhanVien() {
    const tbody = document.getElementById('tableDanhSach');
    tbody.innerHTML = '';

    danhSachNhanVien.forEach((nv, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.loaiNhanVien}</td>
            <td>
                <button onclick="xoaNhanVien(${index})" class="btn btn-danger">Xóa</button>
                <button onclick="suaNhanVien(${index})" class="btn btn-warning">Sửa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Hàm validation
function validateInput(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {
    let isValid = true;

    // Validation logic here
    // For example:
    if (taiKhoan.length < 4 || taiKhoan.length > 6) {
        document.getElementById('tbTKNV').innerText = 'Tài khoản phải từ 4-6 ký số';
        isValid = false;
    }

    // Add more validation checks for other fields

    return isValid;
}

// Hàm xóa nhân viên
function xoaNhanVien(index) {
    danhSachNhanVien.splice(index, 1);
    hienThiDanhSachNhanVien();
}

// Hàm sửa nhân viên
function suaNhanVien(index) {
    // Populate form with employee data
    const nv = danhSachNhanVien[index];
    document.getElementById('tknv').value = nv.taiKhoan;
    // Populate other fields

    // Change button to update
    document.getElementById('btnThemNV').style.display = 'none';
    document.getElementById('btnCapNhat').style.display = 'inline-block';
    document.getElementById('btnCapNhat').onclick = function() {
        capNhatNhanVien(index);
    };
}

// Hàm cập nhật nhân viên
function capNhatNhanVien(index) {
    // Get updated info from form
    const taiKhoan = document.getElementById('tknv').value;
    // Get other fields

    // Validation
    if (!validateInput(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam)) {
        return;
    }

    // Update employee
    danhSachNhanVien[index] = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);

    // Update table
    hienThiDanhSachNhanVien();

    // Reset form and buttons
    document.getElementById('myModal').reset();
    document.getElementById('btnThemNV').style.display = 'inline-block';
    document.getElementById('btnCapNhat').style.display = 'none';
}

// Hàm tìm nhân viên theo loại
function timNhanVienTheoLoai() {
    const loai = document.getElementById('searchName').value.toLowerCase();
    const ketQua = danhSachNhanVien.filter(nv => nv.loaiNhanVien.toLowerCase().includes(loai));
    hienThiKetQuaTimKiem(ketQua);
}

// Hàm hiển thị kết quả tìm kiếm
function hienThiKetQuaTimKiem(ketQua) {
    const tbody = document.getElementById('tableDanhSach');
    tbody.innerHTML = '';

    ketQua.forEach((nv, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.loaiNhanVien}</td>
            <td>
                <button onclick="xoaNhanVien(${index})" class="btn btn-danger">Xóa</button>
                <button onclick="suaNhanVien(${index})" class="btn btn-warning">Sửa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Event listeners
document.getElementById('btnThemNV').addEventListener('click', themNhanVien);
document.getElementById('btnTimNV').addEventListener('click', timNhanVienTheoLoai);

// Initial display
hienThiDanhSachNhanVien();