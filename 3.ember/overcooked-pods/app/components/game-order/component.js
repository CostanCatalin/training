import Component from "@ember/component";
import Constants from "overcooked-pods/constants";
import { observer, set, get } from "@ember/object";
import { htmlSafe } from "@ember/string";
import { inject as service } from "@ember/service";

export default Component.extend({
  model: null, //comes in
  recipes: service("game-recipes"),
  recipe: null,
  style: null,
  barStyle: null,

  init(...args) {
    this._super(args);
    this.set("recipe", this.get("recipes").getById(this.get("model.recipeId")));

    for (let i = 0; i < this.get("recipe.ingredients").length; i++) {
      let ingredient = this.get("recipe.ingredients").objectAt(i);
      let image = get(ingredient, "type.image").objectAt(get(ingredient, "state"));
      set(ingredient, "style", htmlSafe(`background-image: url('${Constants.URI.ImagesRootPath}${image}');`));
    }
    
    if (this.get("recipe.image")) {
      this.set("style", htmlSafe(`background-image: url('${Constants.URI.ImagesRootPath}${this.get("recipe.image")}')`));
    }
  },

  progressChanged: observer("model.progress", function() {
    this.set("barStyle", htmlSafe(`width: ${(1 - this.get("model.progress")) * 100}%;`));
    let color = null;

    if (this.get("model.progress") < 0.3) {
      return;
    } else if (this.get("model.progress") < 0.5) {
      color = Constants.Colours.yellow;
    } else if (this.get("model.progress") < 0.8) {
      color = Constants.Colours.ember;
    } else {
      color = Constants.Colours.danger;
    }

    this.set("barStyle", htmlSafe(`${this.get("barStyle")}; background-color: ${color};`));
  })
});
