// Show Side bar
function showSideBar() {
  let sideBar = document.querySelector(".sidebar");
  sideBar.style.display = "flex";
}

// giấu side bar
function hideSideBar() {
  let sideBar = document.querySelector(".sidebar");
  sideBar.style.display = "none";
}

// Lấy danh sách giày
function layDanhSachGiay() {
  let promise = axios({
    method: "GET",
    url: "https://shop.cyberlearn.vn/api/Product",
  });
  promise
    .then((res) => {
      renderGiay(res.data.content);
    })
    .catch((err) => {
      console.log("Có lỗi xảy ra");
    });
}
layDanhSachGiay();

// Chức năng hiển thị thông tin giày lên web
function renderGiay(arr) {
  let content = "";
  arr.forEach((item) => {
    console.log(item);
    let { name, price, shortDescription, image } = item;

    content += `<div class="col-12 col-md-6 col-lg-4">
            <div class="product_item">
            <img src="${image}" alt="" />
            <div class="product_buynow">
              <a href="">BUY NOW</a>
            </div>
             </div>
            <div class="product_info">
              <p>${name}</p>
              <p>${shortDescription}</p>
              <p>${price}$</p>
            </div>
            
          </div>`;
  });
  document.getElementById("product").innerHTML = content;
}
