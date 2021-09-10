import GameBlock from "overcooked-pods/components/game-block/component";
import { set } from "@ember/object";
import Ingredient from "overcooked-pods/components/ingredient-item/model";
import { inject as service } from "@ember/service";
import Constants from "../../constants";
import { htmlSafe } from "@ember/string";

export default GameBlock.extend({
  player: null, //comes
  tooltipManager: service("tooltip-manager"),
  ingredientTypeStyle: null,

  init(...args) {
    this._super(args);
    this.set("ingredientTypeStyle", htmlSafe(`background-image: url('${Constants.URI.ImagesRootPath}${this.get("model.ingredientType.image").objectAt(0)}');`));
  },

  click: function() {
    this.blockClick();
    
    if (this.get("model.item") == undefined) {
      let ingredient = new Ingredient({
        type: this.get("model.ingredientType")
      });
      
      this.set("model.item", ingredient);
      set(ingredient, "parent", this.get("model"));

      // auto pickup
      if (this.get("player.item") == undefined) {
        this.itemClick();
      }
    }
  },

  mouseEnter: function() {
    if (this.playerHasItem()) {
      this.tooltipManager.showTooltip({
        componentName: "text-component",
        componentOptions: { text: "Drop item" },
        rect: this.element.querySelector(".block").getBoundingClientRect()
      });
    } else if (this.get("model.item") == undefined) {
      this.tooltipManager.showTooltip({
        componentName: "text-component",
        componentOptions: { text: "Pick up ingredient" },
        rect: this.element.querySelector(".block").getBoundingClientRect()
      });
    }
  }
});