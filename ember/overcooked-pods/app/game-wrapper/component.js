/* eslint-disable no-nested-ternary */
/* eslint-disable complexity */
import Component from "@ember/component";
import { set } from "@ember/object";
import Ingredient from "overcooked-pods/ingredient-item/model";
import Constants from "overcooked-pods/constants";

export default Component.extend({
  click: function(e) {
    let x,
        y;

    if (e.target.classList.contains("block")) {
      let id = parseInt(e.target.getAttribute("data-id"), 10);
      let block = this.get("model").getBlockById(id);
      x = block.x;
      y = block.y;

      if (this.get("model.player.item") != undefined && block.get("item") == undefined) {
        block.set("item", this.get("model.player.item"));
        block.set("item.parent", block);
        this.set("model.player.item", undefined);
      }

      // add ingredient
      if (e.target.classList.contains("ingredient-block") && block.get("item") == undefined) {
        let newIngredient = Ingredient.create({
          id: this.get("model").getNextItemId(),
          type: block.get("ingredientType")
        });
        set(newIngredient, "parent", block);
        set(block, "item", newIngredient);
        this.get("model.items").pushObject(newIngredient);
      }
    } else {
      if (e.target.classList.contains("item") && (this.get("model.player.item") == undefined)) {
        let id = parseInt(e.target.getAttribute("data-id"), 10);
        let item = this.get("model").getItemById(id);
        this.set("model.player.item", item);

        if (this.get("model.player.item.parent") != undefined) {
          this.set("model.player.item.parent.item", undefined);
        }

        this.set("model.player.item.parent", this.get("model.player"));
      } else if (e.target.classList.contains("item-plate") 
        && this.get("model.player.item") != undefined
        && this.get("model.player.item.componentName") == "ingredient-item") {
        // place ingredient in plate
        let id = parseInt(e.target.getAttribute("data-id"), 10);
        let plate = this.get("model").getItemById(id);
        let success = plate.addIngredient(this.get("model.player.item"));
        if (success) {
          this.set("model.player.item", null);
        }
      }
      // TODO: do block action      
      let rect = this.element.firstChild.getBoundingClientRect();
      x = (e.pageX - rect.left) / Constants.BoxSize;
      y = (e.pageY - rect.top) / Constants.BoxSize;

      if (x < 0 || y < 0 
        || x > this.get("model.width")
        || y > this.get("model.height")) {
        return;
      }
    }

    x = x < 1 ? 1 : (x >= this.get("model.width") - 1 ? this.get("model.width") - 2 : x);
    y = y < 1 ? 1 : (y >= this.get("model.height") - 1 ? this.get("model.height") - 2 : y);
    
    this.set("model.player.x", x);
    this.set("model.player.y", y);
  }
});
