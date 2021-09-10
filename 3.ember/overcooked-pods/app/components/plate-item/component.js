import Item from "overcooked-pods/components/game-item/component";
import Player from "overcooked-pods/components/game-player/model";
import { alias } from "@ember/object/computed";
import { computed } from "@ember/object";
import { htmlSafe } from "@ember/string";
import Constants from "../../constants";

export default Item.extend({
  itemClass: alias("model.itemClass"),

  init(...args) {
    this._super(args);

    switch (this.get("model.type.id")) {
      case 0:
        this.set("itemClass", "plate");
        break;

      case 1:
        this.set("itemClass", "pan");
        break;

        case 2:
          this.set("itemClass", "boiling-pan");
          break;

        case 3:
          this.set("itemClass", "frying-pan");
          break;

      default:
        throw new Error("item type doesn't comply");
    }
  },

  mouseEnter() {
    if (this.get("model.parent") instanceof Player) {
      return;
    }
    if (!this.playerHasItem()) {
      this.tooltipManager.showTooltip({
        componentName: "text-component",
        componentOptions: { text: "Pick up item" },
        rect: this.element.querySelector(".item").getBoundingClientRect()
      });
    } else {
      this.tooltipManager.showTooltip({
        componentName: "text-component",
        componentOptions: { text: "Place ingredient" },
        rect: this.element.querySelector(".item").getBoundingClientRect()
      });
    } 
  },

  contextMenu() {
    this.set("model.ingredients", null);
    this.set("model.result", null);
    if (this.get("model.progress")) {
      this.set("model.progress", 0);
    }
    return false;
  },

  resultStyle: computed("model.result", function() {
    if (this.get("model.result.image")) {
      return htmlSafe(`background-image: url('${Constants.URI.ImagesRootPath}${this.get("model.result.image")}')`);
    }
  })
});