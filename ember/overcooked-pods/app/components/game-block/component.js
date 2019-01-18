import Component from "@ember/component";
import Constants from "overcooked-pods/constants";
import { htmlSafe } from "@ember/string";

export default Component.extend({
  blockClick: null, // comes in
  itemClick: null, // comes in
  submitOrder: null, // comes in
  ingredientsToRecipe: null, // comes in
  style: null,

  init(...args) {
    this._super(args);
    this.set("style", htmlSafe(`left: ${this.get("model.x") * Constants.BoxSize}px; top: ${this.get("model.y") * Constants.BoxSize}px;`));
    if (this.get("model.type")) {
      this.set("style", htmlSafe(`${this.get("style")} background-image: url('${Constants.ImagesRootPath}/${this.get("model.type")}');`));
    }
  },

  click: function() {
    this.blockClick();
  },

  actions: {
    itemClick() {
      this.itemClick();
    }
  }
});
