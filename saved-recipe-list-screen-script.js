/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function hideSavedRecipeListScreen() {
  $savedRecipeListTitle.hide();
  $categoryContainer.hide();
  $sortBySelect.hide();
  $addRecipeTile.hide();

  clearTiles();

  $searchResultNone.remove();
}


function showSavedRecipeListScreen() {
  currentScreen = "savedRecipeListScreen";

  // console.log("current screen = " + currentScreen);
  // console.log("");

  window.scrollTo(0, 0);

  $bodyGridContainer.css("grid-row-gap", "80px");
  $bodyGridContainer.css("top", "80px");
  $bodyGridContainer.css("padding-bottom", "60px");
  $bodyGridContainer.css("-webkit-user-select", "none");
  $bodyGridContainer.css("user-select", "none");

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

  $searchBar.attr("placeholder", "Search My Saved Recipes...");

  $savedRecipeListTitle.show();
  $categoryContainer.show();
  $sortBySelect.show();
  $addRecipeTile.show();
}


function categoryActive() {
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
  document.getElementById("search-bar").value= "";
  userInputArchive = "";

  categoryActive();
  clearTiles();
  $searchResultNone.remove();

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
}


function sortRecipeMaster() {
  if($sortBySelect.val() === "ascending") {
    if(recipeOrderAlpha === "descending") {

      clearRecipeLists();
      clearTiles();

      recipeListMaster.reverse();
      sortRecipeCategory();

      if(recipeListSearch.length > 0) {
        recipeListSearch.reverse();
      }

      setTimeout(function() {
        populateTiles();
      }, 200);

      recipeOrderAlpha = "ascending";
    }
  }

  else if($sortBySelect.val() === "descending") {
    if(recipeOrderAlpha === "ascending") {

      clearRecipeLists();
      clearTiles();

      recipeListMaster.reverse();
      sortRecipeCategory();

      if(recipeListSearch.length > 0) {
        recipeListSearch.reverse();
      }

      setTimeout(function() {
        populateTiles();
      }, 200);

      recipeOrderAlpha = "descending";
    }
  }
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {

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





  $sortBySelect.on("focus", function() {
    if(touchDevice === true) {
      document.ontouchmove = function(event) {
        event.preventDefault();
        event.stopPropagation();
      }

      setTimeout(function() {
        /* newRecipeFinderSearchFocused(); */

        window.scrollTo(0, 0);

        $(document.body).css("overflow", "hidden");

        $navbar.hide();
        $navbarDropdown.hide();
        $searchDropdown.hide();

        if(navbarDropdownActive === true || searchDropdownActive === true) {
          $bodyGridContainer.css("top", "-30px");
        }
        else if(navbarDropdownActive === false && searchDropdownActive === false) {
          $bodyGridContainer.css("top", "10px");
        }

        $bodySearchMask.removeClass("body-search-mask-retract");
        $bodySearchMask.addClass("body-search-mask-expand");

        $bodySearchMask.css("background-color", "rgba(0, 0, 0, 0.0)");
        $bodySearchMask.css("z-index", "10");

        $searchBar.attr("disabled", "disabled");
      }, 200);
    }
  });

  $sortBySelect.on("blur", function() {
    if(touchDevice === true) {
      /* newRecipeFinderSearchBlurred(); */

      document.ontouchmove = function(event) {
        return true;
      }

      $(document.body).css("overflow", "auto");

      $navbar.show();
      $navbarDropdown.show();
      $searchDropdown.show();

      $bodyGridContainer.css("top", "80px");

      $bodySearchMask.removeClass("body-search-mask-expand");
      $bodySearchMask.addClass("body-search-mask-retract");

      setTimeout(function() {
        $bodySearchMask.css("z-index", "-10");
        $bodySearchMask.css("background-color", "rgba(0, 0, 0, 0.8)");;
      }, 300);

      $searchBar.removeAttr("disabled");

      sortRecipeMaster();
    }
  });

  $sortBySelect.change(function() {
    if(touchDevice !== true) {
      sortRecipeMaster();
    }
  });


});
