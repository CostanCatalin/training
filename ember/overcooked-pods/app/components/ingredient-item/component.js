/* eslint-disable ember/no-side-effects */
import Item from "overcooked-pods/components/game-item/component";
import Constants from "overcooked-pods/constants";
import { computed } from "@ember/object";
import { htmlSafe } from "@ember/string";

export default Item.extend({
  offset: null,

  init(...args) {
    this._super(args);
    this.set("offset", (Constants.BoxSize - Constants.ItemSize) / 2);
  },

  barWidthStyle: computed("model.stateChangeProgress", {
    get() {
      let style = `left: ${this.get("offset")}px; bottom: ${this.get("offset")}px;`;

      if (this.get("model.stateChangeProgress") == 0) {
        style += "width: 0px;";
      } else {
        style += `width: ${this.get("model.stateChangeProgress")}%;`;
      }
      return htmlSafe(style);
    }
  }),

  progressStyle: computed("model.stateChangeProgress", {
    get() {
      return htmlSafe("display: " + (this.get("model.stateChangeProgress") == 0 || this.get("model.stateChangeProgress") == 100 ? "none" : "initial"));
    }
  }),
  
  style: computed("model.state", {
    get() {
      let image = this.get("model.type.image").objectAt(this.get("model.state"));
      return htmlSafe(`background-image: url('${Constants.ImagesRootPath}${image}');`);
    }
  })
});