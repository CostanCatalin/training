import GameBlock from "overcooked-pods/components/game-block/component";
import { get, observer } from "@ember/object";
import { alias } from "@ember/object/computed";
import Ingredient from "overcooked-pods/components/ingredient-item/model";

export default GameBlock.extend({
  reqID: null,
  start: null,
  model: null, //comes in
  item: alias("model.item"),
  
  itemChanged: observer("model.item", function() {
    if (this.item != undefined 
      && get(this.item, "componentName") == "ingredient-item"
      && this.get("model.transformsFromState") == this.get("model.item.state")
      && this.get("model.transformsToState") != this.get("model.item.state")
      && this.item.get("type.image").objectAt(this.get("model.transformsToState"))) {
        this.reqID = window.requestAnimationFrame(this.action.bind(this));
    } else if (this.reqID) {
      window.cancelAnimationFrame(this.reqID);
      this.reqID = null;
      this.start = null;
    }
  }),

  action(timestamp) {
    if (!this.start) {
      this.start = timestamp;
      this.start -= this.get("model.item.stateChangeProgress") * this.get("model.item.stateChangeTimeNeeded") / 100;
    }

    let progress = timestamp - this.start;
    let percent = Math.round(progress / this.get("model.item.stateChangeTimeNeeded") * 100);
    if (percent < 100) {
      this.set("model.item.stateChangeProgress", percent);
    } else {
      this.set("model.item.stateChangeProgress", 0);
      this.set("model.item.state", this.get("model.transformsToState"));
      this.reqID = null;
      this.start = null;
      return;
    }

    if (this.reqID) {
      this.reqID = window.requestAnimationFrame(this.action.bind(this));
    }
  },

  mouseEnter: function() {
    if (this.get("model.item") == null && this.player.item && this.player.item instanceof Ingredient) {
      this.tooltipManager.showTooltip({
        componentName: "image-component",
        componentOptions: {
          image: this.player.item.type.image.objectAt(this.get("model.transformsToState")),
          width: "100px",
          height: "100px"
        },
        rect: this.element.querySelector(".block").getBoundingClientRect()
      });
    }
  }
});