import Service from "@ember/service";

let recipes = null;

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

  getById(id) {
    return recipes.find(rec => { return rec.id == id; });
  }
});
