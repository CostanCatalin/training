/* eslint-disable complexity */
import Route from "@ember/routing/route";
import Constants from "overcooked-pods/constants";
import Block from "overcooked-pods/components/game-block/model";
import GameWrapper from "overcooked-pods/components/game-wrapper/model";
import Player from "overcooked-pods/components/game-player/model";
import Plate from "overcooked-pods/components/plate-item/model";
import CookingContainerItem from "overcooked-pods/components/cooking-container-item/model";
import Order from "overcooked-pods/components/game-order/model";
import { set } from "@ember/object";
import { inject as service } from "@ember/service";

export default Route.extend({
  blocks: service("game-blocks"),
  
  model() {
    let blockId = -1;
    let playerRecord = Player.create({
      name: "Catalin",
      x: 2,
      y: 2
    });

    let plate1 = Plate.create({
          type: Constants.ItemTypeEnum.Plate
        }),
        plate2 = Plate.create({
          type: Constants.ItemTypeEnum.Plate
        }),
        pan = CookingContainerItem.create({
          type: Constants.ItemTypeEnum.BoilingPan
        });

    let myModel = GameWrapper.create({
      id: "game-model",
      title: "Level 1",
      width: 13,
      height: 9,
      player: playerRecord,
      gameData: {
        score: 0,
        ordersCompleted: 0,
        gameIsOver: false,
        time: null
      },
      blocks: this.blocks.get(),
      orders: [
        Order.create({
          recipeId: 1,
          duration: 100,
          startingAt: 0
        }),
        Order.create({
          recipeId: 2,
          duration: 100,
          startingAt: 30
        }),
        Order.create({
          recipeId: 3,
          duration: 100,
          startingAt: 50
        })
      ]
    });

    set(myModel.blocks[2], "item", plate1);
    set(myModel.blocks[3], "item", plate2);
    set(myModel.blocks[4], "item", pan);

    set(plate1, "parent", myModel.blocks[2]);
    set(plate2, "parent", myModel.blocks[3]);
    set(pan, "parent", myModel.blocks[4]);

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

    return myModel;
  }
});
