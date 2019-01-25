import { Promise } from "rsvp";
import $ from "jquery";
import Constants from "overcooked-pods/constants";
import Block from "overcooked-pods/components/game-block/model";
import ActionBlock from "overcooked-pods/components/action-block/model";
import StoveBlock from "overcooked-pods/components/stove-block/model";
import IngredientBlock from "overcooked-pods/components/ingredient-block/model";
import CounterBlock from "overcooked-pods/components/counter-block/model";

const apiUrlPrefix = Constants.URI.Root;
const recipesUrl = `${apiUrlPrefix}/${Constants.URI.JSON.Recipes}`;
const blocksUrl = `${apiUrlPrefix}/${Constants.URI.JSON.Blocks}`;

var loadData = function(dataUrl) {
  return new Promise((resolve, reject) => {
    var hash = {
      url: dataUrl,
      type: "GET",
      dataType: "json",
      success: resolve,
      error: reject
    };
    $.ajax(hash).fail(xhr => {
      reject(xhr);
    });
  });
};

var blocksFrom = function (data) {
  let res = [];

  for (let i = 0; i < data.length; i++) {
    let ObjectType = null;

    switch (data[i].type) {
      case Constants.BlockTypeEnum.Table:
        ObjectType = Block;
        break;
      
        case Constants.BlockTypeEnum.Ingredient:
        ObjectType = IngredientBlock;
        break;

        case Constants.BlockTypeEnum.Stove:
        ObjectType = StoveBlock;
        break;

        case Constants.BlockTypeEnum.CounterTwo:
        ObjectType = CounterBlock;
        break;

        default:
          ObjectType = ActionBlock;
    }
    res.push(ObjectType.create(data[i]));
  }
  return res;
};

export function initialize(application) {
  application.deferReadiness();

  Promise.all([
    loadData(recipesUrl),
    loadData(blocksUrl)
  ]).then(function(responses) {
    application.set("initialRecipes", responses[0]);
    application.set("initialBlocks", blocksFrom(responses[1]));
    application.advanceReadiness();
  });
}

export default {
  name: "templates",
  initialize
};
