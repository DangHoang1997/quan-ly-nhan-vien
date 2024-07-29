const array = [
  {
    code: "A01",
    ten: "John Doe",
    email: "john@example.com",
    chucVu: "Manager",
    xepLoai: () => "Excellent",
  },
  {
    code: "A02",
    ten: "Jane Smith",
    email: "jane@example.com",
    chucVu: "Developer",
    xepLoai: () => "Good",
  },
  {
    code: "A03",
    ten: "Michael Johnson",
    email: "michael@example.com",
    chucVu: "Designer",
    xepLoai: () => "Excellent",
  },
];

function listNv(hienthiaray = array) {
  const hienthinhanvien = document.getElementById("employeeList");
  hienthinhanvien.innerHTML = "";
  hienthiaray.forEach((nv) => {
    const hienthiItem = document.createElement("div");
    hienthiItem.className = "itemofDiv";
    hienthiItem.innerText = `code : ${nv.code}, ten : ${nv.ten}, email : ${nv.email}, chucvu : ${nv.chucVu}, xeploai : ${nv.xepLoai()}`;
    hienthinhanvien.appendChild(hienthiItem);
  });
}

function timKiemNhanVien() {
  const searchText = document.getElementById("searchName").value.toLowerCase().trim();
  const ketQuaTimKiem = array.filter((nv) => {
    return (
      nv.code.toLowerCase().includes(searchText) ||
      nv.ten.toLowerCase().includes(searchText) ||
      nv.email.toLowerCase().includes(searchText) ||
      nv.chucVu.toLowerCase().includes(searchText) ||
      nv.xepLoai().toLowerCase().includes(searchText)
    );
  });
  
  // Gọi listNv để hiển thị kết quả tìm kiếm
  listNv(ketQuaTimKiem);
}

// Thêm sự kiện cho nút tìm kiếm
document.getElementById('btnTimNV').addEventListener('click', function(event) {
  event.preventDefault();
  timKiemNhanVien();
});

// Thêm sự kiện cho tìm kiếm theo thời gian thực
document.getElementById('searchName').addEventListener('input', function() {
  timKiemNhanVien();
});

// Hiển thị danh sách nhân viên ban đầu
listNv();
