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
var $navbar = $("#navbar");
var $navbarDropdown = $("#navbar-dropdown");
var navbarDropdownActive = false;
var delayDropdown = false;

var $searchIcon = $("#search-icon");
var $searchCloseIcon = $("#search-close-icon");
var $searchDropdown = $("#search-dropdown");
var searchDropdownActive = false;

var $dropdownButtonSaved = $("#dropdown-button-saved");
var $dropdownButtonFindNew = $("#dropdown-button-find-new");


/* __________ BODY GRID CONTAINER __________ */
var $bodyGridContainer = $("#body-grid-container");


/* _______ NEW RECIPE FINDER SCREEN _______ */
var allowNewRecipeSearch = false;

var $newRecipeFinderTitle = $("#new-recipe-finder-title");
var $newRecipeFinderFormContainer = $("#new-recipe-finder-form-container");
var $newRecipeSearchBar = $("#new-recipe-search-bar");
var $newRecipeSearchButton = $("#new-recipe-search-button");


/* ________________ FOOTER ________________ */
var $copyrightFooter = $("#copyright-footer");
