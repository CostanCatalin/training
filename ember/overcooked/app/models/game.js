import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr("string"),
  score: DS.attr("number"),
  width: DS.attr("number"),
  height: DS.attr("number"),
  
  player: DS.belongsTo("player"),
  blocks: DS.hasMany("building-block"),
  items: DS.hasMany("items")
});
