import db from "../assets/js/firebase.js";
import { hideLocation } from "../pages/location.js";
import { hideStatics } from "../pages/statics.js";
import { hideManuals } from "../pages/manuals.js";
import { hideAboutUs } from "../pages/aboutUs.js";

function showProductDetails(buildingId, floorId, productId) {
  const detailsLink = `/${buildingId}/${floorId}/product/${productId}/details`;
  const coordinatesLink = `/${buildingId}/${floorId}/product/${productId}/coordinates`;

  console.log("detailsLink", detailsLink);
  console.log("coordinatesLink", coordinatesLink);

  // Lấy thông tin chi tiết sản phẩm
  db.ref(detailsLink).once("value", function (detailsSnapshot) {
    var detailsData = detailsSnapshot.val();

    // Lấy thông tin tọa độ sản phẩm
    db.ref(coordinatesLink).once("value", function (coordinatesSnapshot) {
      var coordinatesData = coordinatesSnapshot.val();

      if (detailsData && coordinatesData) {
        // Chuyển đổi tọa độ X và Y
        const xConverted = (coordinatesData.x / 1351) * 29;
        const yConverted = (coordinatesData.y / 784) * 16.8;

        Swal.fire({
          title: "Tag informations",
          html: `
            <div style="text-align: left; margin-left: 25%;">            
              <p><strong>X Coordinate:</strong> ${xConverted.toFixed(2) || "N/A"} meters</p>
              <p><strong>Y Coordinate:</strong> ${yConverted.toFixed(2) || "N/A"} meters</p>          
              <p><strong>Z Coordinate:</strong> ${coordinatesData.z || "N/A"} meters</p>
              <p><strong>ID:</strong> ${detailsData.ID || "N/A"}</p>
              <p><strong>Building:</strong> ${detailsData.building || "N/A"}</p>
              <p><strong>Floor:</strong> ${detailsData.floor || "N/A"}</p>
              <p><strong>Tag:</strong> ${detailsData.tag || "N/A"}</p>
              <p><strong>Date in:</strong> ${detailsData.time || "N/A"}</p>
              <p><strong>Date out:</strong> ${detailsData.timeOut || "N/A"}</p>
              <p><strong>Staff:</strong> ${detailsData.staff || "N/A"}</p>
              <p><strong>Customer:</strong> ${detailsData.customer || "N/A"}</p>
            </div>
          `,
          showCloseButton: true,
          showConfirmButton: false,
          backdrop: false,
          customClass: {
            popup: "custom-popup",
          },
        });
      } else {
        Swal.fire({
          title: "Product informations",
          html: `
            <p>Product details not found.</p>
          `,
          showCloseButton: true,
          showConfirmButton: false,
          backdrop: false,
          customClass: {
            popup: "custom-popup",
          },
        });
      }
    });
  });
}




function setProductDetails(Buildings, products) {
  document
    .getElementById("setProductDetails")
    .addEventListener("click", function () {
      hideLocation ()
      hideAboutUs ()
      hideManuals ()
      hideStatics ()
      Swal.fire({
        title: "Select Buildings",
        input: "select",
        inputOptions: Buildings,
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: "Next",
        preConfirm: (building) => {
          if (!building) {
            Swal.showValidationMessage("Please choose a building");
          } else {
            // Hiển thị dropdown danh sách product
            Swal.fire({
              title: "Select Products",
              input: "select",
              inputOptions: products,
              showCloseButton: true,
              showConfirmButton: true,
              confirmButtonText: "Next",
              inputPlaceholder: "Select a product",
              preConfirm: (selectedproduct) => {
                // Kiểm tra xem có chọn anchor nào không
                if (!selectedproduct) {
                  Swal.showValidationMessage("Please choose a Product");
                } else {
                  // Gọi hàm để nhập tọa độ mới cho anchor đã chọn
                  showDetailsInput(building, selectedproduct);
                }
              },
            });
          }
        },
      });
    });
}
function showDetailsInput(selectedBuilding, selectedproduct) {
  // Hiển thị hộp thoại nhập tọa độ
  Swal.fire({
    title: `Enter details for product`,
    html: `
              <div style="text-align: left; margin-left: 20%;">
                  <label for="newID">ID:</label>
                  <input type="text" id="newID" placeholder="ID for Product">
                  <br/>
                  <label for="newBuilding">Building:</label>
                  <input type="text" id="newBuilding" placeholder="Name of Building">
                  <br/>
                  <label for="newFloor">Floor:</label>
                  <input type="text" id="newFloor" placeholder="Floor of Product">
                  <br/>
                  <label for="newTag">Tag:</label>
                  <input type="text" id="newTag" placeholder="Tag for Product">
                  <br/>
                  <label for="newTime">Date in:</label>
                  <input type="text" id="newTime" placeholder="New Date in">
                  <br/>
                  <label for="newTimeOut">Date out:</label>
                  <input type="text" id="newTimeOut" placeholder="New Date out">
                  <br/>
                  <label for="newStaff">Staff:</label>
                  <input type="text" id="newStaff" placeholder="Name of Staff">
                  <br/>              
                  <label for="newCustomer">Customer:</label>
                  <input type="text" id="newCustomer" placeholder="Name of Customer">
              </div>
          `,
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonText: "Save",
    preConfirm: () => {
      // Lấy giá trị tọa độ mới từ input
      const newID = document.getElementById("newID").value;
      const newBuilding = document.getElementById("newBuilding").value;
      const newFloor = document.getElementById("newFloor").value;
      const newTag = document.getElementById("newTag").value;
      const newTime = document.getElementById("newTime").value;
      const newTimeOut = document.getElementById("newTimeOut").value;
      const newStaff = document.getElementById("newStaff").value;
      const newCustomer = document.getElementById("newCustomer").value;

      // Kiểm tra xem tọa độ có hợp lệ không
      if (!newID || !newBuilding || !newFloor || !newTag || !newTime || !newTimeOut || !newStaff || !newCustomer) {
        Swal.showValidationMessage("Please enter full coordinates.");
      } else {
        // Cập nhật tọa độ mới lên Firebase cho anchor đã chọn
        updateProductDetails(
          selectedBuilding,
          selectedproduct,
          newID,
          newBuilding,
          newFloor,
          newTag,
          newTime,
          newTimeOut,
          newStaff,
          newCustomer
        );
      }
    },
  });
}
function updateProductDetails(selectedBuilding, selectedproduct, newID, newBuilding, newFloor, newTag, newTime, newTimeOut, newStaff, newCustomer) {
  // Cập nhật tọa độ mới lên Firebase
  db.ref(`/${selectedBuilding}/${selectedproduct}/details`)
    .set({
      ID: newID,
      building: newBuilding,
      customer: newCustomer,
      floor: newFloor,
      staff: newStaff,
      tag: newTag,
      time: newTime,
      timeOut: newTimeOut
    })
    .then(() => {
      Swal.fire("Notice", "Updated coordinates successfully!", "success");
    })
    .catch((error) => {
      Swal.fire(
        "Notice",
        "An error occurred while updating coordinates.",
        "error"
      );
    });
}



export { showProductDetails, setProductDetails };