import GameBlock from "overcooked-pods/components/game-block/component";
import { observer } from "@ember/object";
import { alias } from "@ember/object/computed";

export default GameBlock.extend({
  reqID: null,
  start: null,
  model: null, //comes in
  item: alias("model.item"),
  
  itemChanged: observer("model.item", function() {
    if (this.get("model.item") != undefined 
      && this.get("model.item.componentName") == "ingredient-item"
      && this.get("model.transformsFromState") == this.get("model.item.state")
      && this.get("model.transformsToState") != this.get("model.item.state")) {
        this.reqID = window.requestAnimationFrame(this.action.bind(this));
    } else if (this.reqID) {
      window.cancelAnimationFrame(this.reqID);
      this.reqID = null;
      this.start = null;
    }
  }),

  action: function(timestamp) {
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
  }
});