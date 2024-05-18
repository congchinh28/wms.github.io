import db from "../assets/js/firebase.js";
import { updateanchorCoordinates } from "../assets/js/helpers.js";
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
      hideLocation();
      hideAboutUs();
      hideManuals();
      hideStatics();
      Swal.fire({
        title: "Update Anchor Position",
        html: `
        <div class="form-group text-left">
        <label for="buildingSelect" class="font-weight-bold">Select Building:</label>
        <select id="buildingSelect" class="form-control">
          ${Object.keys(Buildings).map(building => `<option value="${building}">${Buildings[building]}</option>`).join('')}
        </select>
      </div>
      <div class="form-group text-left">
        <label for="anchorSelect" class="font-weight-bold">Select Anchor:</label>
        <select id="anchorSelect" class="form-control">
          ${Object.keys(anchors).map(floor => 
            Object.keys(anchors[floor]).map(anchor => 
              `<option value="${anchor}">${anchors[floor][anchor]}</option>`
            ).join('')
          ).join('')}
        </select>
      </div>
      <div class="form-group text-left">
        <label for="newXCoordinate" class="font-weight-bold">X Coordinates:</label>
        <input type="text" id="newXCoordinate" class="form-control" placeholder="Coordinates for X">
      </div>
      <div class="form-group text-left">
        <label for="newYCoordinate" class="font-weight-bold">Y Coordinates:</label>
        <input type="text" id="newYCoordinate" class="form-control" placeholder="Coordinates for Y">
      </div>
      <div class="form-group text-left">
        <label for="newZCoordinate" class="font-weight-bold">Z Coordinates:</label>
        <input type="text" id="newZCoordinate" class="form-control" placeholder="Coordinates for Z">
      </div>
      `,
        showCloseButton: 0,
        showConfirmButton: true,
        confirmButtonText: "Save",
        preConfirm: () => {
          const selectedBuilding =
            document.getElementById("buildingSelect").value;
          const selectedAnchor = document.getElementById("anchorSelect").value;
          const newXCoordinate =
            document.getElementById("newXCoordinate").value;
          const newYCoordinate =
            document.getElementById("newYCoordinate").value;
          const newZCoordinate =
            document.getElementById("newZCoordinate").value;

          if (
            !selectedBuilding ||
            !selectedAnchor ||
            !newXCoordinate ||
            !newYCoordinate
          ) {
            Swal.showValidationMessage(
              "Please enter full coordinates and select a building and an anchor."
            );
          } else {
            // Cập nhật tọa độ mới lên Firebase cho anchor đã chọn
            updateanchorCoordinates(
              selectedBuilding,
              selectedAnchor,
              newXCoordinate,
              newYCoordinate,
              newZCoordinate
            );
          }
        },
      });
    });
}




// export { showAnchorDetails, setAnchorPosition, chooseBuilding, chooseFloor }
export { showAnchorDetails, setAnchorPosition };
