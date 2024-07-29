// đồng bộ : chạy từ trên xuống dưới
// bất đồng bộ : chạy từ theo quy tắc của hàm => đợi những dòng code đồng bộ xong thì mới chạy 

// settimeout : hàm bất đồng bộ có chức năng chạy 1 hàm sau một khoảng thời gian

// setTimeout sẽ chuyển vào hàm 2 tham số p1 p2 
// p1 là hàm cần chạy 
// p2 là hàm sẽ chạy sau một khoảng thời gian

console.log(0);
console.log(1);
console.log(2);

setTimeout(function(){
    console.log(3);
},0);
console.log(4);
