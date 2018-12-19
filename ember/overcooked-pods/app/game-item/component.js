import Component from "@ember/component";
import Constants from "overcooked-pods/constants";

export default Component.extend({
  didRender() {
    this.set("offset", (Constants.BoxSize - Constants.ItemSize) / 2);
    this._super(...arguments);
    this.element.firstChild.style.left = this.get("offset") + "px";
    this.element.firstChild.style.bottom = this.get("offset") + "px";
    this.element.firstChild.style.backgroundImage = 
      `url('${Constants.ImagesRootPath}${this.get("model.type.image")}')`;
  }

  // click: function(e) {
  //   // pickup item || do stuff if on action block
  //   debugger;
  // }
});
