import Item from "overcooked-pods/components/game-item/component";
import { alias } from "@ember/object/computed";

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
  }
});