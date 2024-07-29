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
},9000);
console.log(4);
// sử dụng axios để gọi api từ server 

// cần url của api https://66a7890a53c13f22a3d01a4e.mockapi.io/:product1111

var urlAPI =" https://66a7890a53c13f22a3d01a4e.mockapi.io/product1111" 


axios({
    url : urlAPI,
    methor : "GET",
})
.then(
    function(res){
        console.log(res);
        // thành công
    }
).catch(
    function(err){
        console.log(err);
        // thất bại 
    }
)


// khi gọi api sẽ có 2 trường hợp thành công hoặc thất bại resolve hoăc reject
// promise 3 trạng thái : -pending (đang chờ)
                        // resolve : thành công 
                        // reject : thất bại
