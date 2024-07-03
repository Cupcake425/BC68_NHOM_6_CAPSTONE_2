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

// Sign_in

function hendleError(text, duration = 300000) {
  Toastify({
    text,
    duration,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}

function Sign_up(event) {
  event.preventDefault();
  let arrField = document.querySelectorAll(
    ".signup_form input, .signup_form select"
  );
  let user = {};
  for (let field of arrField) {
    let { id, value, type, checked } = field;
    if (type === "radio") {
      if (checked) {
        user[id] = value;
      }
    } else {
      user[id] = value;
    }
  }
  console.log(user);
  let promise = axios({
    method: "POST",
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    data: user,
  });

  promise
    .then(function (res) {
      console.log(res);
      hendleError("Đăng ký tài khoản thành công!");
    })
    .catch(function (error) {
      console.log(error);
      hendleError(error.response.data.message);
    });
}

document.querySelector(".signup_form").onsubmit = Sign_up;
