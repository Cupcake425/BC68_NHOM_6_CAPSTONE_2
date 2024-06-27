// chỉnh sticky cho header khi scroll
// window.addEventListener("scroll", function () {
//   let header = this.document.querySelector("header");
//   header.classList.toggle("sticky", window.scrollY > 0);
// });

function showSideBar() {
  let sideBar = document.querySelector(".sidebar");
  sideBar.style.display = "flex";
}

function hideSideBar() {
  let sideBar = document.querySelector(".sidebar");
  sideBar.style.display = "none";
}
