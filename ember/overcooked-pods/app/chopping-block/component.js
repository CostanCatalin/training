import ActionBlock from "overcooked-pods/action-block/component";
// import Constants from "overcooked-pods/constants";

export default ActionBlock.extend({
  start: null,
  action: function(timestamp) {
    if (!this.start) {
      this.start = timestamp;
    }

    let progress = timestamp - this.start;
    let percent = Math.round(progress / this.get("model.item.stateChangeTimeNeeded") * 100);
    if (percent == 100) {
      this.set("model.item.stateChangeProgress", 0);
      this.set("model.item.state", this.get("model.transformsToState"));
      return;
    } else {
      this.set("model.item.stateChangeProgress", percent);
    }
    
    this.req = window.requestAnimationFrame(this.action.bind(this));
  }
});