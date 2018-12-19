import Component from "@ember/component";
import Constants from "overcooked-pods/constants";

export default Component.extend({
  didRender() {
    this._super(...arguments);
    this.element.firstChild.style.left = this.get("model.x") * Constants.BoxSize  + "px";
    this.element.firstChild.style.top = this.get("model.y") * Constants.BoxSize  + "px";
    if (this.get("model.type") != undefined) {
      this.element.firstChild.style.backgroundImage = `url('${Constants.ImagesRootPath}/${this.get("model.type")}')`;
    }
  }

  // click: function(e) {
  //   console.log("put/take item on/from it");
  // }
});
