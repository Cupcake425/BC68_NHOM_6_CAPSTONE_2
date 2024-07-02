let arrGiay = [];

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
    // console.log(item);
    let { id, name, price, shortDescription, image } = item;

    content += `<div class="col-12 col-md-6 col-lg-4" onclick="layThongTinGiay('${id}')">
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

//Chức năng lấy thông tin giày

function layThongTinGiay(id) {
  console.log(id);
  let content = "";

  let promise = axios({
    method: "GET",
    url: `https://shop.cyberlearn.vn/api/Product/getbyi?id=${id}`,
  });
  promise
    .then((res) => {
      let giay = res.data.content;
      let sizeValue = "";
      for (let size of giay.size) {
        console.log(size);
        sizeValue += `<button class="btn">${size}</button>`;
      }
      console.log(res);
      content += `<div class="product_choose_item d-flex">
                    <div class="product_choose_item_image">
                      <img src="${giay.image}" alt="" />
                    </div>
                    <div class="product_choose_item_info">
                      <h2>${giay.name}</h2>
                      <p>${giay.description}</p>
                      <hr>
                      <span class="size_text">Available Size</span>
                      <p class="product_size">${sizeValue}</p>
                      <p class="product_price">${giay.price}$</p>
                      <button onclick="tangSanPham()" class="btn  product_choose_btn_plus">+</button>
                      <input value=0 type="text" class="available_plus_minus">

                      <button onclick="giamSanPham()" class="btn product_choose_btn_minus">-</button>
                      <br>
                      <button class="btn product_Add">Add To Cart</button>
                    </div>
                    
                  </div>`;
      document.getElementById("product_choose_content").innerHTML = content;
    })
    .catch((err) => {
      console.log("Có lỗi xảy ra");
      handleError("Tải dữ liệu thất bại");
    });
}

function tangSanPham() {
  let getGiaTri = document.querySelector(".available_plus_minus").value * 1;
  getGiaTri++;
  document.querySelector(".available_plus_minus").value = getGiaTri;
}
function giamSanPham() {
  let getGiaTri = document.querySelector(".available_plus_minus").value * 1;
  if (getGiaTri > 0) getGiaTri--;
  document.querySelector(".available_plus_minus").value = getGiaTri;
}

// Hiển thị thông báo lỗi cho người dùng
function handleError(text, duration = 3000) {
  Toastify({
    // text giúp thông báo lỗi: sử dụng cơ chế từ object literal (ES6)
    text,
    // thời gian diễn ra thông báo
    duration,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: "bg-danger text-white",
  }).showToast();
}
