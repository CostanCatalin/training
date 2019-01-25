import Service from "@ember/service";
import CookingContainer from "overcooked-pods/components/cooking-container-item/model";

let recipes = null;

let ingredientsMatch = function (ing1, ing2) {
  let matchedIndexes = [];
  if (ing1.length != ing2.length) {
    return false;
  }

  for (let i = 0; i < ing1.length; i++) {
    let found = false;
    for (let j = 0; j < ing2.length; j++) {
      if (ing1.objectAt(i).type.id == ing2.objectAt(j).type.id
      && ing1.objectAt(i).state == ing2.objectAt(j).state
      && matchedIndexes.indexOf(j) == - 1) {
        found = true;
        matchedIndexes.push(j);
      }
    }

    if (!found) {
      return false;
    }
  }

  return true;
};

export default Service.extend({
  initialize(data) {
    if (recipes == null) {
      recipes = data;
    }
  },

  add(item) {
    recipes.pushObject(item);
  },

  remove(item) {
    recipes.removeObject(item);
  },

  empty() {
    recipes.setObjects([]);
  },

  getAll() {
    return recipes;
  },

  getById(id) {
    return recipes.find(rec => { return rec.id == id; });
  },

  ingredientsToRecipe(plate) {
    let recipe = recipes.objectAt(0);
    for (let i = 1; i < recipes.length; i++) {
      if (recipes.objectAt(i).ingredients.length != plate.ingredients.length) {
        continue;
      }

      if (recipes.objectAt(i).cookedTogether && !(plate instanceof CookingContainer)) {
        continue;
      }

      if (ingredientsMatch(recipes.objectAt(i).ingredients, plate.ingredients)) {
        return recipes.objectAt(i);
      }
    }

    return recipe;
  }
});
