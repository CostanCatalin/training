import GameBlock from "overcooked-pods/components/game-block/model";
import Constants from "overcooked-pods/constants";

export default GameBlock.extend({
  componentName: "action-block",
  transformsFromState:  Constants.IngredientStateEnum.Whole,
  transformsToState: Constants.IngredientStateEnum.Whole
});