/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
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


function newRecipeFinderSearchFocused() {
  window.scrollTo(0, 0);

  $(document.body).css("overflow", "hidden");

  $navbar.hide();
  $navbarDropdown.hide();
  $searchDropdown.hide();

  if(navbarDropdownActive === true || searchDropdownActive === true) {
    $bodyGridContainer.css("top", "-20px");
  }
  else if(navbarDropdownActive === false && searchDropdownActive === false) {
    $bodyGridContainer.css("top", "20px");
  }
}


function newRecipeFinderSearchBlurred() {
  document.ontouchmove = function(event) {
    return true;
  }

  $(document.body).css("overflow", "auto");

  $navbar.show();
  $navbarDropdown.show();
  $searchDropdown.show();

  $bodyGridContainer.css("top", "110px");
}


function recipeSearchNew() {
  delayRecipeSearchNew = true;

  screenTransitionFadeOut();

  setTimeout(function() {
    hideScreenAll();

    screenTransitionFadeIn();

    showNewRecipeListScreen();

    setTimeout(function() {
      delayRecipeSearchNew = false;
    }, 200);

    setTimeout(function() {
      populateTilesNewRecipes();
    }, 500);

  }, 500);
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {


  $newRecipeSearchBar.on("focus", function() {
    allowRecipeSearchNew = true;

    if(touchDevice === true) {
      document.ontouchmove = function(event) {
        event.preventDefault();
        event.stopPropagation();
      }

      setTimeout(function() {
        newRecipeFinderSearchFocused();
      }, 200);
    }
  });

  $newRecipeSearchBar.on("blur", function() {
    allowRecipeSearchNew = false;

    if(touchDevice === true) {
      newRecipeFinderSearchBlurred();
    }
  });





  $newRecipeSearchButton.on("click", function() {
    if($newRecipeSearchBar.val() !== "" && delayRecipeSearchNew === false) {
      getNewRecipes();

      recipeSearchNew();
    }
  });

  $(document).keydown(function(event) {
  /* ----- Enter Key Press ----- */
    if(event.which === 13 && allowRecipeSearchNew === true
    && delayRecipeSearchNew === false && $newRecipeSearchBar.val() !== "") {
      getNewRecipes();

      recipeSearchNew();
    }
  });


});
