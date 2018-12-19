export default {
  BlockTypeEnum: {
    Table: "",
    Ingredient: "box-tomato.png",
    CuttingBoard: "cutting-board-with-knife.png",
    FryingPan: "stove.png",
    BoilingPan: "stove.png",
    SinkOne: "sink-1.png",
    SinkTwo: "sink-2.png", 
    CounterOne: "counter-1.png", 
    CounterTwo: "counter-3.png"
  },
  IngredientEnum: {
    Tomato: {
      id: 1,
      image: ["tomato.svg", "tomato-sliced.svg"]
    },
    Spinach: {
      id: 2,
      image: "placeholder.png"
    },
    Cheese: {
      id: 3,
      image: "placeholder.png"
    },
    Egg: {
      id: 4,
      image: "placeholder.png"
    },
    Bacon: {
      id: 5,
      image: "placeholder.png"
    }
  },
  IngredientStateEnum: {
    Whole: 0,
    Cut: 1,
    Fried: 2,
    Boiled: 3
  },
  ItemTypeEnum: {
    Plate: {
      id: 0,
      image: "plate.svg"
    }
  },
  BoxSize: 75,
  ItemSize: 45,
  MaxIngredients: 4,
  ImagesRootPath: "/assets/images/",
  hideClass: "hidden",
  IngredientStateChangeTime: 3000, // ms
  PlayerSpeed: 2000 // px per sec
};