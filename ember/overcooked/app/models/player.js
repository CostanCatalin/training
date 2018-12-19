import DS from "ember-data";

export default DS.Model.extend({
  x: DS.attr("number"),
  y: DS.attr("number"),
  name: DS.attr("string"),
  item: DS.belongsTo("item"),
  game: DS.belongsTo("game")
});
