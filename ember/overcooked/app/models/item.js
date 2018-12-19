import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr("string"),
  x: DS.attr("number"),
  y: DS.attr("number")
  // game: DS.belongsTo("game")
});
