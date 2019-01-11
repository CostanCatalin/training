import Component from "@ember/component";
import Constants from "overcooked-pods/constants";
import Utils from "overcooked-pods/utils";
import { set } from "@ember/object";
import { alias } from "@ember/object/computed";

export default Component.extend({
  currentTime: 0,
  gameInitialized: false,
  intervalRef: null,
  model: null, //comes in
  player: alias("model.player"),
  
  didRender() {
    if (this.gameInitialized) {
      return;
    }
    this.manageOrders();
    
    this.intervalRef = setInterval(function incrementTime() {
      this.currentTime++;
      this.manageOrders();
      this.manageActiveOrders();
    }.bind(this), 1000);
    
    this.gameInitialized = true;
  },

  click(e) {
    if (!e.target.classList.contains("wrapper")) {
      return;
    }
    let rect = this.element.firstChild.getBoundingClientRect();
    let x = Math.round((e.pageX - rect.left) / Constants.BoxSize);
    let y = Math.round((e.pageY - rect.top) / Constants.BoxSize);
    this.movePlayer(x, y);
  },

  movePlayer(x, y, action, params) {
    let newX = x < 1 ? 1 : x;
    let newY = y < 1 ? 1 : y;

    newX = newX < this.get("model.width") - 1 ? newX : this.get("model.width") - 2;
    newY = newY < this.get("model.height") - 1 ? newY : this.get("model.height") - 2;

    this.get("player").move(newX, newY, action, params);
  },

  manageOrders() {
    for (let i = 0; i < this.get("model.orders.length"); i++) {
      if (this.model.orders[i] && this.currentTime >= this.model.orders[i].startingAt) {
        if (!this.model.activeOrders) {
          this.set("model.activeOrders", []);
        }
        this.model.activeOrders.pushObject(this.model.orders[i]);
        this.model.orders[i] = null;
        i--;
      }
    }
  },

  manageActiveOrders() {
    for (let i = 0; i < this.get("model.activeOrders.length"); i++) {
      let percent = (this.currentTime - this.model.activeOrders[i].startingAt) / this.model.activeOrders[i].duration;
      set(this.get("model.activeOrders").objectAt(i), "progress", percent);
      
      if (this.currentTime >= this.model.activeOrders[i].startingAt + this.model.activeOrders[i].duration) {
        this.gameOver();
      }
    }
  },

  handleItem(item) {
    //pick up
    if (this.get("player.item") == undefined) {
      this.set("player.item", item);

      if (this.get("player.item.parent") != undefined) {
        this.set("player.item.parent.item", undefined);
      }

      this.set("player.item.parent", this.get("model.player"));
    // drop ingredient onto plate
    } else if (item.get("componentName") != "ingredient-item" 
      && this.get("player.item.componentName") == "ingredient-item") {
      let success = item.addIngredient(this.get("model.player.item"));

      if (success) {
        this.set("player.item.parent", item);
        this.set("player.item", undefined);
      }
    }
  },

  handleBlock(block) {
    if (this.get("player.item") != undefined && block.get("item") == undefined) {
      block.set("item", this.get("player.item"));
      this.set("player.item.parent", block);
      this.set("player.item", undefined);
    }
  },

  gameOver() {
    clearInterval(this.intervalRef);
    this.intervalRef = null;
    // this.set("model.gameData.time", this.currentTime);
    // this.set("model.gameIsOver", true);
  },

  containsIngredient(array, ingredient) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].type.id == ingredient.type.id && array[i].state == ingredient.state) {
        return true;
      }
    }

    return false;
  },

  actions: {
    blockClick(block) {
      let dist = Utils.distance(this.get("player"), block);

      if (dist > 1) {
        this.movePlayer(block.x, block.y, this.handleBlock.bind(this), block);
      } else {
        this.handleBlock(block);
      }
      
      return false;
    },

    itemClick(item) {
      let dist = Utils.distance(this.get("player"), item.get("parent"));

      if (dist > 1) {
        this.movePlayer(item.get("parent.x"), item.get("parent.y"), this.handleItem.bind(this), item);
      } else {
        this.handleItem(item);
      }

      return false;
    },

    ingredientsToRecipe(plate) {
      let recipe = this.get("model.recipes").objectAt(0);
      for (let i = 1; i < this.get("model.recipes").length; i++) {
        if (this.get("model.recipes").objectAt(i).ingredients.length != plate.ingredients.length) {
          continue;
        }

        let matches = true;
        let length = plate.ingredients.length;
        for (let j = 0; j < length; j++) {
          if (!this.containsIngredient(this.get("model.recipes").objectAt(i).ingredients, plate.ingredients[j])) {
            matches = false;
          }
        }

        if (matches) {
          return this.get("model.recipes").objectAt(i);
        }
      }

      return recipe;
    },

    submitOrder(plate) {
      debugger;
    }
  }
});
