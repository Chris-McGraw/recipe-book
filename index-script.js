$(document).ready(function() {

/* ------------------------- VARIABLE DECLARATIONS ------------------------- */
  var $searchBar = $("#search-bar");
  var $searchIconDropdown = $("#search-icon-dropdown");
  var recipeListSearch = [];
  var allowLocalSearch = true;
  var $searchResultNone = $("#search-result-none");

  var $categoryContainer = $("#category-container");
  var $categoryItem = $(".category-item");
  var catContainerHidden = false;

  var $catAll = $("#cat-all");
  var $catBeef = $("#cat-beef");
  var $catPork = $("#cat-pork");
  var $catPoultry = $("#cat-poultry");
  var $catSeafood = $("#cat-seafood");
  var $catVeg = $("#cat-veg");

  var currentCatActive = "all";

  var $sortBySelect = $("#sort-by-select");
  var recipeOrderAlpha = "ascending";
  var sortSelectHidden = false;

  var $tile = [];
  var $tileLink = [];
  var $tileHeader = [];
  var tileCount = 0;

  var allowPopulate = true;
  var delayPopulate = false;

  var currentRecipeList = [];
  var currentRecipeName = "";
  var currentURL = "";





  var $recipeTitleContainer = $("#recipe-title-container");
  var $ingredientContainer = $("#ingredient-container");
  var $imageContainer = $("#image-container");
  var $recipeContainer = $("#recipe-container");

  var $ingredientListAll = $("#ingredient-list-all");
  var $ingredientListLeft = $("#ingredient-list-left");
  var $ingredientListRight = $("#ingredient-list-right");

  var $recipeStepList = $("#recipe-step-list");

  var $bottomOptionBar = $("#bottom-option-bar");
  var $backButton = $("#back-button");


/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function clearTiles() {
  allowPopulate = false;

  var $currentTiles = $(".tile");
  var $currentTileLinks = $(".tile-link");

  $currentTiles.remove();
  $currentTileLinks.remove();

  tileCount = 0;
  $tile.length = 0;
  $tileLink.length = 0;
  $tileHeader.length = 0;
}


function getSelectedRecipeName() {
  var recipeNameDashed = currentURL.split("recipe-book/")[1].split(".jpg")[0];
  var splitArray = recipeNameDashed.split("-");

  for(n = 0; n < splitArray.length; n++) {
    if(n >= 1) {
      splitArray[n] = splitArray[n].charAt(0).toUpperCase() + splitArray[n].slice(1);
    }
  }

  currentRecipeName = splitArray.join("");
  /* console.log(currentRecipeName); */
}


function getIngredientList() {
  var ingredientListHalfFirst = Math.round(currentRecipeList[y].ingredients.length / 2);
  var ingredientListHalfLast = ingredientListHalfFirst;

  /* Get Ingredient List All */
  for(ingListCount = 0; ingListCount < currentRecipeList[y].ingredients.length; ingListCount++) {
    $ingredientListAll.append("<li class='ingredient-list-item'>- " + currentRecipeList[y].ingredients[ingListCount] + "</li>");
  }

  /* Get Ingredient List Left */
  for(ingListCount = 0; ingListCount < ingredientListHalfFirst; ingListCount++) {
    $ingredientListLeft.append("<li class='ingredient-list-item'>- " + currentRecipeList[y].ingredients[ingListCount] + "</li>");
  }

  /* Get Ingredient List Right */
  for(ingListCount2 = ingredientListHalfLast; ingListCount2 < currentRecipeList[y].ingredients.length; ingListCount2++) {
    $ingredientListRight.append("<li class='ingredient-list-item'>- " + currentRecipeList[y].ingredients[ingListCount2] + "</li>");
  }
}


function getRecipeSteps() {
  for(recipeStepCount = 0; recipeStepCount < currentRecipeList[y].recipe.length; recipeStepCount++) {
    $recipeStepList.append("<li class='recipe-step'>" + currentRecipeList[y].recipe[recipeStepCount] + "</li>");
  }
}


function removeContainerClasses() {
  $mainContentContainer.removeClass("main-content-container-retract");
  $mainContentContainer.removeClass("main-content-container-expand");
  $mainContentContainer.removeClass("main-content-container-retract-recipe");
  $mainContentContainer.removeClass("main-content-container-expand-recipe");
}


function appendSelectedRecipe() {
  currentScreen = "screenRecipe";

  window.scrollTo(0, 0);

  $bodyGridContainer.css("grid-row-gap", "20px");
  $bodyGridContainer.css("top", "110px");
  $bodyGridContainer.css("padding-bottom", "40px");

  $recipeTitleContainer.empty();

  $imageContainer.css("background-image", "none");

/* Footer Position Adjustments Begin ----- */
  $copyrightFooter.css("top", "-82px");
  $copyrightFooter.css("height", "82px");

  if(navbarDropdownActive === true || searchDropdownActive === true) {
    removeContainerClasses();
    $mainContentContainer.addClass("main-content-container-expand-recipe");
  }
  else if(navbarDropdownActive === false && searchDropdownActive === false) {
    removeContainerClasses();
    $mainContentContainer.addClass("main-content-container-retract-recipe");
  }
/* ----- Footer Position Adjustments End */

  $ingredientListAll.empty();
  $ingredientListLeft.empty();
  $ingredientListRight.empty();
  $recipeStepList.empty();

  $recipeTitleContainer.show();
  $ingredientContainer.show();
  $imageContainer.show();
  $recipeContainer.show();
  $bottomOptionBar.show();

  for(y = 0; y < currentRecipeList.length; y++) {
    if(currentRecipeName === currentRecipeList[y].id) {
      $recipeTitleContainer.html(currentRecipeList[y].name);

      $imageContainer.css("background-image", "url(" + "'" + currentRecipeList[y].img + "'" + ")");

      getIngredientList();

      getRecipeSteps();
    }
  }
}


function showRecipeHome() {
  currentScreen = "screenHome";

  $bodyGridContainer.css("grid-row-gap", "80px");
  $bodyGridContainer.css("top", "110px");
  $bodyGridContainer.css("padding-bottom", "60px");

/* Footer Position Adjustments Begin ----- */
  $copyrightFooter.css("top", "-42px");
  $copyrightFooter.css("height", "42px");

  if(navbarDropdownActive === true || searchDropdownActive === true) {
    removeContainerClasses();
    $mainContentContainer.addClass("main-content-container-expand");
  }
  else if(navbarDropdownActive === false && searchDropdownActive === false) {
    removeContainerClasses();
    $mainContentContainer.addClass("main-content-container-retract");
  }
/* ----- Footer Position Adjustments End */

  $recipeTitleContainer.hide();
  $ingredientContainer.hide();
  $imageContainer.hide();
  $recipeContainer.hide();
  $bottomOptionBar.hide();

  $categoryContainer.show();
  $sortBySelect.show();
}


function populateTiles() {
  switch(currentCatActive) {
    case "all":
      currentRecipeList = recipeListMaster;
      break;
    case "beef":
      currentRecipeList = recipeListBeef;
      break;
    case "pork":
      currentRecipeList = recipeListPork;
      break;
    case "poultry":
      currentRecipeList = recipeListPoultry;
      break;
    case "seafood":
      currentRecipeList = recipeListSeafood;
      break;
    case "vegetarian":
      currentRecipeList = recipeListVegetarian;
      break;
    case "search":
      currentRecipeList = recipeListSearch;
      break;
    default:
      currentRecipeList = recipeListMaster;
  }

  if(tileCount < currentRecipeList.length) {
    allowPopulate = true;

    $newTileHeader = $("<h3/>")
                     .attr("id", "tile-header-" + tileCount)
                     .addClass("tile-header");

    $newTile = $("<div/>")
                     .attr("id", "tile-" + tileCount)
                     .addClass("tile")
                     .html("<div></div>");

    $bodyGridContainer.append($newTile);

    $newTile.append($newTileHeader);

    $tile[tileCount] = $("#tile-" + tileCount);
    $tile[tileCount].css("background-image", "url(" + "'" + currentRecipeList[tileCount].img + "'" + ")");

    $tileHeader[tileCount] = $("#tile-header-" + tileCount);
    $tileHeader[tileCount].html(currentRecipeList[tileCount].name);



    $newTile.on("click", function() {
      currentURL = $(this).css("background-image");

      getSelectedRecipeName();

      document.getElementById("search-bar").value= "";

      $categoryContainer.hide();
      $sortBySelect.hide();
      clearTiles();

      appendSelectedRecipe();
    });



    setTimeout(function() {
      if(allowPopulate === true) {
        $tile[tileCount].addClass("tile-fade-in");

        tileCount++;
      }
    }, 100);

    setTimeout(function() {
      if(allowPopulate === true) {
        populateTiles();
      }
    }, 200);
  }
}


function clearSearch() {
  $categoryItem.removeClass("category-active");
  currentCatActive = "search";

  $searchResultNone.remove();
}


function searchSavedRecipes() {
  var userInputTrim = $searchBar.val().trim();
  /* console.log(userInputTrim.toLowerCase()); */

  allowLocalSearch = false;
  recipeListSearch = [];

  recipeListMaster.forEach(function(element) {
    element.tags.forEach(function(entry) {
      if(entry == userInputTrim.toLowerCase()) {
        recipeListSearch.push(element);
      }
    });
  });

  if(recipeListSearch.length !== 0) {
    clearSearch();
    $searchBar.val(userInputTrim);

    clearTiles();
    document.activeElement.blur();

    showRecipeHome();

    setTimeout(function() {
      populateTiles();
    }, 200);
  }

  else if(recipeListSearch.length === 0) {
    clearSearch();
    $searchBar.val(userInputTrim);

    clearTiles();
    document.activeElement.blur();

    showRecipeHome();

    $searchResultNone = $("<div>No Results Found</div>")
                     .attr("id", "search-result-none")

    $bodyGridContainer.append($searchResultNone);

    setTimeout(function() {
      $searchResultNone.addClass("search-fade-in");
    }, 0);
  }

  setTimeout(function() {
    allowLocalSearch = true;
  }, 1000);
}


function categoryActive() {
  document.getElementById("search-bar").value= "";
  $searchResultNone.remove();

  switch(currentCatActive) {
    case "all":
      $categoryItem.removeClass("category-active");
      $catAll.addClass("category-active");
      break;
    case "beef":
      $categoryItem.removeClass("category-active");
      $catBeef.addClass("category-active");
      break;
    case "pork":
      $categoryItem.removeClass("category-active");
      $catPork.addClass("category-active");
      break;
    case "poultry":
      $categoryItem.removeClass("category-active");
      $catPoultry.addClass("category-active");
      break;
    case "seafood":
      $categoryItem.removeClass("category-active");
      $catSeafood.addClass("category-active");
      break;
    case "vegetarian":
      $categoryItem.removeClass("category-active");
      $catVeg.addClass("category-active");
      break;
    default:
      $categoryItem.removeClass("category-active");
      $catAll.addClass("category-active");
  }
}


function categoryClick() {
  categoryActive();
  clearTiles();

  delayPopulate = true;

  setTimeout(function() {
    delayPopulate = false;
    populateTiles();
  }, 200);
}


function clearRecipeLists() {
  recipeListBeef = [];
  recipeListPork = [];
  recipeListPoultry = [];
  recipeListSeafood = [];
  recipeListVegetarian = [];

  recipeListMaster.reverse();

  sortRecipeCategory();

  clearTiles();

  setTimeout(function() {
    populateTiles();
  }, 200);
}


function sortRecipeMaster() {
  if($sortBySelect.val() === "ascending") {
    if(recipeOrderAlpha === "descending") {
      if(recipeListSearch.length > 0) {
        recipeListSearch.reverse();
      }

      clearRecipeLists();

      recipeOrderAlpha = "ascending";
    }
  }

  else if($sortBySelect.val() === "descending") {
    if(recipeOrderAlpha === "ascending") {
      if(recipeListSearch.length > 0) {
        recipeListSearch.reverse();
      }

      clearRecipeLists();

      recipeOrderAlpha = "descending";
    }
  }
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
  sortRecipeCategory();

  populateTiles();





  $searchIconDropdown.on("click", function() {
    if(allowLocalSearch === true && $searchBar.val() !== "") {
      searchSavedRecipes();
    }
  });

  $(document).keydown(function(event) {
  /* ----- Enter Key Press ----- */
    if(event.which === 13 && allowLocalSearch === true && $searchBar.val() !== "") {
      searchSavedRecipes();
    }
  });





  $catAll.on("click", function() {
    if(currentCatActive !== "all" && delayPopulate === false) {
      currentCatActive = "all";
      categoryClick();
    }
  });

  $catBeef.on("click", function() {
    if(currentCatActive !== "beef" && delayPopulate === false) {
      currentCatActive = "beef";
      categoryClick();
    }
  });

  $catPork.on("click", function() {
    if(currentCatActive !== "pork" && delayPopulate === false) {
      currentCatActive = "pork";
      categoryClick();
    }
  });

  $catPoultry.on("click", function() {
    if(currentCatActive !== "poultry" && delayPopulate === false) {
      currentCatActive = "poultry";
      categoryClick();
    }
  });

  $catSeafood.on("click", function() {
    if(currentCatActive !== "seafood" && delayPopulate === false) {
      currentCatActive = "seafood";
      categoryClick();
    }
  });

  $catVeg.on("click", function() {
    if(currentCatActive !== "vegetarian" && delayPopulate === false) {
      currentCatActive = "vegetarian";
      categoryClick();
    }
  });





  $sortBySelect.change(function() {
    sortRecipeMaster();
  });





  $backButton.on("click", function() {
    showRecipeHome();

    setTimeout(function() {
      populateTiles();
    }, 200);
  });


});
