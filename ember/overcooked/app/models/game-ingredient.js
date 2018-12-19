import DS from "ember-data";
import Item from "./item";

export default Item.extend({
  componentName: "game-ingredient",
  state: DS.attr("number", { defaultValue: 0 }),
  progress: DS.attr("number", { defaultValue: 0 }),
  type: DS.attr("number")
});
