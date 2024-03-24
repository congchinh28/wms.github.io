import db from "../assets/js/firebase.js";
import { showCoordinateInput } from "../assets/js/helpers.js";

function showAnchorDetails(buildingId, floorId, anchorId) {
  const link = `/${buildingId}/${floorId}/anchor/${anchorId}`;
  console.log("link", link)
  db.ref(link).once("value", function (snapshot) {
    var data = snapshot.val();
    if (data && data.coordinates) {
      var coordinates = data.coordinates;
      Swal.fire({
        title: "Anchor informations",
        html: `
          <p><strong>X Coordinates:</strong> ${
            coordinates.x || "N/A"
          }</p>
          <p><strong>Y Coordinates:</strong> ${
            coordinates.y || "N/A"
          }</p>
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
function setAnchorPosition(rectangle, anchorsBuilding) {
  document.getElementById("setAnchorPosition").addEventListener("click", function () {
    // Hiển thị dropdown danh sách anchor
    Swal.fire({
      title: "Select Anchor",
      input: "select",
      inputOptions: anchorsBuilding,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: "Next",
      preConfirm: (selectedanchor) => {
        // Kiểm tra xem có chọn anchor nào không
        if (!selectedanchor) {
          Swal.showValidationMessage("Please choose an Anchor");
        } else {
          // Gọi hàm để nhập tọa độ mới cho anchor đã chọn
          showCoordinateInput(selectedanchor);
        }
      },
    });

  });
}

export { showAnchorDetails, setAnchorPosition };
