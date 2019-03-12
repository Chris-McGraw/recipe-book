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

var $savedRecipeListTitle = $("#saved-recipe-list-title");
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

var recipeSearchNewOrigin = "";

var newSearchResultArchive = "";
var newSearchResultArchiveNavbar = "";

var $newRecipeFinderTitle = $("#new-recipe-finder-title");

var $edamamBadge = $("#edamam-badge");
var $edamamBadgeMask = $("#edamam-badge-mask");

var $newRecipeFinderFormContainer = $("#new-recipe-finder-form-container");
var $newRecipeSearchBar = $("#new-recipe-search-bar");
var $newRecipeSearchButton = $("#new-recipe-search-button");


/* ________ NEW RECIPE LIST SCREEN ________ */
var recipeListMasterNew = [];
var recipeOrderAlphaNew = "ascending";

var $newRecipeListTitle = $("#new-recipe-list-title");

var $badgeCloneContainer = $("#badge-clone-container");
var $edamamBadgeClone = "";
var $edamamBadgeMaskClone = "";
var $edamamBadgeMaskCloneLink = $("#edamam-badge-mask-clone-link");

var $newRecipeSearchResultContainer = $("#new-recipe-search-result-container");
var $newSearchResultTerm = $("#new-search-result-term");

var $sortBySelectNewRecipe = $("#sort-by-select-new-recipe");

var $newRecipeSearchSpinner = $("#new-recipe-search-spinner");


/* ________________ FOOTER ________________ */
var $copyrightFooter = $("#copyright-footer");





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


function removeContainerClasses() {
  $mainContentContainer.removeClass("main-content-container-retract");
  $mainContentContainer.removeClass("main-content-container-expand");
  $mainContentContainer.removeClass("main-content-container-retract-recipe");
  $mainContentContainer.removeClass("main-content-container-expand-recipe");
}


function hideScreenAll() {
  hideSavedRecipeListScreen();
  hideDisplayedRecipeScreen();
  hideNewRecipeFinderScreen();
  hideNewRecipeListScreen();

  removeLoadSpinner();
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
