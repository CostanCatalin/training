import ActionBlock from "overcooked-pods/components/action-block/model";
import Constants from "overcooked-pods/constants";

export default ActionBlock.extend({
  componentName: "stove-block",
  transformsFromState:  Constants.IngredientStateEnum.Cut,
  transformsToState: Constants.IngredientStateEnum.Boiled
});