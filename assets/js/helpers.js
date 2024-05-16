import db from "./firebase.js";

// GLOBAL CONST
export const MAP_RECTANGLE_FLOORS = {
  floor1: "rectangle1",
  floor2: "rectangle2",
  floor3: "rectangle3",
};
export const BUILDING_LISTs = {
  "Building 1": "Building 1",
  "Building 2": "Building 2",
};

export const FLOOR_LISTs = {
  floor1: "floor1",
  floor2: "floor2",
  floor3: "floor3",
  floor4: "floor4",
};

export const ANCHOR_PATH = {
  floor1: {
    "floor1/anchor/anchor1": "Floor 1 - Anchor 1",
    "floor1/anchor/anchor2": "Floor 1 - Anchor 2",
    "floor1/anchor/anchor3": "Floor 1 - Anchor 3",
    "floor1/anchor/anchor4": "Floor 1 - Anchor 4",
  },
  floor2: {
    "floor2/anchor/anchor5": "Floor 2 -  Anchor 1",
    "floor2/anchor/anchor6": "Floor 2 -  Anchor 2",
    "floor2/anchor/anchor7": "Floor 2 -  Anchor 3",
    "floor2/anchor/anchor8": "Floor 2 -  Anchor 4",
  },
  floor3: {
    "floor3/anchor/anchor9": "Floor 3 -  Anchor 1",
    "floor3/anchor/anchor10": "Floor 3 -  Anchor 2",
    "floor3/anchor/anchor11": "Floor 3 -  Anchor 3",
    "floor3/anchor/anchor12": "Floor 3 -  Anchor 4",
  },
};
export const PRODUCT_PATH = {
  floor1: {
    "floor1/product/product1": "Floor 1 - Product 1",
    "floor1/product/product2": "Floor 1 - Product 2",
    "floor1/product/product3": "Floor 1 - Product 3",
    "floor1/product/product4": "Floor 1 - Product 4"
  },
  floor2: {
    "floor2/product/product5": "Floor 2 - Product 5",
    "floor2/product/product6": "Floor 2 - Product 6",
    "floor2/product/product7": "Floor 2 - Product 7",
    "floor1/product/product8": "Floor 1 - Product 8"
  },
  floor3: {
    "floor3/product/product9": "Floor 3 - Product 9",
    "floor3/product/product10": "Floor 3 - Product 10",
    "floor3/product/product11": "Floor 3 - Product 11",
    "floor1/product/product12": "Floor 1 - Product 12"
  },
};

//Nhập tọa độ mới cho Anchor trong Menu Set Anchor Posistion
function showCoordinateInput(selectedBuilding, selectedanchor) {
  // Hiển thị hộp thoại nhập tọa độ
  Swal.fire({
    title: `Enter coordinates for anchor`,
    html: `
              <label for="newXCoordinate">X Coordinates:</label>
              <input type="text" id="newXCoordinate" placeholder="Coordinates for X">
              <br/>
              <label for="newYCoordinate">Y Coordinates:</label>
              <input type="text" id="newYCoordinate" placeholder="Coordinates for Y">
              <br/>
              <label for="newZCoordinate">Z Coordinates:</label>
              <input type="text" id="newZCoordinate" placeholder="Coordinates for Z">
          `,
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonText: "Save",
    preConfirm: () => {
      // Lấy giá trị tọa độ mới từ input
      const newXCoordinate = document.getElementById("newXCoordinate").value;
      const newYCoordinate = document.getElementById("newYCoordinate").value;
      const newZCoordinate = document.getElementById("newZCoordinate").value;

      // Kiểm tra xem tọa độ có hợp lệ không
      
      if (!newXCoordinate || !newYCoordinate) {
        Swal.showValidationMessage("Please enter full coordinates.");
      } else {
        // Cập nhật tọa độ mới lên Firebase cho anchor đã chọn
        updateanchorCoordinates(
          selectedBuilding,
          selectedanchor,
          newXCoordinate,
          newYCoordinate,
          newZCoordinate
        );
      }
    },
  });
}
// Cập nhật tọa độ mới cho Anchor trong Menu Set Anchor Posistion
function updateanchorCoordinates(selectedBuilding, selectedanchor, newX, newY, newZ) {
  // Cập nhật tọa độ mới lên Firebase
  db.ref(`/${selectedBuilding}/${selectedanchor}/coordinates`)
    .set({
      x: newX,
      y: newY,
      z: newZ
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

//Dùng để hiển thị Anchors và Products
//reuse
function updatePosition(snapshot, id) {
  if (snapshot.val()) {
    var element = document.getElementById(id);
    var x = snapshot.val().coordinates.x || 0;
    var y = snapshot.val().coordinates.y || 0;
    var z = snapshot.val().coordinates.z || 0;
    element.style.left = x + "px";
    element.style.top = y + "px";
  }
}

const updatePositionRealTime = (building, floor) => {
  // Duyệt qua dữ liệu trong 'product'
  db.ref(`/${building}/${floor}/product`).on(
    "value",
    function (productSnapshot) {
      productSnapshot.forEach(function (childSnapshot) {
        var productId = childSnapshot.key;
        var product = document.getElementById(productId);
        if (product) {
          updatePosition(childSnapshot, productId);
        }
      });
    }
  );

  // Duyệt qua dữ liệu trong 'anchor'
  db.ref(`/${building}/${floor}/anchor`).on("value", function (anchorSnapshot) {
    anchorSnapshot.forEach(function (childSnapshot) {
      var anchorId = childSnapshot.key;
      var anchor = document.getElementById(anchorId);
      if (anchor) {
        updatePosition(childSnapshot, anchorId);
      }
    });
  });
};

// cập nhật position realtime
document.addEventListener("DOMContentLoaded", function () {
  // Duyệt qua dữ liệu trong 'product'
  const buildingArray = Object.values(BUILDING_LISTs);
  const floorArray = Object.values(FLOOR_LISTs);
  buildingArray.forEach((building) => {
    floorArray.forEach((floor) => {
      updatePositionRealTime(building, floor);
    });
  });
});

// Không cần thiết nếu bạn không muốn thêm hiệu ứng cho header khi dính
window.addEventListener('scroll', function() {
    var header = document.getElementById("myTopnav");
    if (window.pageYOffset > 0) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});
//newMenu
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function refreshPage() {
  location.reload();
}
//change brg
document.addEventListener("DOMContentLoaded", function() {
  const menuItems = document.querySelectorAll('.topnav a');

  menuItems.forEach(item => {
    item.addEventListener('click', function(event) {
      event.preventDefault();
      const menuId = item.id;
      changeBackground(menuId);
    });
  });
});

function changeBackground(menu) {
  document.body.className = menu;
}

export { showCoordinateInput, updatePosition, myFunction, changeBackground, refreshPage };
