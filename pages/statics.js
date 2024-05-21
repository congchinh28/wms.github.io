import db from "../assets/js/firebase.js";
import { hideLocation } from "./location.js";
import { hideAboutUs } from "./aboutUs.js";
import { hideManuals } from "./manuals.js";
var isTableVisible = false;
document.getElementById("statistics").addEventListener("click", function () {

  hideLocation();
  hideAboutUs ();  
  hideManuals();
  
  if (!isTableVisible) {
    // Hiển thị bảng thống kê
    showProductTable();
    isTableVisible = true;
  } else {
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
  document.getElementById("tableContainer").style.display = "flex";
  var productTableBody = document.getElementById("productTableBody");
  productTableBody.innerHTML = "";

  const buildings = ["Building 1", "Building 2"];
  const floors = ["floor1", "floor2", "floor3"];
  
  buildings.map((building) => { 
    floors.map((floor) => {
      db.ref(`/${building}/${floor}/product`).once("value", function (snapshot) {
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
          <td>${data.details.timeOut || "N/A"}</td>
          <td>${data.details.staff || "N/A"}</td>
          <td>${data.details.customer || "N/A"}</td>
          `;
            productTableBody.appendChild(row);
          }
        });
      })
    });
  });
}
const hideStatics = () => {
  document.getElementById("tableContainer").style.display = "none";
};

export { hideStatics };
