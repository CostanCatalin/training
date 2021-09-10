export default {
  BlockTypeEnum: {
    Table: "",
    Ingredient: "box.png",
    CuttingBoard: "cutting-board-with-knife.png",
    FryingPan: "stove.png",
    Stove: "stove.png",
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
      image: ["spinach.svg", "spinach-sliced.svg"]
    },
    Cheese: {
      id: 3,
      image: ["cheese.png", "cheese-sliced.png"]
    },
    Egg: {
      id: 4,
      image: ["egg.png", null, "fried-egg.png"]
    },
    Bacon: {
      id: 5,
      image: ["bacon.png", "bacon-sliced.png", "bacon-sliced.png"]
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
    },
    Pan: {
      id: 1,
      image: "pan.png"
    },
    BoilingPan: {
      id: 2,
      image: "boiling-pan.png"
    },
    FryingPan: {
      id: 3,
      image: "pan.png"
    }
  },
  Colours : {
    yellow: "#ffc425",
    ember: "#f37735",
    danger: "#d11141"
  },
  URI:{
    Root: "http://localhost:4200",
    ImagesRootPath: "/assets/images/",
    JSON: {
      Blocks: "config/blocks.json",
      Recipes: "config/recipes.json",
      Player: "config/player.json"
    }
  },
  Position: {
    Top: "top",
    Bottom: "bottom",
    Left: "left",
    Right: "right"
  },
  BoxSize: 75,
  ItemSize: 45,
  MaxIngredients: 4,
  TooltipOffset: 40,
  hideClass: "hidden",
  IngredientStateChangeTime: 3000, // ms
  PlayerSpeed: 2000, // px per sec
  SecondsBetweenOrders: 15 // sec
};