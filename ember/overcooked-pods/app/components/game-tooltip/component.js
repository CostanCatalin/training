import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { htmlSafe } from "@ember/string";
import Constants from "../../constants";

export default Component.extend({
  tooltipManager: service("tooltip-manager"),
  componentName: null, //from options
  componentOptions: null, //from options
  arrowStyle: null,
  style: null,
  
  init: function(...args) {
    this._super(args);
    this.tooltipManager.set("tooltipComponent", this);
  },

  show: function(opt) {
    let options = opt;
    this.set("options", options);
    let tooltip = this.element.querySelector(".tooltip__content");
    let tooltipWidth = tooltip.offsetWidth;
    let tooltipHeight = tooltip.offsetHeight;

    if (options.rect == null) {
      return;
    }
    
    if (options.componentName != null) {
      this.set("componentName", options.componentName);
      this.set("componentOptions", options.componentOptions);
    }
    if (options.preferedPosition == null) {
      options.preferedPosition = Constants.Position.Top;
    }
    let positionStyle = "";
    let arrowStyle = "";

    switch (options.preferedPosition) {
      case Constants.Position.Top:
        positionStyle = `left: ${options.rect.left - tooltipWidth / 2}px; top: ${options.rect.top - Constants.TooltipOffset - tooltipHeight / 2}px;`;
        arrowStyle = "left: 50%; bottom: -10px;";
        break;
      case Constants.Position.Bottom:
        positionStyle = `left: ${options.rect.left  - tooltipWidth / 2}px; top: ${options.rect.bottom + Constants.TooltipOffset}px;`;
        arrowStyle = "left: 50%; top: 0px;";
        break;
      case Constants.Position.Left:
        positionStyle = `left: ${options.rect.left - tooltipWidth - Constants.TooltipOffset}px; top: ${options.rect.bottom - options.rect.height / 2 - tooltipHeight / 2}px;`;
        arrowStyle = "right: -10px; top: 50%;";
        break;
      case Constants.Position.Right:
        positionStyle =  `left: ${options.rect.right + Constants.TooltipOffset}px; top: ${options.rect.bottom - options.rect.height / 2 - tooltipHeight / 2}px;`;
        arrowStyle = "left: 0; top: 50%;";
        break;
    }

    this.set("style", htmlSafe(positionStyle));
    this.set("arrowStyle", htmlSafe(arrowStyle));
    this.element.classList.remove(Constants.hideClass);
  },
  
  hide: function() {
    this.element.classList.add(Constants.hideClass);
  }
});
