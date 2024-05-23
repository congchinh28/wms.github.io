import db from "../assets/js/firebase.js";
import { hideLocation } from "../pages/location.js";
import { hideStatics } from "../pages/statics.js";
import { hideManuals } from "../pages/manuals.js";
import { hideAboutUs } from "../pages/aboutUs.js";
import { updateProductDetails } from "../assets/js/helpers.js";

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
      hideLocation();
      hideAboutUs();
      hideManuals();
      hideStatics();
      Swal.fire({
        title: "Update Product Details",
        html: `
        <div class="form-group2 text-left">
        <label for="buildingSelect" class="font-weight-bold">Select Building:</label>
        <select id="buildingSelect" class="form-control">
          ${Object.keys(Buildings).map(building => `<option value="${building}">${Buildings[building]}</option>`).join('')}
        </select>
      </div>
      <div class="form-group2 text-left">
        <label for="productSelect" class="font-weight-bold">Select Product:</label>
        <select id="productSelect" class="form-control">
          ${Object.keys(products).map(floor => 
            Object.keys(products[floor]).map(product => 
              `<option value="${product}">${products[floor][product]}</option>`
            ).join('')
          ).join('')}
        </select>
      </div>
      <div class="form-group2 text-left">
        <label for="newID" class="font-weight-bold">ID:</label>
        <input type="text" id="newID" class="form-control" placeholder="ID for Product">
      </div>
      <div class="form-group2 text-left">
        <label for="newTag" class="font-weight-bold">Tag:</label>
        <input type="text" id="newTag" class="form-control" placeholder="Fag for Product">
      </div>
      <div class="form-group2 text-left">
        <label for="newTime" class="font-weight-bold">Date in:</label>
        <input type="text" id="newTime" class="form-control" placeholder="New Date in">
      </div>
      <div class="form-group2 text-left">
        <label for="newTimeOut" class="font-weight-bold">Date out:</label>
        <input type="text" id="newTimeOut" class="form-control" placeholder="New Date out">
      </div>
      <div class="form-group2 text-left">
        <label for="newStaff" class="font-weight-bold">Staff:</label>
        <input type="text" id="newStaff" class="form-control" placeholder="Name of Staff">
      </div>
      <div class="form-group2 text-left">
        <label for="newCustomer" class="font-weight-bold">Customer:</label>
        <input type="text" id="newCustomer" class="form-control" placeholder="Name of Customer">
      </div>
      `,
        showCloseButton: 1,
        showConfirmButton: true,
        confirmButtonText: "Save",
        preConfirm: () => {
          const newID = document.getElementById("newID").value;
          const newTag = document.getElementById("newTag").value;
          const newTime = document.getElementById("newTime").value;
          const newTimeOut = document.getElementById("newTimeOut").value;
          const newStaff = document.getElementById("newStaff").value;
          const newCustomer = document.getElementById("newCustomer").value;

          if (!newID || !newTag || !newTime || !newTimeOut || !newStaff || !newCustomer) {
            Swal.showValidationMessage("Please enter full coordinates.");
          } else {
            // Cập nhật tọa độ mới lên Firebase cho anchor đã chọn
            updateProductDetails(
              selectedBuilding,
              selectedproduct,
              newID,
              newTag,
              newTime,
              newTimeOut,
              newStaff,
              newCustomer
            );
          }
        },
      });
    });
}




export { showProductDetails, setProductDetails };