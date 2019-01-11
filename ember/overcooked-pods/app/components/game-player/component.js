import Component from "@ember/component";
import { observer } from "@ember/object";
import Constants from "overcooked-pods/constants";
import { htmlSafe } from "@ember/string";

export default Component.extend({
  model: null, //comes in
  style: null,

  positionChanged: observer("model.x", "model.y", function() {
    this.set("style", 
      htmlSafe(`left: ${this.get("model.x") * Constants.BoxSize}px; top: ${this.get("model.y") * Constants.BoxSize}px;`)
    );
  })
  
});
