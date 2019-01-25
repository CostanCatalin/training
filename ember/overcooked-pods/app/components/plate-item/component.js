import Item from "overcooked-pods/components/game-item/component";
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

      default:
        throw new Error("item type doesn't comply");
    }
  },

  mouseEnter() {
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

  resultStyle: computed("model.result", function() {
    if (this.get("model.result.image")) {
      return htmlSafe(`background-image: url('${Constants.URI.ImagesRootPath}${this.get("model.result.image")}')`);
    }
  })
});