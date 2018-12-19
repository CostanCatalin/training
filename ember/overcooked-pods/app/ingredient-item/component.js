import Item from "overcooked-pods/game-item/component";
import Constants from "overcooked-pods/constants";
import { observer } from "@ember/object";

export default Item.extend({
  didRender() {
    this.set("offset", (Constants.BoxSize - Constants.ItemSize) / 2);
    this._super(...arguments);
    this.element.firstChild.style.left = this.get("offset") + "px";
    this.element.firstChild.style.bottom = this.get("offset") + "px";

    this.updateImage();
    this.statusChanged();
  },

  percentageChanged: observer("model.stateChangeProgress", function() {
    this.updateImage();
  }),

  statusChanged: observer("model.state", function() {
    this.element.firstChild.style.backgroundImage = 
    `url('${Constants.ImagesRootPath}${this.get("model.type.image")[this.get("model.state")]}')`;
  }),

  updateImage: function() {
    if (this.get("model.stateChangeProgress") == 0) {
      this.element.querySelector(".progress").classList.add(Constants.hideClass);
      this.element.querySelector(".progress .bar").style.width = "0px";
    } else {
      this.element.querySelector(".progress").classList.remove(Constants.hideClass);
      this.element.querySelector(".progress .bar").style.width = this.get("model.stateChangeProgress") + "%";
    }
  }
});