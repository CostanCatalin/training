import EmberObject from "@ember/object";

export default EmberObject.extend({
  componentName: "game-block",
  id: undefined,
  type: undefined,
  name: null,
  image: null,
  item: null,
  x: 0,
  y: 0
});
