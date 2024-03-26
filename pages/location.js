import { building, hideBuildings } from "../actors/building.js";
import { hideAllInFloors } from "../actors/floor.js";
import { hideStatics } from "./statics.js";
import { hideAboutUs } from "./aboutUs.js";
import { BUILDING_LISTs } from "../assets/js/helpers.js";

//--------------------LOCATION-------------------------

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
building(BUILDING_LISTs["Building 1"]);
building(BUILDING_LISTs["Building 2"]);

const hideLocation = () => {
  hideAllInFloors();
  hideBuildings();
};

export { hideLocation };
