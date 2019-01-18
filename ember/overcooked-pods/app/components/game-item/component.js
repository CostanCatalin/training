import Component from "@ember/component";
import Constants from "overcooked-pods/constants";
import { computed } from "@ember/object";
import { htmlSafe } from "@ember/string";

export default Component.extend({
  model: null, //comes in
  itemClick: null, //comes in
  offset: 0,

  init(...args) {
    this._super(args);
    this.set("offset", (Constants.BoxSize - Constants.ItemSize) / 2);
  },

  style: computed("model", {
    get() {
      if (this.get("model.type.image")) {
        return htmlSafe(`left: ${this.get("offset")}px; bottom: ${this.get("offset")}px; background-image: url('${Constants.ImagesRootPath}${this.get("model.type.image")}')`);
      }
    }
  }),

  click: function() {
    this.itemClick();
    return false;
  }
});
