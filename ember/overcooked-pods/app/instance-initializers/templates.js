export function initialize(appInstance) {
  appInstance.inject("route", "recipes", "service:game-recipes");
  let recipes = appInstance.get("application.initialRecipes");
  let recipeService = appInstance.lookup("service:game-recipes");
  recipeService.initialize(recipes);

  let blocks = appInstance.get("application.initialBlocks");
  let blocksService = appInstance.lookup("service:game-blocks");
  blocksService.initialize(blocks);
}

export default {
  name: "templates",
  initialize
};
