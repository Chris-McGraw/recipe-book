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

var $navbar = $("#navbar");

var $navbarDropdown = $("#navbar-dropdown");
var $dropdownButtonSaved = $("#dropdown-button-saved");
var $dropdownButtonFindNew = $("#dropdown-button-find-new");

var $searchDropdown = $("#search-dropdown");
var $searchIcon = $("#search-icon");
var $searchCloseIcon = $("#search-close-icon");


/* __________ BODY GRID CONTAINER __________ */
var $bodyGridContainer = $("#body-grid-container");


/* ________ DISPLAYED RECIPE SCREEN ________ */
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
var allowNewRecipeSearch = false;

var $newRecipeFinderTitle = $("#new-recipe-finder-title");
var $newRecipeFinderFormContainer = $("#new-recipe-finder-form-container");
var $newRecipeSearchBar = $("#new-recipe-search-bar");
var $newRecipeSearchButton = $("#new-recipe-search-button");


/* ________________ FOOTER ________________ */
var $copyrightFooter = $("#copyright-footer");
