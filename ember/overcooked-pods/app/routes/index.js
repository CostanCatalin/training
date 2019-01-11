/* eslint-disable complexity */
import Route from "@ember/routing/route";
import Constants from "overcooked-pods/constants";
import Block from "overcooked-pods/components/game-block/model";
import ActionBlock from "overcooked-pods/components/action-block/model";
import StoveBlock from "overcooked-pods/components/stove-block/model";
import GameWrapper from "overcooked-pods/components/game-wrapper/model";
import Player from "overcooked-pods/components/game-player/model";
import Plate from "overcooked-pods/components/plate-item/model";
import CookingContainerItem from "overcooked-pods/components/cooking-container-item/model";
import IngredientBlock from "overcooked-pods/components/ingredient-block/model";
import Order from "overcooked-pods/components/game-order/model";
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
        StoveBlock.create({
          id: ++blockId,
          x: 8,
          y: 0,
          type: Constants.BlockTypeEnum.Stove
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
      recipes: [
        {
          id: 0,
          name: "Random ingredients",
          image: "soup.svg"
        },
        {
          id: 1,
          name: "Tomato soup",
          image: "soup.svg",
          ingredients: [
            {
              type: Constants.IngredientEnum.Tomato,
              state: Constants.IngredientStateEnum.Cut
            },
            {
              type: Constants.IngredientEnum.Tomato,
              state: Constants.IngredientStateEnum.Cut
            },
            {
              type: Constants.IngredientEnum.Tomato,
              state: Constants.IngredientStateEnum.Cut
            }
          ]
        },
        {
          id: 2,
          name: "Salad",
          image: "salad (2).svg",
          ingredients: [
            {
              type: Constants.IngredientEnum.Tomato,
              state: Constants.IngredientStateEnum.Cut
            },
            {
              type: Constants.IngredientEnum.Spinach,
              state: Constants.IngredientStateEnum.Cut
            },
            {
              type: Constants.IngredientEnum.Cheese,
              state: Constants.IngredientStateEnum.Cut
            }
          ]
        },
        {
          id: 3,
          name: "Bacon omlette",
          image: "bacon-omlette.png",
          ingredients: [
            {
              type: Constants.IngredientEnum.Egg,
              state: Constants.IngredientStateEnum.Fried
            },
            {
              type: Constants.IngredientEnum.Bacon,
              state: Constants.IngredientStateEnum.Fried
            }
          ]
        }
      ],
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
