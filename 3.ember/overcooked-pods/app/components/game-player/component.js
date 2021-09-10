import Component from "@ember/component";
import { observer } from "@ember/object";
import Constants from "overcooked-pods/constants";
import { htmlSafe } from "@ember/string";
import { inject as service } from "@ember/service";

let myReq = null;

export default Component.extend({
  playerService: service("game-player"),//comes in
  model: null, //comes in
  style: null,

  init(...args) {
    this._super(args);
    this.playerService.setReference(this);
  },

  positionChanged: observer("model.x", "model.y", function() {
    this.set("style", 
      htmlSafe(`left: ${this.get("model.x") * Constants.BoxSize}px; top: ${this.get("model.y") * Constants.BoxSize}px;`)
    );
  }),

  move(x, y, action, params) {
    let oldX = this.get("model.x") || 2;
    let oldY = this.get("model.y") || 2;
    let newX = x;
    let newY = y;

    if (oldX == newX && oldY == newY) {
      return;
    }

    let distance = Math.sqrt(Math.pow(oldX - newX, 2) + Math.pow(oldY - newY ,2));
    let timeNeeded = distance * Constants.BoxSize / Constants.PlayerSpeed * 1000;
    let start = null;
    this.set("moving", true);

    if (myReq != null) {
      cancelAnimationFrame(myReq);
    }
    
  // de ce e animatia in model?
    myReq = window.requestAnimationFrame(function callback(timestamp) {
      if (!start) { 
        start = timestamp;
      }
      var progress = timestamp - start;

      if (progress >= timeNeeded) {
        this.set("moving", false);
        
        this.set("model.x", x);
        this.set("model.y", y);
        if (action != undefined) {
          action(params);
        }
        return;
      } else {
        let percent = progress / timeNeeded;

        let deltaX = percent * (newX - oldX);
        let deltaY = percent * (newY - oldY);

        this.set("model.x", oldX + deltaX);
        this.set("model.y", oldY + deltaY);

        myReq = window.requestAnimationFrame(callback.bind(this));
      }
    }.bind(this));
  }
});
