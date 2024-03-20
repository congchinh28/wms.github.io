import { floor } from "../actors/floor.js";
//Theo dõi trạng thái cái phần tử trên trang Web
// var isElementsVisible = false;

//--------------------LOCATION-------------------------
const PRE_STAGE_BUTTON_ID = "stageButton";
const floor1 = {
  rectangle: "rectangle",
  stage: "floor1",
};


const floors = document.getElementById("floors");
const floorInfoContainer = document.getElementById("floorInfoContainer");
const location = document.getElementById("location");
var showLocation = true;
const rectangleElement = document.getElementById(floor1.rectangle);

floors.style.display = "none";

floor(floor1.rectangle, floor1.stage);

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
