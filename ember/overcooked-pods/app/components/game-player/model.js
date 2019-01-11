import EmberObject from "@ember/object";
import Constants from "overcooked-pods/constants";

let myReq = null;

export default EmberObject.extend({
  componentName: "game-player",
  name: null,
  item: undefined,
  moving: false,
  x: 0,
  y: 0,

  //getItem

  //setItem

  move(x, y, action, params) {
    let oldX = this.get("x") || 2;
    let oldY = this.get("y") || 2;
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

    myReq = window.requestAnimationFrame(function callback(timestamp) {
      if (!start) { 
        start = timestamp;
      }
      var progress = timestamp - start;

      if (progress >= timeNeeded) {
        this.set("moving", false);
        
        this.set("x", x);
        this.set("y", y);
        if (action != undefined) {
          action(params);
        }
        return;
      } else {
        let percent = progress / timeNeeded;

        let deltaX = percent * (newX - oldX);
        let deltaY = percent * (newY - oldY);

        this.set("x", oldX + deltaX);
        this.set("y", oldY + deltaY);

        myReq = window.requestAnimationFrame(callback.bind(this));
      }
    }.bind(this));
  }
});
