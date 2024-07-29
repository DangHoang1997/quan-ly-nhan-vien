// Danh sách nhân viên
let arrNv = [];

// Hàm lấy phần tử DOM
function getmyELe(id) {
  return document.getElementById(id);
}

// Hàm kiểm tra định dạng ngày hợp lệ
function isValidDate(dateString) {
  const regex =
    /^(0[1-9]|1[0-2])\/([0-2][0-9]|3[0-1])\/(20[0-9]{2}|19[0-9]{2})$/;
  return regex.test(dateString);
}

// Định nghĩa đối tượng PerSon
function PerSon(code, ten, email, pass, ngaylam, luongCoBan, chucVu, gioLam) {
  this.code = code;
  this.ten = ten;
  this.email = email;
  this.pass = pass;
  this.ngaylam = ngaylam;
  this.luongCoBan = luongCoBan;
  this.chucVu = chucVu;
  this.gioLam = gioLam;

  // Tính tổng lương
  this.tinhTongLuong = function () {
    const multipliers = { "Giám đốc": 3, "Trưởng phòng": 2, "Nhân viên": 1 };
    return this.luongCoBan * (multipliers[this.chucVu] || 0);
  };

  // Xếp loại nhân viên
  this.xepLoai = function () {
    if (this.gioLam >= 192) return "nhân viên xuất sắc";
    if (this.gioLam >= 176) return "nhân viên giỏi";
    if (this.gioLam >= 160) return "nhân viên khá";
    return "nhân viên trung bình";
  };
}

// Hàm lấy thông tin từ input và tạo đối tượng PerSon
function laythongtintuInput() {
  return new PerSon(
    getmyELe("tknv").value,
    getmyELe("name").value,
    getmyELe("email").value,
    getmyELe("password").value,
    getmyELe("datepicker").value,
    +getmyELe("luongCB").value,
    getmyELe("chucvu").value,
    +getmyELe("gioLam").value
  );
}

// Hàm kiểm tra các điều kiện hợp lệ
function validateInput() {
  const thongtin = laythongtintuInput();

  if (!/^(\d{4,6})$/.test(thongtin.code))
    return alert("Tài khoản phải là 4 - 6 ký số và không để trống"), false;
  if (!/^[A-Za-z\s]+$/.test(thongtin.ten))
    return alert("Tên nhân viên phải là chữ và không để trống"), false;
  if (!/^\S+@\S+\.\S+$/.test(thongtin.email))
    return alert("Email phải đúng định dạng và không để trống"), false;
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,10}$/.test(
      thongtin.pass
    )
  )
    return (
      alert(
        "Mật khẩu phải có 6-10 ký tự với ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt và không để trống"
      ),
      false
    );
  if (!isValidDate(thongtin.ngaylam))
    return (
      alert("Ngày làm không hợp lệ, định dạng mm/dd/yyyy và không để trống"),
      false
    );
  if (thongtin.luongCoBan < 1000000 || thongtin.luongCoBan > 20000000)
    return (
      alert("Lương cơ bản phải từ 1.000.000 - 20.000.000 và không để trống"),
      false
    );
  if (!["Giám đốc", "Trưởng phòng", "Nhân viên"].includes(thongtin.chucVu))
    return (
      alert(
        "Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)"
      ),
      false
    );
  if (thongtin.gioLam < 80 || thongtin.gioLam > 200)
    return (
      alert("Số giờ làm trong tháng phải từ 80 - 200 giờ và không để trống"),
      false
    );

  return true;
}

// Hàm hiển thị danh sách nhân viên
function listNv(data = arrNv) {
  const output = data
    .map(
      (sv) => `
    <tr>
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
    </tr>`
    )
    .join("");

  getmyELe("tableDanhSach").innerHTML = output;
}

// Hàm thêm nhân viên
getmyELe("btnThemNV").addEventListener("click", function () {
  if (validateInput()) {
    const sv1 = laythongtintuInput();
    arrNv.push(sv1);
    listNv();
  }
});

// Hàm xóa nhân viên
function xoaMa(code) {
  arrNv = arrNv.filter((nv) => nv.code !== code);
  listNv();
}

// Hàm sửa thông tin nhân viên
function suaMa(code) {
  const sv = arrNv.find((nv) => nv.code === code);
  if (sv) {
    Object.keys(sv).forEach((key) => {
      if (getmyELe(key)) getmyELe(key).value = sv[key];
    });
    getmyELe("tknv").setAttribute("readonly", true);
  }
}

// Hàm cập nhật thông tin nhân viên
getmyELe("btnCapNhat").addEventListener("click", function () {
  if (validateInput()) {
    const sv = laythongtintuInput();
    const index = arrNv.findIndex((nv) => nv.code === sv.code);
    if (index !== -1) {
      arrNv[index] = sv;
      listNv();
    }
  }
});

// Hàm tìm kiếm nhân viên
function timKiemNhanVien() {
  const searchText = getmyELe("searchName").value.toLowerCase().trim();
  const ketQuaTimKiem = arrNv.filter(
    (nv) =>
      nv.code.toLowerCase().includes(searchText) ||
      nv.ten.toLowerCase().includes(searchText) ||
      nv.email.toLowerCase().includes(searchText) ||
      nv.chucVu.toLowerCase().includes(searchText) ||
      nv.xepLoai().toLowerCase().includes(searchText)
  );
  listNv(ketQuaTimKiem);
}

// Thêm event listener cho nút tìm kiếm
getmyELe("btnTimNV").addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn chặn form submit (nếu nút nằm trong form)
  timKiemNhanVien();
});

// Thêm event listener cho input để tìm kiếm real-time (tùy chọn)
getmyELe("searchName").addEventListener("input", timKiemNhanVien);

// Hàm khởi tạo ban đầu
function init() {
  listNv(); // Hiển thị danh sách nhân viên khi trang được tải
}

// Gọi hàm khởi tạo khi trang web được load
window.onload = init;
