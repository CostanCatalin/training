import Service from "@ember/service";
import { computed } from "@ember/object";

export default Service.extend({
  _tooltipComponent: null,
  tooltipComponent: computed("_tooltipComponent", {
    get: function() {
      return this._tooltipComponent;
    },
    set: function(key, value) {
      this.removeListenersFromTooltip(this._tooltipComponent);
      this.set("_tooltipComponent", value);
      this.addListenerToTooltip(value);
      return value;
    }
  }),

  removeListenersFromTooltip: function(tooltipComponent) {
    if (tooltipComponent) {
      tooltipComponent.off("tooltipMouseEnter", this, this.tooltipMouseEnterHandler);
      tooltipComponent.off("tooltipMouseLeave", this, this.tooltipMouseLeaveHandler);
    }
  },

  addListenerToTooltip: function(tooltipComponent) {
    if (tooltipComponent) {
      tooltipComponent.on("tooltipMouseEnter", this, this.tooltipMouseEnterHandler);
      tooltipComponent.on("tooltipMouseLeave", this, this.tooltipMouseLeaveHandler);
    }
  },

  showTooltip: function(options) {
    this.tooltipComponent.show(options);
  },

  hideTooltip: function() {
    this.tooltipComponent.hide();
  }
});
