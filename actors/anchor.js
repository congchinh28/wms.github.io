import db from "../assets/js/firebase.js";
import { showCoordinateInput } from "../assets/js/helpers.js";
import { hideLocation } from "../pages/location.js";
import { hideStatics } from "../pages/statics.js";
import { hideManuals } from "../pages/manuals.js";
import { hideAboutUs } from "../pages/aboutUs.js";

function showAnchorDetails(buildingId, floorId, anchorId) {
  const link = `/${buildingId}/${floorId}/anchor/${anchorId}`;
  db.ref(link).once("value", function (snapshot) {
    var data = snapshot.val();
    if (data && data.coordinates) {
      var coordinates = data.coordinates;

      // Chuyển đổi từ pixel sang mét
      const pixelsToMeters = (pixels) => (pixels / 1351) * 29;

      // Định dạng số với 2 chữ số sau dấu phẩy
      const formatNumber = (number) => number.toFixed(2);

      // Tọa độ sau khi chuyển đổi
      var xMeters = formatNumber(pixelsToMeters(coordinates.x || 0));
      var yMeters = formatNumber(pixelsToMeters(coordinates.y || 0));
      var zMeters = formatNumber(pixelsToMeters(coordinates.z || 0));

      Swal.fire({
        title: "Anchor informations",
        html: `
          <p><strong>X Coordinates:</strong> ${xMeters} meters</p>
          <p><strong>Y Coordinates:</strong> ${yMeters} meters</p>
          <p><strong>Z Coordinates:</strong> ${zMeters} meters</p>
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
        title: "Anchor informations",
        html: `
          <p>Anchor details not found.</p>
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
}


function setAnchorPosition(Buildings, anchors) {
  document
    .getElementById("setAnchorPosition")
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
            // Hiển thị dropdown danh sách anchor
            Swal.fire({
              title: "Select Anchors",
              input: "select",
              inputOptions: anchors,
              showCloseButton: true,
              showConfirmButton: true,
              confirmButtonText: "Next",
              inputPlaceholder: "Select a anchor",
              preConfirm: (selectedanchor) => {
                // Kiểm tra xem có chọn anchor nào không
                if (!selectedanchor) {
                  Swal.showValidationMessage("Please choose an Anchor");
                } else {
                  // Gọi hàm để nhập tọa độ mới cho anchor đã chọn
                  showCoordinateInput(building, selectedanchor);
                }
              },
            });
          }
        },
      });
    });
}

// export { showAnchorDetails, setAnchorPosition, chooseBuilding, chooseFloor }
export { showAnchorDetails, setAnchorPosition };
