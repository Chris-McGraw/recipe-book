/* ------------------------- VARIABLE DECLARATIONS ------------------------- */

/* _________________ BODY _________________ */
var touchDevice = false;

var currentScreen = "savedRecipeListScreen";
var currentScrollPosition = 0;
var savedScrollPosition = 0;

var $iosStatusBarBackground = $("#ios-status-bar-background");
var $bodySearchMask = $("#body-search-mask");
var $mainContentContainer = $("#main-content-container");


/* ________________ NAVBAR ________________ */
var navbarDropdownActive = false;
var searchDropdownActive = false;
var delayDropdown = false;

var allowLocalSearch = false;
var delayLocalSearch = false;
var userInputArchive = "";
var recipeListSearch = [];

var $navbar = $("#navbar");
var $hamburgerMenu = $("#hamburger-menu");
var $hamburgerBarTop = $("#hamburger-bar-top");
var $hamburgerBarMiddle = $("#hamburger-bar-middle");
var $hamburgerBarBottom = $("#hamburger-bar-bottom");
var $searchIcon = $("#search-icon");
var $searchCloseIcon = $("#search-close-icon");

var $navbarDropdown = $("#navbar-dropdown");
var $dropdownButtonSaved = $("#dropdown-button-saved");
var $dropdownButtonFindNew = $("#dropdown-button-find-new");

var $searchDropdown = $("#search-dropdown");
var $searchBar = $("#search-bar");
var $searchIconDropdown = $("#search-icon-dropdown");


/* __________ BODY GRID CONTAINER __________ */
var $bodyGridContainer = $("#body-grid-container");


/* _______ SAVED RECIPE LIST SCREEN _______ */
var currentCatActive = "all";

var recipeOrderAlpha = "ascending";
var sortSelectHidden = false;

var allowPopulate = true;
var delayPopulate = false;
var currentRecipeList = [];
var tileCount = 0;

var $categoryContainer = $("#category-container");
var $categoryItem = $(".category-item");
var $catAll = $("#cat-all");
var $catBeef = $("#cat-beef");
var $catPork = $("#cat-pork");
var $catPoultry = $("#cat-poultry");
var $catSeafood = $("#cat-seafood");
var $catVeg = $("#cat-veg");

var $sortBySelect = $("#sort-by-select");

var $tile = [];
var $tileLink = [];
var $tileHeader = [];

var $searchResultNone = $("#search-result-none");


/* ________ DISPLAYED RECIPE SCREEN ________ */
var currentRecipeName = "";
var currentURL = "";
var currentFontSize = "default";

var $recipeTitleContainer = $("#recipe-title-container");
var $recipeTitle = $("#recipe-title");

var $ingredientContainer = $("#ingredient-container");
var $ingredientTitle = $("#ingredient-title");
var $ingredientListAll = $("#ingredient-list-all");
var $ingredientListLeft = $("#ingredient-list-left");
var $ingredientListRight = $("#ingredient-list-right");

var $imageContainer = $("#image-container");

var $recipeContainer = $("#recipe-container");
var $recipeStepList = $("#recipe-step-list");

var $bottomOptionBar = $("#bottom-option-bar");
var $bottomOptionBarBackground = $("#bottom-option-bar-background");
var $backButton = $("#back-button");
var $fontSizeButton = $("#font-size-button");


/* _______ NEW RECIPE FINDER SCREEN _______ */
var allowRecipeSearchNew = false;
var delayRecipeSearchNew = false;

var $newRecipeFinderTitle = $("#new-recipe-finder-title");
var $newRecipeFinderFormContainer = $("#new-recipe-finder-form-container");
var $newRecipeSearchBar = $("#new-recipe-search-bar");
var $newRecipeSearchButton = $("#new-recipe-search-button");


/* ________________ FOOTER ________________ */
var $copyrightFooter = $("#copyright-footer");





/* ------------------------- FUNCTION DECLARATIONS ------------------------- */

/* _________________ BODY _________________ */
function removeContainerClasses() {
  $mainContentContainer.removeClass("main-content-container-retract");
  $mainContentContainer.removeClass("main-content-container-expand");
  $mainContentContainer.removeClass("main-content-container-retract-recipe");
  $mainContentContainer.removeClass("main-content-container-expand-recipe");
}


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


function screenTransitionFadeOut() {
  $bodyGridContainer.addClass("screen-fade-out");
  $copyrightFooter.addClass("screen-fade-out");

  setTimeout(function() {
    $bottomOptionBar.removeClass("screen-fade-in");
  }, 0);
}


function screenTransitionFadeIn() {
  $bodyGridContainer.removeClass("screen-fade-out");
  $copyrightFooter.removeClass("screen-fade-out");

  setTimeout(function() {
    $bottomOptionBar.addClass("screen-fade-in");
  }, 0);
}


function hideScreenAll() {
  hideSavedRecipeListScreen();
  hideDisplayedRecipeScreen();
  hideNewRecipeFinderScreen();
}


/* _______ SAVED RECIPE LIST SCREEN _______ */
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
      if(delayPopulate === false) {
        delayPopulate = true;

        currentURL = $(this).css("background-image");

        getSelectedRecipeName();

        screenTransitionFadeOut();

        setTimeout(function() {
          hideSavedRecipeListScreen();

          document.getElementById("search-bar").value= "";

          screenTransitionFadeIn();

          showDisplayedRecipeScreen();

          setTimeout(function() {
            delayPopulate = false;
          }, 200);
        }, 500);
      }
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





/* ________ DISPLAYED RECIPE SCREEN ________ */
function hideDisplayedRecipeScreen() {
  $recipeTitleContainer.hide();
  $ingredientContainer.hide();
  $imageContainer.hide();
  $recipeContainer.hide();
  $bottomOptionBar.hide();
  $bottomOptionBarBackground.hide();
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

  $ingredientListItem = $(".ingredient-list-item");
}


function getRecipeSteps() {
  for(recipeStepCount = 0; recipeStepCount < currentRecipeList[y].recipe.length; recipeStepCount++) {
    $recipeStepList.append("<li class='recipe-step'>" + currentRecipeList[y].recipe[recipeStepCount] + "</li>");
  }

  $recipeStep = $(".recipe-step");
}


function showDisplayedRecipeScreen() {
  currentScreen = "displayedRecipeScreen";

  // console.log("current screen = " + currentScreen);
  // console.log("");

  window.scrollTo(0, 0);

  $bodyGridContainer.css("grid-row-gap", "20px");
  $bodyGridContainer.css("top", "110px");
  $bodyGridContainer.css("padding-bottom", "40px");
  $bodyGridContainer.css("-webkit-user-select", "auto");
  $bodyGridContainer.css("user-select", "auto");

  $recipeTitleContainer.empty();

  $imageContainer.css("background-image", "none");

// Footer Position Adjustments Begin
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
// Footer Position Adjustments End

  $ingredientListAll.empty();
  $ingredientListLeft.empty();
  $ingredientListRight.empty();
  $recipeStepList.empty();

  $recipeTitleContainer.show();
  $ingredientContainer.show();
  $imageContainer.show();
  $recipeContainer.show();
  $bottomOptionBar.show();
  $bottomOptionBarBackground.show();

  for(y = 0; y < currentRecipeList.length; y++) {
    if(currentRecipeName === currentRecipeList[y].id) {
      $recipeTitleContainer.html(currentRecipeList[y].name);

      $imageContainer.css("background-image", "url(" + "'" + currentRecipeList[y].img + "'" + ")");

      getIngredientList();

      getRecipeSteps();
    }
  }

  if(currentFontSize === "increased") {
    increaseFontSize();
  }
}


/* _______ NEW RECIPE FINDER SCREEN _______ */
function hideNewRecipeFinderScreen() {
  $newRecipeFinderTitle.hide();
  $newRecipeFinderFormContainer.hide();
}


function showNewRecipeFinderScreen() {
  currentScreen = "newRecipeFinderScreen";

  // console.log("current screen = " + currentScreen);
  // console.log("");

  $bodyGridContainer.css("grid-row-gap", "70px");
  $bodyGridContainer.css("top", "110px");

// Footer Position Adjustments Begin
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
// Footer Position Adjustments End

  $newRecipeFinderTitle.show();
  $newRecipeFinderFormContainer.show();
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {


  populateTiles();

  sortRecipeCategory();

  document.ontouchstart = function(event) {
    touchDevice = true;
  }

  document.ontouchmove = function(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  $(document).on("scroll", function() {
    currentScrollPosition = window.pageYOffset;
  });


});
