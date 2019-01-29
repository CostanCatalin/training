import GameBlock from "overcooked-pods/components/game-block/component";
import { observer } from "@ember/object";

export default GameBlock.extend({
  reqID: null,
  start: null,
  
  itemChanged: observer("model.item", "model.item.ingredients.[]", function() {
    if (this.get("model.item")
      && this.get("model.item.componentName") != "ingredient-item"
      && this.get("model.item.ingredients")
      && this.get("model.item.ingredients").length > 0) {
        this.reqID = window.requestAnimationFrame(this.action.bind(this));
    } else if (this.reqID) {
      window.cancelAnimationFrame(this.reqID);
      this.reqID = null;
      this.start = null;
    }
  }),

  action: function(timestamp) {
    if (!this.get("model.item")) {
      this.reqID = null;
      return;
    }
    if (!this.start) {
      this.start = timestamp;
      this.start -= this.get("model.item.progress") * this.get("model.item.stateChangeTimeNeeded") * this.get("model.item.ingredients").length / 100;
    }

    let progress = timestamp - this.start;
    let percent = Math.round(progress / this.get("model.item.stateChangeTimeNeeded") 
      / this.get("model.item.ingredients").length * 100);


    if (percent < 100) {
      this.set("model.item.progress", percent);
    } else {
      this.set("model.item.state", this.get("model.item.transformsToState"));
      this.set("model.item.progress", 100);
      let recipe = this.recipesService.ingredientsToRecipe(this.get("model.item"));
      
      this.set("model.item.result", recipe);
      this.set("model.item.ingredients", null);
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
