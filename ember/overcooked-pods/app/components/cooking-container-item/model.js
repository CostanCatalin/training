import Plate from "overcooked-pods/components/plate-item/model";
import Constants from "overcooked-pods/constants";

export default Plate.extend({
  componentName: "cooking-container-item",
  progress: 0,
  stateChangeTimeNeeded: Constants.IngredientStateChangeTime
});
