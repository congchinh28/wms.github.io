

import { hideStatics } from "./statics.js";
import { hideLocation } from "./location.js";
import { hideManuals } from "./manuals.js";

var isAboutUsVisible = false;
document.getElementById("aboutUs").addEventListener("click", function () {
  hideLocation();
  hideStatics();
  hideManuals();
  document.querySelectorAll(".product").forEach(function (product) {
    product.style.display = "none";
  });
  const anchors = document.querySelectorAll(".anchor");
  anchors.forEach(function (anchor) {
    anchor.style.display = "none";
  });

  if (!isAboutUsVisible) {
    document.getElementById("contentAboutUs").style.display = "block";
    isAboutUsVisible = true;
  } else {
    document.getElementById("contentAboutUs").style.display = "none";
    isAboutUsVisible = false;
  }


});
const hideAboutUs = () => {
  document.getElementById("contentAboutUs").style.display = "none";
  isAboutUsVisible = false;
};

export { hideAboutUs };

