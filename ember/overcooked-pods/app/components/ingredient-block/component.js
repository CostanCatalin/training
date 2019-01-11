import GameBlock from "overcooked-pods/components/game-block/component";
import { set } from "@ember/object";
import Ingredient from "overcooked-pods/components/ingredient-item/model";
// import Constants from "overcooked-pods/constants";

export default GameBlock.extend({
  click: function() {
    this.blockClick();
    
    if (this.get("model.item") == undefined) {
      let ingredient = new Ingredient({
        type: this.get("model.ingredientType")
      });
      
      this.set("model.item", ingredient);
      set(ingredient, "parent", this.get("model"));
    }
  }
});