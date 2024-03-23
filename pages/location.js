import { floor } from "../actors/floor.js";

//--------------------LOCATION-------------------------
const PRE_STAGE_BUTTON_ID = "stageButton";
const floor1 = {
  rectangle: "rectangle",
  stage: "floor1",
};
const floor2 = {
  rectangle: "rectangle2",
  stage: "floor2",
};
const floor3 = {
  rectangle: "rectangle3",
  stage: "floor3",
};


const floors = document.getElementById("floors");
const floorInfoContainer = document.getElementById("floorInfoContainer");
const location = document.getElementById("location");
var showLocation = true;
const rectangleElement = document.getElementById(floor1.rectangle);

floors.style.display = "none";

floor(floor1.rectangle, floor1.stage);
floor(floor2.rectangle, floor2.stage);
floor(floor3.rectangle, floor3.stage);

location.addEventListener("click", function () {
  if (showLocation) {
    floors.style.display = "block";
    showLocation = false;
  } else {
    floors.style.display = "none";
    rectangleElement.style.display = "none";
    floorInfoContainer.style.display = "none";
    
    document.querySelectorAll(".product").forEach(function (product) {
      product.style.display = "none";
    });
    document.querySelectorAll(".anchor").forEach(function (anchor) {
      anchor.style.display = "none";
    });
    showLocation = true;
  }

});

