import Service from "@ember/service";
import { set } from "@ember/object";
import Player from "overcooked-pods/components/game-player/model";

let player = null;

export default Service.extend({
  initialize(data) {
    if (player == null) {
      player = Player.create(data);
    }
  },

  setReference(ref) {
    set(player, "instance", ref);
  },

  get() {
    return player;
  },

  move(x, y, action, params) {
    if (player.instance) {
      player.instance.move(x, y, action, params);
    }
  }
});
