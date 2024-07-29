// Example employee data
const arrNv = [
    { code: 'A01', ten: 'John Doe', email: 'john@example.com', chucVu: 'Manager', xepLoai: () => 'Excellent' },
    { code: 'A02', ten: 'Jane Smith', email: 'jane@example.com', chucVu: 'Developer', xepLoai: () => 'Good' },
    { code: 'A03', ten: 'Michael Johnson', email: 'michael@example.com', chucVu: 'Designer', xepLoai: () => 'Excellent' }
];

// Function to get element by ID
function getmyELe(id) {
    return document.getElementById(id);
}

// Function to display the list of employees
function listNv(employeeArray = arrNv) {
    const employeeList = getmyELe('employeeList');
    employeeList.innerHTML = ''; // Clear existing list
    employeeArray.forEach(nv => {
        const employeeItem = document.createElement('div');
        employeeItem.className = 'employee-item';
        employeeItem.innerText = `Code: ${nv.code}, Name: ${nv.ten}, Email: ${nv.email}, Position: ${nv.chucVu}, Rating: ${nv.xepLoai()}`;
        employeeList.appendChild(employeeItem);
    });
}

// Function to search employees
function timKiemNhanVien() {
    const searchText = getmyELe('searchName').value.toLowerCase().trim();
    const ketQuaTimKiem = arrNv.filter(
        nv =>
            nv.ten.toLowerCase().includes(searchText) ||
            nv.code.toLowerCase().includes(searchText) ||
            nv.email.toLowerCase().includes(searchText) ||
            nv.chucVu.toLowerCase().includes(searchText) ||
            nv.xepLoai().toLowerCase().includes(searchText)
    );
    listNv(ketQuaTimKiem);
}

// Add event listener for the search button
getmyELe('btnTimNV').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submit (if button is inside a form)
    timKiemNhanVien();
});

// Add event listener for real-time search
// getmyELe('searchName').addEventListener('input', timKiemNhanVien);

// // Initial setup to display all employees
listNv();
