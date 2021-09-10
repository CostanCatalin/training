import Component from "@ember/component";
import { observer } from "@ember/object";
import Constants from "overcooked/constants";

let myReq = null;

export default Component.extend({
  positionChanged: observer("x", "y", function() {
    let oldX =  parseInt(this.get("_oldX"), 10) || 2;
    let oldY =  parseInt(this.get("_oldY"), 10) || 2;
    let newX = parseInt(this.get("x"), 10);
    let newY = parseInt(this.get("y"), 10);

    if (oldX == newX && oldY == newY) {
      return;
    }

    let distance = Math.sqrt(Math.pow(oldX - newX, 2) + Math.pow(oldY - newY ,2));
    let timeNeeded = distance * Constants.BoxSize / Constants.PlayerSpeed * 1000;
    let start = null;

    if (myReq != null) {
      cancelAnimationFrame(myReq);
    }

    myReq = window.requestAnimationFrame(function callback(timestamp) {
      if (!start) { 
        start = timestamp;
      }
      var progress = timestamp - start;

      if (progress >= timeNeeded) {
        this.element.firstChild.style.left = newX * Constants.BoxSize  + "px";
        this.element.firstChild.style.top = newY * Constants.BoxSize  + "px";
        return;
      } else {
        let percent = progress / timeNeeded;

        let deltaX = percent * (newX - oldX);
        let deltaY = percent * (newY - oldY);

        this.element.firstChild.style.left = (oldX + deltaX) * Constants.BoxSize  + "px";
        this.element.firstChild.style.top = (oldY + deltaY) * Constants.BoxSize  + "px";

        myReq = window.requestAnimationFrame(callback.bind(this));
      }
    }.bind(this));

    this.set("_oldX", this.get("x"));
    this.set("_oldY", this.get("y"));
  })
});
