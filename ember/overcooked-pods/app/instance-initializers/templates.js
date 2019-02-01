export function initialize(appInstance) {
  appInstance.inject("route", "recipes", "service:game-recipes");
  let recipes = appInstance.get("application.initialRecipes");
  let recipeService = appInstance.lookup("service:game-recipes");
  recipeService.initialize(recipes);

  let blocks = appInstance.get("application.initialBlocks");
  let blocksService = appInstance.lookup("service:game-blocks");
  blocksService.initialize(blocks);

  let player = appInstance.get("application.player");
  let playerService = appInstance.lookup("service:game-player");
  playerService.initialize(player);
}

export default {
  name: "templates",
  initialize
};
