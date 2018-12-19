import Component from "@ember/component";
import Constants from "overcooked/constants";

export default Component.extend({
  didRender() {
    this._super(...arguments);
    this.element.firstChild.style.left = this.get("x") * Constants.BoxSize  + "px";
    this.element.firstChild.style.top = this.get("y") * Constants.BoxSize  + "px";
    if (this.type && this.type.image) {
      this.element.firstChild.style.backgroundImage = `url('${Constants.ImagesRootPath}/${this.type.image}')`;
    }
  }

  // click: function(e) {
  //   console.log("put/take item on/from it");
  // }
});
