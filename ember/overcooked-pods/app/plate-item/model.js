import Item from "overcooked-pods/game-item/model";
import Constants from "overcooked-pods/constants";

export default Item.extend({
  componentName: "plate-item",
  ingredients: null,
  isValidRecipe: false,
  
  addIngredient: function(ing) {
    if (this.ingredients == null || this.ingredients.length == Constants.MaxIngredients) {
      return false;
    }

    this.ingredients.pushObject(ing);
    return true;
  }
});