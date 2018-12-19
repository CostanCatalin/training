import ActionBlock from "overcooked-pods/action-block/model";
import Constants from "overcooked-pods/constants";

export default ActionBlock.extend({
  componentName: "chopping-block",
  transformsFromState:  Constants.IngredientStateEnum.Whole,
  transformsToState: Constants.IngredientStateEnum.Cut
});