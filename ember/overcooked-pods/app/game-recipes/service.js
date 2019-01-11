import Service from "@ember/service";
import Constants from "overcooked-pods/constants";

let recipes = null;

export default Service.extend({

  init(...args) {
    this._super(args);

    function JsonReceived(param) {
      let json = param.target.responseText;
      recipes = JSON.parse(json);
    }

    recipes = [];
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", JsonReceived.bind(this));
    oReq.open("GET", `${Constants.URI.Root}/${Constants.URI.JSON.Recipes}`);
    oReq.send();
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
