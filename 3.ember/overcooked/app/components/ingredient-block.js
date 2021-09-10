import Component from "@ember/component";
import Constants from "overcooked/constants";

export default Component.extend({
  didRender() {
    this._super(...arguments);
    this.element.firstChild.style.left = this.get("x") * Constants.BoxSize  + "px";
    this.element.firstChild.style.top = this.get("y") * Constants.BoxSize  + "px";
  },

  click: function(e) {
    // create ingredient of this.type
    console.log(this);
    debugger;
  }
});
