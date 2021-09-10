import Service from "@ember/service";

let blocks = null;

export default Service.extend({
  initialize(data) {
    if (blocks == null) {
      blocks = data;
    }
  },

  get() {
    return blocks;
  }
});
