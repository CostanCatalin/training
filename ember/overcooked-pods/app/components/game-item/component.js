import Component from "@ember/component";
import Constants from "overcooked-pods/constants";
import { computed } from "@ember/object";
import { htmlSafe } from "@ember/string";
import { inject as service } from "@ember/service";
import Player from "overcooked-pods/components/game-player/model";

export default Component.extend({
  model: null, //comes in
  itemClick: null, //comes in
  playerHasItem: null, //comes in
  tooltipManager: service("tooltip-manager"),
  offset: 0,

  init(...args) {
    this._super(args);
    this.set("offset", (Constants.BoxSize - Constants.ItemSize) / 2);
  },

  style: computed("model", {
    get() {
      if (this.get("model.type.image")) {
        return htmlSafe(`left: ${this.get("offset")}px; bottom: ${this.get("offset")}px; background-image: url('${Constants.URI.ImagesRootPath}${this.get("model.type.image")}')`);
      }
    }
  }),

  click: function() {
    if (this.get("model.parent") instanceof Player) {
      return;
    }
    this.itemClick();
    this.tooltipManager.hideTooltip();
    return false;
  },

  mouseEnter: function() {
    if (this.model.parent.name != undefined || this.playerHasItem()) {
      return;
    }
    
    this.tooltipManager.showTooltip({
      componentName: "text-component",
      componentOptions: { text: "Pick up item" },
      rect: this.element.querySelector(".item").getBoundingClientRect()
    });
  },

  mouseLeave: function()  {
    this.tooltipManager.hideTooltip();
  }
});
