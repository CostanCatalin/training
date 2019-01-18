import Service from "@ember/service";
import { computed } from "@ember/object";

export default Service.extend({
  _tooltipComponent: null,
  tooltipComponent: computed("_tooltipComponent", {
    get: function() {
      return this._tooltipComponent;
    },
    set: function(key, value) {
      this.set("_tooltipComponent", value);
    }
  })
});
