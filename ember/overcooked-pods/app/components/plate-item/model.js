import Item from "overcooked-pods/components/game-item/model";
import Constants from "overcooked-pods/constants";

export default Item.extend({
  componentName: "plate-item",
  ingredients: null,
  result: null,
  isValidRecipe: false,
  
  addIngredient: function(ing) {
    if (this.result != null) {
      return false;
    }
    
    if (this.get("ingredients") == null) {
      this.set("ingredients", []); 
    }
    if (this.get("ingredients.length") == Constants.MaxIngredients || ing.get("stateChangeProgress") > 0) {
      return false;
    }

    this.get("ingredients").addObject(ing);
    return true;
  },

  setResult(recipe) {
    this.set("ingredients", null);
    this.set("result", recipe);
  }
});