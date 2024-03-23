import { floor } from "../actors/floor.js";
import db from "../assets/js/firebase.js";
//--------------------STATISTICS-------------------------
//Truy cập đến bảng trong menu statistics
// var tableContainer = document.getElementById("tableContainer");
//Menu Statistics
var isTableVisible = false;
document.getElementById("statistics").addEventListener("click", function () {
  if (!isTableVisible) {
    // Hiển thị bảng thống kê
    showProductTable();
    isTableVisible = true;
  } else {
    // Ẩn bảng thống kê
    document.getElementById("tableContainer").style.display = "none";
    isTableVisible = false;
  }

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
//Phần này để ẩn bảng thống kê khi click vào vùng bất kì
document.addEventListener("click", function (event) {
  var targetElement = event.target;
  // Kiểm tra xem người dùng có click vào nút "Thống kê các món hàng trong kho" hay không
  if (targetElement.id !== "statistics" && isTableVisible) {
    // Ẩn bảng thống kê
    document.getElementById("tableContainer").style.display = "none";
    isTableVisible = false;
  }
});
//XUẤT THỐNG KÊ
// Thêm sự kiện cho nút "Xuất thống kê"
document.getElementById("exportButton").addEventListener("click", function () {
  exportStatistics();
});

// Hàm xuất thống kê ra file TXT
function exportStatistics() {
  var productTableBody = document.getElementById("productTableBody");
  var dataToExport = "";

  // Lặp qua từng hàng trong bảng thống kê và thu thập dữ liệu
  for (var i = 0; i < productTableBody.rows.length; i++) {
    var cells = productTableBody.rows[i].cells;
    for (var j = 0; j < cells.length; j++) {
      dataToExport += cells[j].innerText + "\t"; // Sử dụng ký tự tab để tách dữ liệu
    }
    dataToExport += "\n"; // Xuống dòng sau mỗi hàng
  }

  // Tạo một đối tượng Blob từ chuỗi dữ liệu
  var blob = new Blob([dataToExport], { type: "text/plain" });

  // Tạo một đường dẫn URL để tải xuống
  var url = window.URL.createObjectURL(blob);

  // Tạo một thẻ a để tạo sự kiện click và tải xuống
  var a = document.createElement("a");
  a.href = url;
  a.download = "warehouse_statistics.txt"; // Tên file xuất thống kê
  document.body.appendChild(a);
  a.click();

  // Xóa thẻ a sau khi đã tải xuống
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
// Hàm hiển thị bảng thông tin món hàng trong menu Statistics
function showProductTable() {
  // Hiển thị bảng thông tin món hàng
  document.getElementById("tableContainer").style.display = "block";
  var productTableBody = document.getElementById("productTableBody");
  productTableBody.innerHTML = "";

  const floors = ["floor1", "floor2", "floor3"];
  floors.map((floor) => {
    db.ref(`/Building 1/${floor}/product`).once("value", function (snapshot) {

      snapshot.forEach(function (childSnapshot) {
        var data = childSnapshot.val();
        if (data && data.details) {
          var row = document.createElement("tr");
          row.innerHTML = `
        <td>${data.details.ID || "N/A"}</td>
        <td>${data.details.building || "N/A"}</td>
        <td>${data.details.floor || "N/A"}</td>
        <td>${data.details.tag || "N/A"}</td>
        <td>${data.details.time || "N/A"}</td>
        `;
          productTableBody.appendChild(row);
        }
      });
    });
  });
}
