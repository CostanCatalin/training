/* eslint-disable complexity */
import Component from "@ember/component";
import Constants from "overcooked-pods/constants";
import Utils from "overcooked-pods/utils";
import Order from "overcooked-pods/components/game-order/model";
import { set, get } from "@ember/object";
import { alias } from "@ember/object/computed";
import { inject as service } from "@ember/service";


export default Component.extend({
  currentTime: 0,
  gameInitialized: false,
  intervalRef: null,
  model: null, //comes in
  player: alias("model.player"),
  gameData: alias("model.gameData"),
  recipesService: service("game-recipes"),
  
  didRender() {
    if (this.gameInitialized) {
      return;
    }
    this.manageOrders();
    
    this.intervalRef = setInterval(function incrementTime() {
      this.currentTime++;
      this.manageOrders();
      this.manageActiveOrders();
      if (this.currentTime > this.gameData.timeLimit) {
        this.gameOver();
      }

      if (this.currentTime % Constants.SecondsBetweenOrders == 0) {
        this.addOrder();
      }
    }.bind(this), 1000);
    
    this.gameInitialized = true;
  },

  click(e) {
    if (!e.target.classList.contains("wrapper")) {
      return;
    }
    let rect = this.element.firstChild.getBoundingClientRect();
    let x = Math.floor((e.pageX - rect.left) / Constants.BoxSize);
    let y = Math.floor((e.pageY - rect.top) / Constants.BoxSize);
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
      let recipe = this.recipesService.getById(this.model.activeOrders[i].recipeId);

      let percent = (this.currentTime - this.model.activeOrders[i].startingAt) / recipe.time;
      set(this.get("model.activeOrders").objectAt(i), "progress", percent);

      
      if (this.currentTime >= this.model.activeOrders[i].startingAt + recipe.time) {
        set(this.gameData, "score", this.gameData.score - recipe.maxScore / 10);
        this.get("model.activeOrders").removeAt(i);
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
    } else if (item.get("componentName") != "ingredient-item" && item.get("result") == null) {
      // drop ingredient onto plate
      if (this.get("player.item.componentName") == "ingredient-item") {
        let success = item.addIngredient(this.get("model.player.item"));

        if (success) {
          this.set("player.item.parent", item);
          this.set("player.item", undefined);
        }
      
      //if recipe, replace ingredients with recipe
      if (item.get("componentName") == "plate-item") {
        let possibleRecipe = this.recipesService.ingredientsToRecipe(item);
        if (possibleRecipe && possibleRecipe.id > 0) {
          item.setResult(possibleRecipe);
        }
      }

      // place recipe in plate
      } else if (item.get("componentName") == "plate-item" 
        && this.get("player.item.componentName") == "cooking-container-item" 
        && this.get("player.item.result") != null
        && item.get("ingredients") == null) {
          item.setResult(this.get("player.item.result"));
          this.set("player.item.result", null);
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
    this.set("model.gameData.time", this.currentTime);
    this.set("model.gameIsOver", true);
  },

  addOrder() {
    let orderId = Math.round(Math.random() * (this.recipesService.getAll().length - 1));
    let newOrder = Order.create({
      recipeId: orderId,
      startingAt: 51 + this.currentTime
    });

    this.get("model.orders").pushObject(newOrder);
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

    playerHasItem() {
      return this.get("player.item") != undefined;
    },  

    submitOrder(plate) {
      if (!plate.result) {
        return;
      }
      
      for (let i = 0; i < this.get("model.activeOrders").length; i++) {
        if (this.get("model.activeOrders").objectAt(i).recipeId == plate.result.id) {
          let completedOrder = this.get("model.activeOrders").objectAt(i);
          set(this.gameData, "ordersCompleted", get(this.gameData, "ordersCompleted") + 1);
          set(this.gameData, "score", get(this.gameData, "score") + (1 - completedOrder.progress) * this.recipesService.getAll()[completedOrder.recipeId].maxScore);

          // clean plate || TODO: dirty plate
          this.get("model.activeOrders").removeAt(i);
          i--;
          set(plate, "result", null);
          set(plate, "ingredients", null);
          return;
        }
      }
    }
  }
});
