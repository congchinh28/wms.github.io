import { building, hideBuildings } from "../actors/building.js";
import { hideAllInFloors } from "../actors/floor.js";
import { hideStatics } from "./statics.js";
import { hideAboutUs } from "./aboutUs.js";
import { BUILDING_LISTs } from "../assets/js/helpers.js";
import { hideManuals } from "./manuals.js";


const buildings = document.getElementById("buildings");
const location = document.getElementById("location");
var showLocation = true;

buildings.style.display = "none";

location.addEventListener("click", function () {
  hideStatics();
  hideAboutUs();
  hideManuals();
  buildings.innerHTML = "";
  hideAllInFloors();
  buildings.style.display = "block";
  building(BUILDING_LISTs["Building 1"]);
  building(BUILDING_LISTs["Building 2"]);
  if (showLocation) {
    buildings.style.display = "block";
    showLocation = false;
  } else {
    hideAllInFloors();
    showLocation = true;
  }
});

hideAllInFloors();

const hideLocation = () => {
  hideAllInFloors();
  hideBuildings();
};

export { hideLocation };
