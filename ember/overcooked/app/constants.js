export default {
  BlockTypeEnum: {
    Table: 1,
    Ingredient: 2,
    
    CuttingBoard: {
      id: 3,
      image: "cutting-board-with-knife.png"
    },
    FryingPan: 4,
    BoilingPan: 5,

    SinkOne: 7,
    SinkTwo: 8,

    CounterOne: 9,
    CounterTwo: 10,
    CounterThree: 11
  },
  IngredientEnum: {
    Tomato: {
      id: 1,
      image: "tomato.svg"
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
  BoxSize: 75,
  ItemSize: 45,
  ImagesRootPath: "/assets/images/",
  PlayerSpeed: 2000 // px per sec
};