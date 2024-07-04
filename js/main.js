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
function handleError(text, duration = 3000) {
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
  let hasError = false;
  
  for (let field of arrField) {
    let { id, value, type, checked } = field;
    if (type === "radio") {
      if (checked) {
        user[id] = value;
      }
    } else {
      user[id] = value;
    }
    
    let err = document.querySelector(`span.thongBaoLoi#${id}`);
    console.log(err);
    let checkEmpty = checkEmptyValue(value, err);
    let checkValid = true;

    if (checkEmpty) {
      if (id === "email") {
        checkValid = validateEmail(value, err);
      } else if (id === "password") {
        checkValid = validatePassword(value, err);
      } else if (id === "name") {
        checkValid = validateMinMax(value, err, 3, 30);
      } else if (id === "phone") {
        checkValid = validatePhone(value, err);
      }
    }

    if (!checkEmpty || !checkValid) {
      hasError = true;
    }
  }
  
  if (hasError) {
    handleError("Vui lòng kiểm tra lại các trường và làm theo đúng yêu cầu");
    return;
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
      handleError("Đăng ký tài khoản thành công!");
    })
    .catch(function (error) {
      console.log(error);
      handleError(error.response.data.message);
    });
}

document.querySelector(".signup_form").onsubmit = Sign_up;

function checkEmptyValue(value, err) {
  if (!value) {
    if (err) err.innerHTML = "Vui lòng không để trống trường này";
    return false;
  } else {
    if (err) err.innerHTML = "";
    return true;
  }
}

function validateMinMax(value, err, min, max) {
  if (min <= value.length && value.length <= max) {
    if (err) err.innerHTML = "";
    return true;
  } else {
    if (err) err.innerHTML = `Vui lòng nhập dữ liệu từ ${min} đến ${max} ký tự`;
    return false;
  }
}

function validateEmail(value, err) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(value)) {
    if (err) err.innerHTML = "";
    return true;
  } else {
    if (err) err.innerHTML = "Email không đúng định dạng";
    return false;
  }
}

function validatePhone(value, err) {
  const phonePattern = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
  if (phonePattern.test(value)) {
    if (err) err.innerHTML = "";
    return true;
  } else {
    if (err) err.innerHTML = "Số điện thoại không đúng định dạng";
    return false;
  }
}

function validatePassword(value, err) {
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  if (specialCharPattern.test(value) && value.length >= 8) {
    if (err) err.innerHTML = "";
    return true;
  } else {
    if (err) err.innerHTML = "Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt";
    return false;
  }
}












