import { building, hideBuildings } from "../actors/building.js";
import { hideAllInFloors } from "../actors/floor.js";
import { hideStatics } from "./statics.js";
import { hideAboutUs } from "./aboutUs.js";

//--------------------LOCATION-------------------------

var building1 = "Building 1";
var building2 = "Building 2";

const buildings = document.getElementById("buildings");
const location = document.getElementById("location");
var showLocation = true;

buildings.style.display = "none";

location.addEventListener("click", function () {

  hideStatics();
  hideAboutUs();

  
  if (showLocation) {
    buildings.style.display = "block";
    showLocation = false;
  } else {
    buildings.style.display = "none";
    hideAllInFloors();
    showLocation = true;
  }
});

hideAllInFloors();
building(building1);
building(building2);

const hideLocation = () => {
  hideAllInFloors();
  hideBuildings();
};
export { hideLocation };
