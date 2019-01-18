import Plate from "overcooked-pods/components/plate-item/component";
import Constants from "overcooked-pods/constants";
import { observer, computed } from "@ember/object";
import { htmlSafe } from "@ember/string";

export default Plate.extend({
  model: null, //comes in

  ingredientAdded: observer("model.ingredients.[]", function() {
    if (!this.get("model.ingredients") || this.get("model.ingredients").length <= 1) {
      return;
    }
    let newTotal = this.get("model.stateChangeTimeNeeded") * this.get("model.ingredients").length;
    let oldTotal = this.get("model.stateChangeTimeNeeded") * (this.get("model.ingredients").length - 1);
    this.set("model.progress", this.get("model.progress") * oldTotal / newTotal);
  }),

  barWidthStyle: computed("model.progress", {
    get() {
      let style = `left: ${this.get("offset")}px; bottom: ${this.get("offset")}px;`;

      if (this.get("model.progress") == 0) {
        style += "width: 0px;";
      } else {
        style += `width: ${this.get("model.progress")}%;`;
      }
      return htmlSafe(style);
    }
  }),

  progressStyle: computed("model.progress", {
    get() {
      return htmlSafe("display: " + (this.get("model.progress") == 0 || this.get("model.progress") == 100 ? "none" : "initial"));
    }
  }),

  resultStyle: computed("model.result", function() {
    if (this.get("model.result.image")) {
      return htmlSafe(`background-image: url('${Constants.ImagesRootPath}${this.get("model.result.image")}')`);
    }
  })
});
