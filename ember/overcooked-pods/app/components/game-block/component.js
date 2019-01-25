import Component from "@ember/component";
import Constants from "overcooked-pods/constants";
import { htmlSafe } from "@ember/string";
import { inject as service } from "@ember/service";

export default Component.extend({
  blockClick: null, // comes in
  itemClick: null, // comes in
  submitOrder: null, // comes in
  recipesService: service("game-recipes"),
  tooltipManager: service("tooltip-manager"),
  style: null,

  init(...args) {
    this._super(args);
    this.set("style", htmlSafe(`left: ${this.get("model.x") * Constants.BoxSize}px; top: ${this.get("model.y") * Constants.BoxSize}px;`));
    if (this.get("model.type")) {
      this.set("style", htmlSafe(`${this.get("style")} background-image: url('${Constants.URI.ImagesRootPath}/${this.get("model.type")}');`));
    }
  },

  click: function() {
    this.blockClick();
  },

  mouseEnter: function() {
    if (this.playerHasItem() && this.get("model.item") == null) {
      this.tooltipManager.showTooltip({
        componentName: "text-component",
        componentOptions: { text: "Drop item" },
        rect: this.element.querySelector(".block").getBoundingClientRect()
      });
    }
  },

  mouseLeave: function()  {
    this.tooltipManager.hideTooltip();
  },

  actions: {
    itemClick() {
      return this.itemClick();
    },

    playerHasItem() {
      return this.playerHasItem();
    }
  }
});
