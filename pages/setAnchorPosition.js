//--------------------SET ANCHOR POSISTION-------------------------
//Menu Set Anchor Posistion
document.getElementById("menuB").addEventListener("click", function () {
    // Hiển thị dropdown danh sách anchor
    Swal.fire({
      title: "Select Anchor",
      input: "select",
      inputOptions: {
        anchor1: "Anchor 1",
        anchor2: "Anchor 2",
        anchor3: "Anchor 3",
        anchor4: "Anchor 4",
        // Thêm các anchor khác nếu cần
      },
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
  
    // Ẩn rectangle và product
    rectangleElement.style.display = "none";
    document.querySelectorAll(".product").forEach(function (product) {
      product.style.display = "none";
    });
  
    // Đặt trạng thái của rectangle là không hiển thị
    isRectangleVisible = false;
  
    // Ẩn các anchor
    const anchors = document.querySelectorAll(".anchor");
    anchors.forEach(function (anchor) {
      anchor.style.display = "none";
    });
    document.getElementById("floor1Button").style.display = "none";
  });
  