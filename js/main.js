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
    let { id, name, price, shortDescription, image } = item;

    content += `<div class="col-12 col-md-6 col-lg-4">
            <div class="product_item">
            <img src="${image}" alt="" />
            <div class="product_buynow">
              <a href="./Product.html?productid=${id}">BUY NOW</a>
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
    className: "bg-success text-white",
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
      }else if (id === "confirmPassword") {
        checkValid = validateConfirmPassword(
          value,
          document.querySelector("#password").value,
          err
        );
      }
       else if (id === "name") {
        checkValid = validateMinMax(value, err, 3, 10);
      } else if (id === "phone") {
        checkValid = validatePhone(value, err);
      }
    }

    if (!checkEmpty || !checkValid) {
      hasError = true;
    }
  }

  if (hasError) {
    // handleError("Please check again and do as requested!");
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
      document.querySelector(".signup_form").reset();
      handleError("Account registration successful!");
    })
    .catch(function (error) {
      console.log(error);
      handleError(error.response.data.message);
    });
}

document.querySelector(".signup_form").onsubmit = Sign_up;

function checkEmptyValue(value, err) {
  if (!value) {
    if (err) err.innerHTML = "Please do not leave this field blank ";
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
    if (err) err.innerHTML = `
            Please enter ${min} to ${max} characters`;
    return false; 
  }
}

function validateEmail(value, err) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(value)) {
    if (err) err.innerHTML = "";
    return true;
  } else {
    if (err) err.innerHTML = "Your email is not in the correct format";
    return false;
  }
}

function validatePhone(value, err) {
  const phonePattern = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
  if (phonePattern.test(value)) {
    if (err) err.innerHTML = "";
    return true;
  } else {
    if (err) err.innerHTML = "Your phone number is not in the correct format";
    return false;
  }
}

function validatePassword(value, err) {
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  if (specialCharPattern.test(value) && value.length >= 8) {
    if (err) err.innerHTML = "";
    return true;
  } else {
    if (err)
      err.innerHTML =
        "Your password must have at least 1 special character";
    return false;
  }
}
function validateConfirmPassword(value, password, err) {
  if (value === password) {
    if (err) err.innerHTML = "";
    return true;
  } else {
    if (err) err.innerHTML = "Your passwords do not match";
    return false;
  }
}
