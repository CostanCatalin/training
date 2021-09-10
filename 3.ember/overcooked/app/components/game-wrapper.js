/* eslint-disable no-nested-ternary */
/* eslint-disable complexity */
import Component from "@ember/component";
import Constants from "overcooked/constants";

export default Component.extend({
  click: function(e) {
    let x,
        y;
    if (!e.target.classList.contains("block")) {
      let rect = this.element.firstChild.getBoundingClientRect();
      x = (e.pageX - rect.left) / Constants.BoxSize;
      y = (e.pageY - rect.top) / Constants.BoxSize;

      if (x < 0 || y < 0 
        || x > this.model.width
        || y > this.model.height) {
        return;
      }
    } else {
      x = e.target.getAttribute("data-x");
      y = e.target.getAttribute("data-y");
      // TODO: do block action
    }

    x = x < 1 ? 1 : (x >= this.model.width - 1 ? this.model.width - 2 : x);
    y = y < 1 ? 1 : (y >= this.model.height - 1 ? this.model.height - 2 : y);
    
    this.model.player.set("x", x);
    this.model.player.set("y", y);
  }
});
