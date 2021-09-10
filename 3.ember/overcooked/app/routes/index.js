/* eslint-disable complexity */
import Route from "@ember/routing/route";
import Constants from "overcooked/constants";

export default Route.extend({
  model() {
    let playerRecord = this.store.createRecord("player", {
      name: "Catalin",
      x: 2,
      y: 2
    });

    let myModel = this.store.createRecord("game", {
      id: "game-model",
      title: "Level 1",
      score: 0,
      width: 13,
      height: 9,
      player: playerRecord,
      blocks: [
        this.store.createRecord("ingredient-block", {
          x: 3,
          y: 0,
          type: Constants.BlockTypeEnum.Ingredient,
          ingredient: this.store.createRecord("game-ingredient", { name: "tomato" })
        }),
        this.store.createRecord("state-changer-block", {
          x: 8,
          y: 0,
          type: Constants.BlockTypeEnum.BoilingPan
        }),
        this.store.createRecord("building-block", {
          x: 0,
          y: 5,
          type: Constants.BlockTypeEnum.Counter
        }),
        this.store.createRecord("building-block", {
          x: 0,
          y: 6,
          type: Constants.BlockTypeEnum.CounterTwo
        }),
        this.store.createRecord("building-block", {
          x: 0,
          y: 7,
          type: Constants.BlockTypeEnum.CounterThree
        }),
        this.store.createRecord("building-block", {
          x: 3,
          y: 8,
          type: Constants.BlockTypeEnum.CuttingBoard
        }),
        this.store.createRecord("building-block", {
          x: 5,
          y: 8,
          type: Constants.BlockTypeEnum.CuttingBoard
        }),
        this.store.createRecord("building-block", {
          x: 12,
          y: 3,
          type: Constants.BlockTypeEnum.SinkOne
        }),
        this.store.createRecord("building-block", {
          x: 12,
          y: 4,
          type: Constants.BlockTypeEnum.SinkTwo
        })
      ],
      items: [
        this.store.createRecord("game-ingredient", {
          x: 3,
          y: 0,
          type: Constants.IngredientEnum.Tomato
        })
      ]
    });

    // tables on the edges if they're not occupied
    for (let i = 0; i < myModel.width; i++) {
      if (myModel.blocks.filter(blk => {return blk.x == i && blk.y == 0;}).length == 0) {
        myModel.blocks.pushObject(
          this.store.createRecord("building-block", {
            x: i,
            y: 0,
            type: Constants.BlockTypeEnum.Table
          })
        );
      }
      if (myModel.blocks.filter(blk => {return blk.x == i && blk.y == myModel.height - 1;}).length == 0) {
        myModel.blocks.pushObject(
          this.store.createRecord("building-block", {
            x: i,
            y: myModel.height - 1,
            type: Constants.BlockTypeEnum.Table
          })
        );
      }
    }

    for (let i = 1; i < myModel.height; i++) {
      if (myModel.blocks.filter(blk => {return blk.x == 0 && blk.y == i;}).length == 0) {
        myModel.blocks.pushObject(
          this.store.createRecord("building-block", {
            x: 0,
            y: i,
            type: Constants.BlockTypeEnum.Table
          })
        );
      }

      if (myModel.blocks.filter(blk => {return blk.x ==  myModel.width - 1 && blk.y == i;}).length == 0) {
        myModel.blocks.pushObject(
          this.store.createRecord("building-block", {
            x: myModel.width - 1,
            y: i,
            type: Constants.BlockTypeEnum.Table
          })
        );
      }
    }

    return myModel;
  }
});
