import Component from "@ember/component";
import { observer } from "@ember/object";
import Constants from "overcooked/constants";

export default Component.extend({
  didRender() {
    this.set("offset", (Constants.BoxSize - Constants.ItemSize) / 2);
    this._super(...arguments);
    this.element.firstChild.style.left = this.get("x") * Constants.BoxSize + this.get("offset") + "px";
    this.element.firstChild.style.top = this.get("y") * Constants.BoxSize + this.get("offset") + "px";
    this.element.firstChild.style.backgroundImage = `url('${Constants.ImagesRootPath}/${this.type.image}')`;
  },

  positionChanged: observer("x", "y", function() {
    this.element.firstChild.style.left = this.get("x") * Constants.BoxSize + this.get("offset") + "px";
    this.element.firstChild.style.top = this.get("y") * Constants.BoxSize + this.get("offset") + "px";
  })

  // click: function(e) {
  //   // pickup item || do stuff if on action block
  // }
});
