// ############## Firebase end
import db from "../assets/js/firebase.js";
import { updatePosition } from "../assets/js/helpers.js";
import { showAnchorDetails } from "./anchor.js";
import { showProductDetails } from "./product.js";

function displayFloorInformation(name, address, productCount, anchorCount) {
  const floorInfoContainer = document.getElementById("floorInfoContainer");
  // Xây dựng nội dung thông tin
  var infoHTML = `
              <div class="floor-info">
                  <h3>Floor Information</h3>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Address:</strong> ${address}</p>
                  <p><strong>Total Products:</strong> ${productCount}</p>
                  <p><strong>Total Anchors:</strong> ${anchorCount}</p>
              </div>
          `;

  // Thêm nội dung vào khung thông tin
  floorInfoContainer.innerHTML = infoHTML;
}

//Theo dõi trạng thái cái phần tử trên trang Web
// var isElementsVisible = false;

//--------------------LOCATION-------------------------

//Truy cập đến map trong menutracuus
const floor = (rectangle, stage) => {
  const thisFloor = stage;
  const stageButton = document.createElement("button");
  const rectangleElement = document.getElementById(rectangle);
  const currentButton = document.getElementById(stageButton.id);
  const floors = document.getElementById("floors");
  const floorInfoContainer = document.getElementById("floorInfoContainer");
  if (!currentButton) floors.appendChild(stageButton);

  var showStage = true;

  stageButton.textContent = thisFloor;
  stageButton.setAttribute("class", "stageButton");
  stageButton.id = "stageButton" + stage;

  stageButton.addEventListener("click", function () {
    if (showStage) {
      // Hiển thị các phần tử khi click vào nút "Tầng 1"
      rectangleElement.style.display = "block";
      floorInfoContainer.style.display = "block";
      document.querySelectorAll(".product").forEach(function (product) {
        product.style.display = "block";
      });
      document.querySelectorAll(".anchor").forEach(function (anchor) {
        anchor.style.display = "block";
      });

      // Cập nhật trạng thái đã click vào nút "Tầng 1"
      showStage = false;
    } else {
      // Nếu click vào nút "Tầng 1" trước đó, ấn vào nút lần nữa sẽ ẩn đi các phần tử
      rectangleElement.style.display = "none";
      floorInfoContainer.style.display = "none";
      document.querySelectorAll(".product").forEach(function (product) {
        product.style.display = "none";
      });
      document.querySelectorAll(".anchor").forEach(function (anchor) {
        anchor.style.display = "none";
      });

      // Cập nhật trạng thái đã click vào nút "Tầng 1"
      showStage = true;
    }
    // Truy cập dữ liệu tên và địa chỉ từ Firebase
    db.ref(`/Building 1/${stage}/information`).once(
      "value",
      function (snapshot) {
        var name = snapshot.val().name || "N/A";
        var address = snapshot.val().address || "N/A";

        // Tính tổng số lượng sản phẩm từ Firebase
        db.ref(`/Building 1/${stage}/product`).once(
          "value",
          function (productSnapshot) {
            var productCount = productSnapshot.numChildren();

            // Tính tổng số lượng anchor từ Firebase
            db.ref(`/Building 1/${stage}/anchor`).once(
              "value",
              function (anchorSnapshot) {
                displayFloorInformation(
                  name,
                  address,
                  productCount,
                  anchorSnapshot.numChildren()
                );
              }
            );
          }
        );
      }
    );
  });
  //Theo dõi trạng thái của Button floor 1
  //Hiển thị product trên Map
  document.querySelectorAll(".product").forEach(function (product, index) {
    product.style.display = "block";
    var productId = "product" + (index + 1);

    db.ref(`/Building 1/${stage}/product`).once(
      "value",
      function (productSnapshot) {
        updatePosition(productSnapshot.child(productId).val(), product.id);
      }
    );

    product.addEventListener("click", function () {
      showProductDetails("Building 1", stage, productId);
    });
  });
  //Hiển thị anchor trên map
  document.querySelectorAll(".anchor").forEach(function (anchor, index) {
    anchor.style.display = "block";
    var anchorId = "anchor" + (index + 1);

    db.ref(`/Building 1/${stage}/anchor`).once(
      "value",
      function (anchorSnapshot) {
        updatePosition(anchorSnapshot.child(anchorId).val(), anchor.id);
      }
    );
  });
  //Khi bắt đầu, các phần tử rectangle, product, anchor ẩn đi.
  rectangleElement.style.display = "none";
  document.querySelectorAll(".product").forEach(function (product) {
    product.style.display = "none";
  });
  document.querySelectorAll(".anchor").forEach(function (anchor) {
    anchor.style.display = "none";
  });


  //Tải dữ liệu của Products và Anchors từ Firebase
  document.addEventListener("DOMContentLoaded", function () {
    // Duyệt qua dữ liệu trong 'product'
    db.ref(`/Building 1/${stage}/product`).on(
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
    db.ref(`/Building 1/${stage}/anchor`).on(
      "value",
      function (anchorSnapshot) {
        anchorSnapshot.forEach(function (childSnapshot) {
          var anchorId = childSnapshot.key;
          var anchor = document.getElementById(anchorId);
          if (anchor) {
            updatePosition(childSnapshot, anchorId);
          }
        });
      }
    );
  });

  //Hiển thị anchors và thêm sự kiện khi click vào nó
  document.querySelectorAll(".anchor").forEach(function (anchor, index) {
    anchor.style.display = "block";
    var anchorId = "anchor" + (index + 1);

    anchor.addEventListener("click", function () {
      showAnchorDetails("Building 1", stage, anchorId);
    });
  });

  // Cập nhật Nội dung của Nút Floor 1
  function updateStageButtonContent(productCount, anchorCount) {
    stageButton.textContent = `Floor 1 (${productCount}P/${anchorCount}A)`;
  }

  // Hàm tính tổng số lượng sản phẩm và anchor của tầng 1
  function calculateProductAndAnchorCounts() {
    var productCount = 0;
    var anchorCount = 0;

    // Tính tổng số lượng sản phẩm
    db.ref(`/Building 1/${stage}/product`).once(
      "value",
      function (productSnapshot) {
        productCount = productSnapshot.numChildren();
        // Cập nhật nội dung của nút Floor 1
        updateStageButtonContent(productCount, anchorCount);
      }
    );

    // Tính tổng số lượng anchor
    db.ref(`/Building 1/${stage}/anchor`).once(
      "value",
      function (anchorSnapshot) {
        anchorCount = anchorSnapshot.numChildren();
        // Cập nhật nội dung của nút Floor 1
        updateStageButtonContent(productCount, anchorCount);
      }
    );
  }

  // Gọi hàm để tính và cập nhật tổng số lượng sản phẩm và anchor khi trang được tải
  calculateProductAndAnchorCounts();

};
export { floor };
