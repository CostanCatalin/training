import Component from "@ember/component";
import { computed } from "@ember/object";
import { htmlSafe } from "@ember/string";
import Constants from "../../constants";

export default Component.extend({
  options: null, //comes in
  style: computed("options.image", function() {
    return htmlSafe(`background-image: url('${Constants.URI.ImagesRootPath}/${this.options.image}'); width: ${this.options.width}; height: ${this.options.height}`);
  })
});