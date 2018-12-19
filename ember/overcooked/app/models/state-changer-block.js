import DS from "ember-data";
import BuildingBlock from "./building-block";

export default BuildingBlock.extend({
  componentName: "state-changer-block",
  time: DS.attr("number"),
  target: DS.belongsTo("item")
});