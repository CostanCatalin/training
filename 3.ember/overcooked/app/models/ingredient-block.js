import DS from "ember-data";
import BuildingBlock from "./building-block";

export default BuildingBlock.extend({
  componentName: "ingredient-block",
  ingredient: DS.belongsTo("game-ingredient")
});
