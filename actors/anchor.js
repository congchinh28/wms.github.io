import db from "../assets/js/firebase.js";
import { showCoordinateInput } from "../assets/js/helpers.js";

function showAnchorDetails(buildingId, floorId, anchorId) {
  const link = `/${buildingId}/${floorId}/anchor/${anchorId}`;
  db.ref(link).once("value", function (snapshot) {
    var data = snapshot.val();
    if (data && data.coordinates) {
      var coordinates = data.coordinates;
      Swal.fire({
        title: "Anchor informations",
        html: `
          <p><strong>X Coordinates:</strong> ${coordinates.x || "N/A"}</p>
          <p><strong>Y Coordinates:</strong> ${coordinates.y || "N/A"}</p>
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
