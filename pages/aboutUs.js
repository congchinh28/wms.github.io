//--------------------ABOUT US-------------------------

import { hideStatics } from "./statics.js";
import { hideLocation } from "./location.js";

//Menu About Us
var isAboutUsVisible = false;
document.getElementById("aboutUs").addEventListener("click", function () {
  hideLocation();
  hideStatics();
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


  // document.getElementById("contentAboutUs").style.display = "block";
  // window.location.href = "./aboutUs.html"
});
const hideAboutUs = () => {
  document.getElementById("contentAboutUs").style.display = "none";
};

export { hideAboutUs };

