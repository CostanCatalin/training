import Item from "overcooked-pods/game-item/model";
import Constants from "overcooked-pods/constants";

export default Item.extend({
  componentName: "ingredient-item",
  state: Constants.IngredientStateEnum.Whole,
  stateChangeProgress: 0,
  stateChangeTimeNeeded: Constants.IngredientStateChangeTime
});