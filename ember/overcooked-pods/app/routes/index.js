/* eslint-disable complexity */
import Route from "@ember/routing/route";
import Constants from "overcooked-pods/constants";
import Block from "overcooked-pods/game-block/model";
import ActionBlock from "overcooked-pods/action-block/model";
import GameWrapper from "overcooked-pods/game-wrapper/model";
import Player from "overcooked-pods/game-player/model";
import Plate from "overcooked-pods/plate-item/model";
import Ingredient from "overcooked-pods/ingredient-item/model";
import IngredientBlock from "overcooked-pods/ingredient-block/model";
import { set } from "@ember/object";

export default Route.extend({
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
        ingredient1 = Ingredient.create({
          type: Constants.IngredientEnum.Tomato
        });

    let myModel = GameWrapper.create({
      id: "game-model",
      title: "Level 1",
      score: 0,
      width: 13,
      height: 9,
      player: playerRecord,
      blocks: [
        Block.create({
          id: ++blockId,
          x: 2,
          y: 0,
          type: Constants.BlockTypeEnum.Table
        }),
        IngredientBlock.create({
          id: ++blockId,
          x: 3,
          y: 0,
          type: Constants.BlockTypeEnum.Ingredient
        }),
        Block.create({
          id: ++blockId,
          x: 4,
          y: 0,
          type: Constants.BlockTypeEnum.Table
        }),
        Block.create({
          id: ++blockId,
          x: 5,
          y: 0,
          type: Constants.BlockTypeEnum.Table
        }),
        ActionBlock.create({
          id: ++blockId,
          x: 8,
          y: 0,
          type: Constants.BlockTypeEnum.BoilingPan
        }),
        ActionBlock.create({
          id: ++blockId,
          type: Constants.BlockTypeEnum.CounterOne,
          x: 0,
          y: 5
        }),
        ActionBlock.create({
          id: ++blockId,
          x: 0,
          y: 6,
          type: Constants.BlockTypeEnum.CounterTwo
        }),
        ActionBlock.create({
          id: ++blockId,
          x: 3,
          y: 8,
          type: Constants.BlockTypeEnum.CuttingBoard,
          transformsToState: Constants.IngredientStateEnum.Cut
        }),
        ActionBlock.create({
          id: ++blockId,
          x: 5,
          y: 8,
          type: Constants.BlockTypeEnum.CuttingBoard,
          transformsToState: Constants.IngredientStateEnum.Cut
        }),
        ActionBlock.create({
          id: ++blockId,
          x: 12,
          y: 3,
          type: Constants.BlockTypeEnum.SinkOne
        }),
        ActionBlock.create({
          id: ++blockId,
          x: 12,
          y: 4,
          type: Constants.BlockTypeEnum.SinkTwo
        })
      ],
      items: [
        plate1,
        plate2,
        ingredient1
      ]
    });

    set(myModel.blocks[0], "item", ingredient1);
    set(myModel.blocks[2], "item", plate1);
    set(myModel.blocks[3], "item", plate2);

    set(ingredient1, "parent", myModel.blocks[0]);
    set(plate1, "parent", myModel.blocks[2]);
    set(plate2, "parent", myModel.blocks[3]);

    set(ingredient1, "id", myModel.getNextItemId());
    set(plate1, "id", myModel.getNextItemId());
    set(plate2, "id", myModel.getNextItemId());

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
