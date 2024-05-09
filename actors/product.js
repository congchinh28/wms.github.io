import db from "../assets/js/firebase.js";
function showProductDetails(buildingId, floorId, productId) {
  const link = `/${buildingId}/${floorId}/product/${productId}/details`;
  console.log("link", link)
  db.ref(link).once(
    "value",
    function (snapshot) {
      var data = snapshot.val();
      if (data) {
        Swal.fire({
          title: "Tag informations",
          html: `
            <div style="text-align: left; margin-left: 32%;">
              <p><strong>ID:</strong> ${data.ID || "N/A"}</p>
              <p><strong>Building:</strong> ${data.building || "N/A"}</p>
              <p><strong>Floor:</strong> ${data.floor || "N/A"}</p>
              <p><strong>Tag:</strong> ${data.tag || "N/A"}</p>
              <p><strong>Date in:</strong> ${data.time || "N/A"}</p>
              <p><strong>Date out:</strong> ${data.timeOut || "N/A"}</p>
              <p><strong>Staff:</strong> ${data.staff || "N/A"}</p>
              <p><strong>Customer:</strong> ${data.customer || "N/A"}</p>
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
    }
  );
}


function setProductDetails(Buildings, products) {
  document
    .getElementById("setProductDetails")
    .addEventListener("click", function () {
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