/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function increaseFontSize() {
  $bodyGridContainer.css("top", "114px");
  $bodyGridContainer.css("grid-row-gap", "24px");

  $recipeTitleContainer.css("font-size", "28px");
  $recipeTitleContainer.css("padding-bottom", "4px");

  $ingredientContainer.css("font-size", "18px");
  $ingredientTitle.css("font-size", "24px");
  $ingredientTitle.css("margin-bottom", "24px");
  $ingredientTitle.css("padding-bottom", "9px");

  $ingredientListItem.css("padding-bottom", "10px");

  $recipeContainer.css("font-size", "18px");
  $recipeTitle.css("font-size", "24px");
  $recipeTitle.css("margin-bottom", "24px");
  $recipeTitle.css("padding-bottom", "9px");

  $recipeStep.css("line-height", "24px");
  $recipeStep.css("padding-bottom", "24px");

  currentFontSize = "increased";
}


function decreaseFontSize() {
  $bodyGridContainer.css("top", "110px");
  $bodyGridContainer.css("grid-row-gap", "20px");

  $recipeTitleContainer.css("font-size", "24px");
  $recipeTitleContainer.css("padding-bottom", "0px");

  $ingredientContainer.css("font-size", "14px");
  $ingredientTitle.css("font-size", "20px");
  $ingredientTitle.css("margin-bottom", "20px");
  $ingredientTitle.css("padding-bottom", "5px");

  $ingredientListItem.css("padding-bottom", "6px");

  $recipeContainer.css("font-size", "14px");
  $recipeTitle.css("font-size", "20px");
  $recipeTitle.css("margin-bottom", "20px");
  $recipeTitle.css("padding-bottom", "5px");

  $recipeStep.css("line-height", "20px");
  $recipeStep.css("padding-bottom", "20px");

  currentFontSize = "default";
}


function toggleFontSize() {
  if(currentFontSize === "default") {
    increaseFontSize();
  }
  else if(currentFontSize === "increased") {
    decreaseFontSize();
  }
}





function hideSavedRecipeListScreen() {
  $categoryContainer.hide();
  $sortBySelect.hide();

  clearTiles();

  $searchResultNone.remove();
}


function showSavedRecipeListScreen() {
  currentScreen = "savedRecipeListScreen";

  // console.log("current screen = " + currentScreen);
  // console.log("");

  window.scrollTo(0, 0);

  $bodyGridContainer.css("grid-row-gap", "80px");
  $bodyGridContainer.css("top", "110px");
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

  $categoryContainer.show();
  $sortBySelect.show();
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





  $sortBySelect.change(function() {
    sortRecipeMaster();
  });





  $backButton.on("click", function() {
    if(delayPopulate === false) {
      delayPopulate = true;

      screenTransitionFadeOut();

      setTimeout(function() {
        hideScreenAll();

        screenTransitionFadeIn();

        showSavedRecipeListScreen();

        document.getElementById("search-bar").value = userInputArchive;

        setTimeout(function() {
          delayPopulate = false;
          populateTiles();
        }, 200);
      }, 500);
    }
  });

  $fontSizeButton.on("click", function() {
    toggleFontSize();
  });


});
