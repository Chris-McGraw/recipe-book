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


/* __________ ADD NEW RECIPE FORM __________ */
var $addRecipeForm = $("#add-recipe-form");
var $addRecipeFormGrid = $("#add-recipe-form-grid");
var $addRecipeCloseIcon = $("#add-recipe-close-icon");
var addRecipeFormActive = false;
var addRecipeFormInputFocused = false;

var validNameInputRegEx = false;
var validTagInputRegEx = false;
var validIngredientInputRegEx = false;
var validRecipeStepInputRegEx = false;

var validNameInputBlank = false;
var validTagInputBlank = false;
var validIngredientInputBlank = false;
var validRecipeStepInputBlank = false;

var validNameInput = false;
var validTagInput = false;
var validIngredientInput = false;
var validRecipeStepInput = false;

var addRecipeFormValid = false;

var $addRecipeFormInput = $(".add-recipe-form-input");
var $nameInput = $("#name-input");
var $tagInput = $("#tag-input");
var $ingredientInput = $("#ingredient-input");
var $recipeStepInput = $("#recipe-step-input");
var $addRecipeFormTouchSpacer = $("#add-recipe-form-touch-spacer");

var userSavedRecipes = [];
var $addRecipeSubmit = $("#add-recipe-submit");

var $recipeNameErrorMessage = $("#recipe-name-error-message");
var $searchTagErrorMessage = $("#search-tag-error-message");
var $ingredientErrorMessage = $("#ingredient-error-message");
var $recipeStepErrorMessage = $("#recipe-step-error-message");


/* __________ DELETE RECIPE MODAL __________ */
var $deleteRecipeModal = $("#delete-recipe-modal");
var $deleteRecipeCloseIcon = $("#delete-recipe-close-icon");
var $deleteRecipeNameSpan = $("#delete-recipe-name-span");
var $deleteRecipeConfirmButton = $("#delete-recipe-confirm-button");
var $deleteRecipeCancelButton = $("#delete-recipe-cancel-button");
var deleteRecipeModalActive = false;
var bottomOptionBarClickCount = 0;


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

var $addRecipeTile = $("#add-recipe-tile");

var $tile = [];
var $tileLink = [];
var $tileHeader = [];

var $searchResultNone = $("#search-result-none");


/* ________ DISPLAYED RECIPE SCREEN ________ */
var currentRecipeID = "";
var currentLinkHash = "";
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
var $deleteRecipeIcon = $("#delete-recipe-icon");


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

  $addRecipeTile.css("display", "none");
  $addRecipeTile.removeClass("tile-fade-in");

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

    $newTile = $("<a/>")
                     .attr("id", "tile-" + tileCount)
                     .attr("href", currentRecipeList[tileCount].hash)
                     .addClass("tile");

    $bodyGridContainer.append($newTile);

    $newTile.append($newTileHeader);

    $tile[tileCount] = $("#tile-" + tileCount);

    if(currentRecipeList[tileCount].img === "") {
      $tile[tileCount].css("background-image", "url(https://res.cloudinary.com/dtwyohvli/image/upload/v1571232456/recipe-book/icon-main.png)");

      $tile[tileCount].css("background-position", "center");
      $tile[tileCount].css("background-size", "100px auto");
      $tile[tileCount].css("background-repeat", "no-repeat");
    }
    else {
      $tile[tileCount].css("background-image", "url(" + "'" + currentRecipeList[tileCount].img + "'" + ")");
    }

    $tileHeader[tileCount] = $("#tile-header-" + tileCount);
    $tileHeader[tileCount].html(currentRecipeList[tileCount].name);



    $newTile.on("click", function(event) {
      if(delayPopulate === false) {
        event.preventDefault();

        delayPopulate = true;

        currentLinkHash = $(this).attr("href");

        getSelectedRecipeID();

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



    $addRecipeTile.css("display", "flex");

    setTimeout(function() {
      if(allowPopulate === true) {
        $addRecipeTile.addClass("tile-fade-in");
      }
    }, 100);

    setTimeout(function() {
      if(allowPopulate === true) {
        $tile[tileCount].addClass("tile-fade-in");

        tileCount++;
      }
    }, 200);

    setTimeout(function() {
      if(allowPopulate === true) {
        populateTiles();
      }
    }, 200);
  }
  else {
    if(delayLocalSearch === false) {
      allowPopulate = true;

      $addRecipeTile.css("display", "flex");

      setTimeout(function() {
        if(allowPopulate === true) {
          $addRecipeTile.addClass("tile-fade-in");
        }
      }, 100);
    }
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


function showBodyMask() {
  document.ontouchmove = function(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  $(document.body).css("overflow", "hidden");

  $bodySearchMask.removeClass("body-search-mask-retract");
  $bodySearchMask.addClass("body-search-mask-expand");

  $bodySearchMask.css("z-index", "10");
}


function hideBodyMask() {
  document.ontouchmove = function(event) {
    return true;
  }

  $(document.body).css("overflow", "auto");

  $bodySearchMask.removeClass("body-search-mask-expand");
  $bodySearchMask.addClass("body-search-mask-retract");

  setTimeout(function() {
    $bodySearchMask.css("z-index", "-10");
  }, 300);
}


function addDropdownButtonMouseTouchEvents(button) {
  button.on("mouseenter", function() {
    button.addClass("dropdown-button-active");
  });

  button.on("mouseleave", function() {
    button.removeClass("dropdown-button-pressed");
    button.removeClass("dropdown-button-active");
  });

  button.on("mousedown", function() {
    button.addClass("dropdown-button-pressed");
  });

  button.on("mouseup", function() {
    button.removeClass("dropdown-button-pressed");
  });

  button.on("touchstart", function() {
    button.addClass("dropdown-button-active");
    button.addClass("dropdown-button-pressed");
  });

  button.on("touchend", function() {
    button.removeClass("dropdown-button-pressed");
    button.removeClass("dropdown-button-active");
  });
}


function addButtonMouseTouchEvents(button) {
  button.on("mouseenter", function() {
    if(button.attr("id") === "delete-recipe-confirm-button") {
      button.addClass("delete-button-active");
    }
    else {
      button.addClass("button-active");
    }
  });

  button.on("mouseleave", function() {
    button.removeClass("button-pressed");
    button.removeClass("button-active");
    button.removeClass("delete-button-active");
  });

  button.on("mousedown", function() {
    button.addClass("button-pressed");
  });

  button.on("mouseup", function() {
    button.removeClass("button-pressed");
  });

  button.on("touchstart", function() {
    if(button.attr("id") === "delete-recipe-confirm-button") {
      button.addClass("delete-button-active");
    }
    else {
      button.addClass("button-active");
    }

    button.addClass("button-pressed");
  });

  button.on("touchend", function() {
    button.removeClass("button-pressed");
    button.removeClass("button-active");
    button.removeClass("delete-button-active");
  });
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {
  if(localStorage.length === 0 || localStorage.getItem("userSavedRecipes") === null) {
    console.log("local storage has not been defined");
  }
  else if(localStorage.length > 0 && localStorage.getItem("userSavedRecipes") === null) {
    var storedUserRecipeArray = JSON.parse( localStorage.getItem("userSavedRecipes") );
    recipeListMaster.length = 0;

    storedUserRecipeArray.forEach(function(object) {
      recipeListMaster.push(object);
    });
  };

  recipeListMaster.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

  sortRecipeCategory();

  populateTiles();



  document.ontouchstart = function(event) {
    touchDevice = true;

    $dropdownButtonSaved.off("mouseenter");
    $dropdownButtonSaved.css("transition-duration", "0s");
    $dropdownButtonFindNew.off("mouseenter");
    $dropdownButtonFindNew.css("transition-duration", "0s");

    $addRecipeSubmit.off("mouseenter");
    $addRecipeSubmit.css("transition-duration", "0s");

    $deleteRecipeConfirmButton.off("mouseenter");
    $deleteRecipeConfirmButton.css("transition-duration", "0s");
    $deleteRecipeCancelButton.off("mouseenter");
    $deleteRecipeCancelButton.css("transition-duration", "0s");

    $newRecipeSearchButton.off("mouseenter");
    $newRecipeSearchButton.css("transition-duration", "0s");
  }

  document.ontouchmove = function(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  $(document).on("scroll", function() {
    currentScrollPosition = window.pageYOffset;
  });


});
