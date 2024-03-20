import db from "../assets/js/firebase.js";
function showAnchorDetails(buildingId, floorId, anchorId) {
  const link = `/${buildingId}/${floorId}/anchor/${anchorId}`;
  //   const link = "/Building 1/floor1/anchor/anchor1";
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

export { showAnchorDetails };
