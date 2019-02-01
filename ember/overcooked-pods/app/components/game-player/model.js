import EmberObject from "@ember/object";

export default EmberObject.extend({
  componentName: "game-player",
  name: null,
  item: undefined,
  moving: false,
  x: 0,
  y: 0
});
