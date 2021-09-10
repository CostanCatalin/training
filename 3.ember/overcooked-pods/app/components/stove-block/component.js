import GameBlock from "overcooked-pods/components/game-block/component";
import Ingredient from "overcooked-pods/components/ingredient-item/model";
import { observer } from "@ember/object";
import { alias } from "@ember/object/computed";

export default GameBlock.extend({
  reqID: null,
  start: null,
  item: alias("model.item"),
  
  itemChanged: observer("item", "item.ingredients.[]", function() {
    if (this.get("item")
      && !(this.get("item") instanceof Ingredient)
      && this.get("item.ingredients")
      && this.get("item.ingredients").length > 0) {
        this.reqID = window.requestAnimationFrame(this.action.bind(this));
    } else if (this.reqID) {
      window.cancelAnimationFrame(this.reqID);
      this.reqID = null;
      this.start = null;
    }
  }),

  action: function(timestamp) {
    if (!this.get("item") || !this.get("item.ingredients")) {
      this.reqID = null;
      return;
    }
    if (!this.start) {
      this.start = timestamp;
      this.start -= this.get("item.progress") * this.get("item.stateChangeTimeNeeded") * this.get("item.ingredients").length / 100;
    }

    let progress = timestamp - this.start;
    let percent = Math.round(progress / this.get("item.stateChangeTimeNeeded") 
      / this.get("item.ingredients").length * 100);


    if (percent < 100) {
      this.set("item.progress", percent);
    } else {
      this.set("item.state", this.get("item.transformsToState"));
      this.set("item.progress", 100);
      let recipe = this.recipesService.ingredientsToRecipe(this.get("item"));
      
      this.set("item.result", recipe);
      this.set("item.ingredients", null);
      this.reqID = null;
      this.start = null;
      return;
    }

    if (this.reqID) {
      this.reqID = window.requestAnimationFrame(this.action.bind(this));
    }
  },

  actions: {
    playerHasItem() {
      return this.playerHasItem();
    }
  }
});
