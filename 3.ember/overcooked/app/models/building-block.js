import DS from "ember-data";

export default DS.Model.extend({
  componentName: "building-block",
  name: DS.attr("string"),
  image: DS.attr("string"),
  x: DS.attr("number"),
  y: DS.attr("number"),
  game: DS.belongsTo("game")
});
