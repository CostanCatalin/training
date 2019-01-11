import EmberObject from "@ember/object";

export default EmberObject.extend({
  title: null,
  score: null,
  width: 0,
  height: 0,
  
  player: null,
  blocks: null,
  items: null,
  orders: null,
  activeOrders: null,
  
  getItemById(id) {
    return this.items.find(function(elem) {
      return elem.get("id") === id;
    });
  },

  getBlockById(id) {
    return this.blocks.find(function(elem) {
      return elem.get("id") === id;
    });
  },

  getNextBlockId() {
    return Math.max.apply(Math, this.blocks.map(function(o) { return o.id; })) + 1;
  },
  
  getNextItemId() {
    return Math.max.apply(Math, this.items.map(function(o) { return o.id; })) + 1;
  }
});
