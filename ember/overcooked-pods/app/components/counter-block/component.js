import GameBlock from "overcooked-pods/components/game-block/component";
import { observer } from "@ember/object";
import { alias } from "@ember/object/computed";
import CookingContainer from "overcooked-pods/components/cooking-container-item/model";

export default GameBlock.extend({
  item: alias("model.item"),
  
  itemChanged: observer("model.item", function() {
    if (this.item && this.item.result && !(this.item instanceof CookingContainer)) {
      this.submitOrder();
    }
  })
});