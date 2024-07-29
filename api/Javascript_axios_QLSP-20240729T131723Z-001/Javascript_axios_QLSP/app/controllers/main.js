/*
/get : lấy tất cả 

/get/:id : lấy 1 sản phẩm theo id

/post : thêm 1 sản phẩm 

/put/id : sửa 1 sản phẩm theo id 

/ delete/id : xóa 1 sản phẩm theo id
*/

// lấy data
// renderdanhsachtuAPI
var urlAPI = "https://66a7890a53c13f22a3d01a4e.mockapi.io/product1111";
axios({
  url: urlAPI,
  methor: "GET",
})
  .then(function (res) {
    //duyệt mảng
    renderProduct(res.data);
  })
  .catch(function (err) {
    console.log(err);
    // thất bại
  });
function renderProduct(listProduct) {
  // var listProduct = res.data;
  var output = "";
  for (var i = 0; i < listProduct.length; i++) {
    var q = listProduct[i];
    var tring = `
        <tr>
        <td>${q.id}</td>
        <td>${q.name}</td>
        <td>${q.price}</td>
        <td><img width = "100%" src ="${q.img}"</td>
        <td>${q.description}
        </tr>`;
    output += tring;
  }
  document.getElementById("tblDanhSachSP").innerHTML = output;
}
// renderProduct();
