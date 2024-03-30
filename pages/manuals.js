import { hideStatics } from "./statics.js";
import { hideLocation } from "./location.js";
import { hideAboutUs } from "./aboutUs.js";

var isManualsVisible = false;
document.getElementById("manuals").addEventListener("click", function () {
  hideLocation();
  hideStatics();
  hideAboutUs();
  document.querySelectorAll(".product").forEach(function (product) {
    product.style.display = "none";
  });
  const anchors = document.querySelectorAll(".anchor");
  anchors.forEach(function (anchor) {
    anchor.style.display = "none";
  });

  if (!isManualsVisible) {
    document.getElementById("contentManuals").style.display = "block";
    isManualsVisible = true;
  } else {
    document.getElementById("contentManuals").style.display = "none";
    isManualsVisible = false;
  }


  // document.getElementById("contentAboutUs").style.display = "block";
  // window.location.href = "./aboutUs.html"
});
const hideManuals = () => {
  document.getElementById("contentManuals").style.display = "none";
};

export { hideManuals };

