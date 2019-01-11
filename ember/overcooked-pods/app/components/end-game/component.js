import Component from "@ember/component";
import { observer } from "@ember/object";

export default Component.extend({
  model: null, //comes in
  
  endGame: observer("gameIsOver", function() {
    if (!this.gameIsOver) {
      return;
    }
    this.set("model.formattedTime", this.formatTime(this.get("model.time")));
    this.element.querySelector(".end-game").classList.remove("hidden");
  }),

  formatTime() {
    let seconds = this.get("model.time") % 60,
        minutes = Math.floor((this.get("model.time") % 3600 - this.get("model.time") % 60) / 60),
        hours = Math.floor(this.get("model.time") / 3600);

    seconds = seconds > 9 ? seconds : "0" + seconds;
    minutes = minutes > 9 ? minutes : "0" + minutes;
    hours = hours > 9 ? hours : "0" + hours;
    return `${hours}:${minutes}:${seconds}`;
  }
});
