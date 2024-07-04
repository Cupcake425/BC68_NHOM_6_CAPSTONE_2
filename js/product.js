window.onload = function () {
  const urlParam = new URLSearchParams(window.location.search);
  const myParam = urlParam.get("productid");
  layThongTinGiay(myParam, "Chọn sản phẩm để hiện lên");
};

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
      handleError("Tải dữ liệu thất bại");
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

function layThongTinGiay(id, errorText = "Tải dữ liệu thất bại") {
  console.log(id);
  let content = "";

  let promise = axios({
    method: "GET",
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
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
      content += `<div class="product_choose_item ">
                    <div class="product_choose_item_image">
                      <img src="${giay.image}" alt="" />
                    </div>
                    <div class="product_choose_item_info">
                      <h2>${giay.name}</h2>
                      <p>${giay.description}</p>
                      <hr>
                      <span class="size_text">Available Size</span>
                      <p class="product_size">${sizeValue}</p>
                      <div class="product_color_group my-4 ">
                      <button type="button" class="btn btn-danger bg-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Red">
                      
                      </button>
                      <button type="button" class="btn btn-primary bg-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Blue">
                      </button>
                      <button type="button" class="btn btn-success bg-success" data-bs-toggle="tooltip" data-bs-placement="top" title="Green">
                      </button>
                      <button type="button" class="btn btn-dark bg-dark" data-bs-toggle="tooltip" data-bs-placement="top" title="Black">
                      </button>
                      </div>
                      <p class="product_price">${giay.price}$</p>
                      <button onclick="tangSanPham()" class="btn  product_choose_btn_plus">+</button>
                      <input value=0 type="text" class="available_plus_minus">

                      <button onclick="giamSanPham()" class="btn product_choose_btn_minus">-</button>
                      <br>
                      <div class="product_buy_group ">
                      
                      <button type="button" class="btn  product_Cart" data-bs-toggle="tooltip" data-bs-placement="top" title="Add To Cart">
                      Add To Cart
                      </button>
                      <button type="button" class="btn btn-secondary product_Wish" data-bs-toggle="tooltip" data-bs-placement="top" title="Add To Wish List">
                      Add To Wish List
                      </button>
                      <button type="button" class="btn  product_Buy" data-bs-toggle="tooltip" data-bs-placement="top" title="Buy It Now">
                      Buy It Now
                      </button>
                      </div>
                    </div>
                    
                  </div>`;
      document.getElementById("product_choose_content").innerHTML = content;
    })
    .catch((err) => {
      console.log("Có lỗi xảy ra");
      handleError(errorText);
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
