
import db from './firebase.js'
//Nhập tọa độ mới cho Anchor trong Menu Set Anchor Posistion
function showCoordinateInput(selectedanchor) {
  // Hiển thị hộp thoại nhập tọa độ
  Swal.fire({
    title: `Enter coordinates for anchor`,
    html: `
              <label for="newXCoordinate">X Coordinates:</label>
              <input type="text" id="newXCoordinate" placeholder="Coordinates for X">
  
              <label for="newYCoordinate">Y Coordinates:</label>
              <input type="text" id="newYCoordinate" placeholder="Coordinates for Y">
          `,
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonText: "Save",
    preConfirm: () => {
      // Lấy giá trị tọa độ mới từ input
      const newXCoordinate = document.getElementById("newXCoordinate").value;
      const newYCoordinate = document.getElementById("newYCoordinate").value;

      // Kiểm tra xem tọa độ có hợp lệ không
      if (!newXCoordinate || !newYCoordinate) {
        Swal.showValidationMessage("Please enter full coordinates.");
      } else {
        // Cập nhật tọa độ mới lên Firebase cho anchor đã chọn
        updateanchorCoordinates(selectedanchor, newXCoordinate, newYCoordinate);
      }
    },
  });
}
// Cập nhật tọa độ mới cho Anchor trong Menu Set Anchor Posistion
function updateanchorCoordinates(selectedanchor, newX, newY) {
  // Cập nhật tọa độ mới lên Firebase
  db.ref(`/Building 1/floor1/anchor/${selectedanchor}/coordinates`)
    .set({
      x: newX,
      y: newY,
    })
    .then(() => {
      Swal.fire("Notice", "Updated coordinates successfully!", "success");
    })
    .catch((error) => {
      console.error("Error updating coordinates:", error);
      Swal.fire(
        "Notice",
        "An error occurred while updating coordinates.",
        "error"
      );
    });
}

//Dùng để hiển thị Anchors và Products
//reuse
function updatePosition(snapshot, id) {
  if(snapshot.val()){

    var element = document.getElementById(id);
    var x = snapshot.val().coordinates.x || 0;
    var y = snapshot.val().coordinates.y || 0;
  element.style.left = x + "px";
  element.style.top = y + "px";
  }
}

export { showCoordinateInput, updatePosition };
