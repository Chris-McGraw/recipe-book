$(document).ready(function() {

/* ------------------------- VARIABLE DECLARATIONS ------------------------- */
  var currentRecipeName = "";

  var $imageContainer = $("#image-container");


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


  function populateRecipePage() {
    getCurrentRecipe();

    for(q = 0; q < recipeListMaster.length; q++) {
      if(currentRecipeName === recipeListMaster[q].id) {
        /* console.log(recipeListMaster[q].name); */

        $imageContainer.css("background-image", "url(" + "'" + recipeListMaster[q].img + "'" + ")");
      }
    }
  }


/* ---------------------------- EVENT HANDLERS ---------------------------- */
  populateRecipePage();


});
