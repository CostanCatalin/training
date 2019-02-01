/* eslint-disable complexity */
import Route from "@ember/routing/route";
import Constants from "overcooked-pods/constants";
import Block from "overcooked-pods/components/game-block/model";
import GameWrapper from "overcooked-pods/components/game-wrapper/model";
import Plate from "overcooked-pods/components/plate-item/model";
import CookingContainerItem from "overcooked-pods/components/cooking-container-item/model";
import Order from "overcooked-pods/components/game-order/model";
import { set } from "@ember/object";
import { inject as service } from "@ember/service";

export default Route.extend({
  blocks: service("game-blocks"),
  
  model() {
    let blockId = -1;

    let plate1 = Plate.create({
          type: Constants.ItemTypeEnum.Plate
        }),
        plate2 = Plate.create({
          type: Constants.ItemTypeEnum.Plate
        }),
        pan1 = CookingContainerItem.create({
          type: Constants.ItemTypeEnum.BoilingPan,
          transformsToState: Constants.IngredientStateEnum.Boiled
        }),
        pan2 = CookingContainerItem.create({
          type: Constants.ItemTypeEnum.FryingPan,
          transformsToState: Constants.IngredientStateEnum.Fried
        });

    let myModel = GameWrapper.create({
      id: "game-model",
      title: "Level 1",
      width: 13,
      height: 9,
      gameData: {
        score: 0,
        ordersCompleted: 0,
        gameIsOver: false,
        time: null,
        timeLimit: 400
      },
      blocks: this.blocks.get(),
      orders: [
        Order.create({
          recipeId: 1,
          startingAt: 0
        }),
        Order.create({
          recipeId: 2,
          startingAt: 30
        }),
        Order.create({
          recipeId: 3,
          startingAt: 50
        })
      ]
    });

    // tables on the edges if they're not occupied
    for (let i = 0; i < myModel.width; i++) {
      if (myModel.blocks.filter(blk => {return blk.x == i && blk.y == 0;}).length == 0) {
        myModel.blocks.pushObject(
          Block.create({
            id: ++blockId,
            x: i,
            y: 0,
            type: Constants.BlockTypeEnum.Table
          })
        );
      }
      if (myModel.blocks.filter(blk => {return blk.x == i && blk.y == myModel.height - 1;}).length == 0) {
        myModel.blocks.pushObject(
          Block.create({
            id: ++blockId,
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
          Block.create({
            id: ++blockId,
            x: 0,
            y: i,
            type: Constants.BlockTypeEnum.Table
          })
        );
      }

      if (myModel.blocks.filter(blk => {return blk.x ==  myModel.width - 1 && blk.y == i;}).length == 0) {
        myModel.blocks.pushObject(
          Block.create({
            id: ++blockId,
            x: myModel.width - 1,
            y: i,
            type: Constants.BlockTypeEnum.Table
          })
        );
      }
    }
    ///?????
    set(myModel.blocks[20], "item", plate1);
    set(myModel.blocks[21], "item", plate2);
    set(myModel.blocks[5], "item", pan1);
    set(myModel.blocks[6], "item", pan2);

    set(plate1, "parent", myModel.blocks[20]);
    set(plate2, "parent", myModel.blocks[21]);
    set(pan1, "parent", myModel.blocks[5]);
    set(pan2, "parent", myModel.blocks[6]);

    return myModel;
  }
});
