import { floor, hideAllInFloors } from "./floor.js";

const floor1 = {
  rectangle: "rectangle1",
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

const buildings = document.getElementById("buildings");

const building = (building) => {
  const maps = document.getElementsByClassName("map");
  const floors = document.getElementById("floors");
  const buildingbutton = document.createElement("button");
  const currentButton = document.getElementById(buildingbutton.id);
  buildingbutton.textContent = building;
  buildingbutton.setAttribute("class", "buildingButton");
  buildingbutton.id = building;
  if (!currentButton) buildings.appendChild(buildingbutton);

  var showBuilding = true;

  buildingbutton.addEventListener("click", function () {
    if (showBuilding) {
      floors.style.display = "block";
      floors.innerHTML='';
      for (let element of maps) {
        element.style.display = "flex";
      }
      floor(building, floor1.rectangle, floor1.stage);
      floor(building, floor2.rectangle, floor2.stage);
      floor(building, floor3.rectangle, floor3.stage);
      showBuilding = false;
    } else {
      hideAllInFloors();
      showBuilding = true;
    }
  });


};

const hideBuildings = () =>{
    buildings.style.display = "none";
}
export { building, hideBuildings};
