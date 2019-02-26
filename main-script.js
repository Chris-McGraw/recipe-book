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


function hideSavedRecipeListScreen() {
  $categoryContainer.hide();
  $sortBySelect.hide();

  clearTiles();

  $searchResultNone.remove();
}


function hideDisplayedRecipeScreen() {
  $recipeTitleContainer.hide();
  $ingredientContainer.hide();
  $imageContainer.hide();
  $recipeContainer.hide();
  $bottomOptionBar.hide();
  $bottomOptionBarBackground.hide();
}


function hideNewRecipeFinderScreen() {
  $newRecipeFinderTitle.hide();
  $newRecipeFinderFormContainer.hide();
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {


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
