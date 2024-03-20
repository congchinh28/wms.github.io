//--------------------ABOUT US-------------------------

//Menu About Us
var isTableVisible = false;
document.getElementById("aboutUs").addEventListener("click", function () {
  // Ẩn rectangle và product
  rectangleElement.style.display = "none";
  document.querySelectorAll(".product").forEach(function (product) {
    product.style.display = "none";
  });

  // Đặt trạng thái của rectangle là không hiển thị
  isRectangleVisible = false;

  // Ẩn các anchor
  const anchors = document.querySelectorAll(".anchor");
  anchors.forEach(function (anchor) {
    anchor.style.display = "none";
  });
  document.getElementById("floor1Button").style.display = "none";
});
