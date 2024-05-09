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
        <p><strong>ID:</strong> ${data.ID || "N/A"}</p>
        <p><strong>Building:</strong> ${data.building || "N/A"}</p>
        <p><strong>Floor:</strong> ${data.floor || "N/A"}</p>
        <p><strong>Tag:</strong> ${data.tag || "N/A"}</p>
        <p><strong>Date in:</strong> ${data.time || "N/A"}</p>
        <p><strong>Date out:</strong> ${data.timeOut || "N/A"}</p>
        <p><strong>Staff:</strong> ${data.staff || "N/A"}</p>
        <p><strong>Customer:</strong> ${data.customer || "N/A"}</p>
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

export { showProductDetails };
