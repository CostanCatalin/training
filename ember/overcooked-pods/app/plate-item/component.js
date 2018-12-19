import Item from "overcooked-pods/game-item/component";
import { observer } from "@ember/object";
// import Constants from "overcooked-pods/constants";

export default Item.extend({
  init() {
    this._super(...arguments);
    this.set("model.ingredients", []);
  },
  ingredientAdded: observer("model.ingredients.[]", function() {
    console.log(this.get("model.ingredients").length);
  })
});