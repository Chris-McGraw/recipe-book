$(document).ready(function() {

/* ------------------------- VARIABLE DECLARATIONS ------------------------- */
  var currentRecipeName = "";

  var $recipeTitleContainer = $("#recipe-title-container");
  var $imageContainer = $("#image-container");

  var $ingredientListAll = $("#ingredient-list-all");
  var $ingredientListLeft = $("#ingredient-list-left");
  var $ingredientListRight = $("#ingredient-list-right");


/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
  function getCurrentRecipe() {
    var currentURL = window.location.href;
    /* console.log(currentURL); */

    var recipeNameDashed = currentURL.split("recipes/")[1].split(".html")[0];
    /* console.log(recipeNameDashed); */

    var splitArray = recipeNameDashed.split("-");
    /* console.log(splitArray); */

    for(n = 0; n < splitArray.length; n++) {
      if(n >= 1) {
        splitArray[n] = splitArray[n].charAt(0).toUpperCase() + splitArray[n].slice(1);
      }
    }

    currentRecipeName = splitArray.join("");
    /* console.log(currentRecipeName); */
  }


  function getIngredientList() {
    var ingredientListHalfFirst = Math.round(recipeListMaster[q].ingredients.length / 2);
    var ingredientListHalfLast = ingredientListHalfFirst;

    /* Get Ingredient List All */
    for(ingListCount = 0; ingListCount < recipeListMaster[q].ingredients.length; ingListCount++) {
      $ingredientListAll.append("<li>- " + recipeListMaster[q].ingredients[ingListCount] + "</li>");
    }

    /* Get Ingredient List Left */
    for(ingListCount = 0; ingListCount < ingredientListHalfFirst; ingListCount++) {
      $ingredientListLeft.append("<li>- " + recipeListMaster[q].ingredients[ingListCount] + "</li>");
    }

    /* Get Ingredient List Right */
    for(ingListCount2 = ingredientListHalfLast; ingListCount2 < recipeListMaster[q].ingredients.length; ingListCount2++) {
      $ingredientListRight.append("<li>- " + recipeListMaster[q].ingredients[ingListCount2] + "</li>");
    }
  }


  function populateRecipePage() {
    getCurrentRecipe();

    for(q = 0; q < recipeListMaster.length; q++) {
      if(currentRecipeName === recipeListMaster[q].id) {
        $recipeTitleContainer.append(recipeListMaster[q].name);
        $imageContainer.css("background-image", "url(" + "'" + recipeListMaster[q].img + "'" + ")");

        getIngredientList();
      }
    }
  }


/* ---------------------------- EVENT HANDLERS ---------------------------- */
  populateRecipePage();


});
