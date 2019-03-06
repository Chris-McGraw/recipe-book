/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function hamburgerIconMorph() {
  if(navbarDropdownActive === false) {
    $hamburgerBarTop.addClass("rotate-bar-top");
    $hamburgerBarMiddle.addClass("hide-bar-middle");
    $hamburgerBarBottom.addClass("rotate-bar-bottom");
  }

  else if(navbarDropdownActive === true) {
    $hamburgerBarTop.removeClass("rotate-bar-top");
    $hamburgerBarMiddle.removeClass("hide-bar-middle");
    $hamburgerBarBottom.removeClass("rotate-bar-bottom");
  }
}


function navbarDropdownToggle() {
  delayDropdown = true;

  hamburgerIconMorph();

  if(navbarDropdownActive === false) {
    $navbarDropdown.addClass("dropdown-expand");
    $bodyGridContainer.addClass("dropdown-expand");

    if(currentScreen === "savedRecipeListScreen" || currentScreen === "newRecipeListScreen") {
      $mainContentContainer.removeClass("main-content-container-retract");
      $mainContentContainer.addClass("main-content-container-expand");
    }
    else if(currentScreen === "displayedRecipeScreen") {
      $mainContentContainer.removeClass("main-content-container-retract-recipe");
      $mainContentContainer.addClass("main-content-container-expand-recipe");
    }

    navbarDropdownActive = true;
  }

  else if(navbarDropdownActive === true) {
    $navbarDropdown.removeClass("dropdown-expand");
    $bodyGridContainer.removeClass("dropdown-expand");

    if(currentScreen === "savedRecipeListScreen" || currentScreen === "newRecipeListScreen") {
      $mainContentContainer.removeClass("main-content-container-expand");
      $mainContentContainer.addClass("main-content-container-retract");
    }
    else if(currentScreen === "displayedRecipeScreen") {
      $mainContentContainer.removeClass("main-content-container-expand-recipe");
      $mainContentContainer.addClass("main-content-container-retract-recipe");
    }

    navbarDropdownActive = false;
  }

  setTimeout(function() {
    delayDropdown = false;
  }, 100);
}


function searchIconMorph() {
  if(searchDropdownActive === false) {
    $searchIcon.removeClass("show-search-icon");
    $searchIcon.addClass("hide-search-icon");

    setTimeout(function() {
      $searchCloseIcon.removeClass("hide-search-icon");
      $searchCloseIcon.addClass("show-search-icon");
    }, 150);
  }

  else if(searchDropdownActive === true) {
    $searchCloseIcon.removeClass("show-search-icon");
    $searchCloseIcon.addClass("hide-search-icon");

    setTimeout(function() {
      $searchIcon.removeClass("hide-search-icon");
      $searchIcon.addClass("show-search-icon");
    }, 150);
  }
}


function searchDropdownToggle() {
  delayDropdown = true;

  searchIconMorph();

  if(searchDropdownActive === false) {
    $searchDropdown.addClass("dropdown-expand");
    $bodyGridContainer.addClass("dropdown-expand");

    if(currentScreen === "savedRecipeListScreen" || currentScreen === "newRecipeListScreen") {
      $mainContentContainer.removeClass("main-content-container-retract");
      $mainContentContainer.addClass("main-content-container-expand");
    }
    else if(currentScreen === "displayedRecipeScreen") {
      $mainContentContainer.removeClass("main-content-container-retract-recipe");
      $mainContentContainer.addClass("main-content-container-expand-recipe");
    }

    searchDropdownActive = true;
  }

  else if(searchDropdownActive === true) {
    $searchDropdown.removeClass("dropdown-expand");
    $bodyGridContainer.removeClass("dropdown-expand");

    if(currentScreen === "savedRecipeListScreen" || currentScreen === "newRecipeListScreen") {
      $mainContentContainer.removeClass("main-content-container-expand");
      $mainContentContainer.addClass("main-content-container-retract");
    }
    else if(currentScreen === "displayedRecipeScreen") {
      $mainContentContainer.removeClass("main-content-container-expand-recipe");
      $mainContentContainer.addClass("main-content-container-retract-recipe");
    }

    searchDropdownActive = false;
  }

  setTimeout(function() {
    delayDropdown = false;
  }, 100);
}


function userSearchFocused() {
  savedScrollPosition = currentScrollPosition;

  window.scrollTo(0, 0);

  allowLocalSearch = true;

  document.ontouchmove = function(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  $(document.body).css("overflow", "hidden");

  $bodySearchMask.removeClass("body-search-mask-retract");
  $bodySearchMask.addClass("body-search-mask-expand");

  $bodySearchMask.css("z-index", "10");
}


function userSearchBlurred() {
  window.scrollTo(0, savedScrollPosition);

  allowLocalSearch = false;

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


function clearSearch() {
  $categoryItem.removeClass("category-active");
  currentCatActive = "search";

  $searchResultNone.remove();
}


function searchSavedRecipes() {
  var userInputTrim = $searchBar.val().trim();
  /* console.log(userInputTrim.toLowerCase()); */

  userInputArchive = $searchBar.val();

  delayLocalSearch = true;
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

    hideScreenAll();

    showSavedRecipeListScreen();

    setTimeout(function() {
      populateTiles();
    }, 200);
  }

  else if(recipeListSearch.length === 0) {
    clearSearch();
    $searchBar.val(userInputTrim);

    clearTiles();
    document.activeElement.blur();

    hideScreenAll();

    showSavedRecipeListScreen();

    $searchResultNone = $("<div>No Results Found</div>")
                     .attr("id", "search-result-none")

    $bodyGridContainer.append($searchResultNone);

    setTimeout(function() {
      $searchResultNone.addClass("search-fade-in");
    }, 0);
  }

  setTimeout(function() {
    delayLocalSearch = false;
  }, 1000);
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {


  $hamburgerMenu.on("click", function() {
    if(delayDropdown === false) {
      if(searchDropdownActive === true) {
        searchDropdownToggle();

        setTimeout(function() {
          navbarDropdownToggle();
        }, 400);
      }

      else {
        navbarDropdownToggle();
      }
    }
  });


  $searchIcon.on("click", function() {
    if(delayDropdown === false) {
      if(navbarDropdownActive === true) {
        navbarDropdownToggle();

        setTimeout(function() {
          searchDropdownToggle();
        }, 400);
      }

      else {
        searchDropdownToggle();
      }
    }
  });


  $searchCloseIcon.on("click", function() {
    if(delayDropdown === false) {
      if(navbarDropdownActive === true) {
        navbarDropdownToggle();

        setTimeout(function() {
          searchDropdownToggle();
        }, 400);
      }

      else {
        searchDropdownToggle();
      }
    }
  });





  $searchBar.on("focus", function() {
    userSearchFocused();
  });

  $searchBar.on("blur", function() {
    userSearchBlurred();
  });





  $dropdownButtonSaved.on("click", function() {
    if(delayPopulate === false) {
      delayPopulate = true;

      screenTransitionFadeOut();

      setTimeout(function() {
        document.getElementById("search-bar").value= "";
        userInputArchive = "";

        clearSearch();
        clearTiles();

        $categoryItem.removeClass("category-active");
        $catAll.addClass("category-active");
        currentCatActive = "all";

        hideScreenAll();

        screenTransitionFadeIn();

        showSavedRecipeListScreen();

        setTimeout(function() {
          delayPopulate = false;
          populateTiles();
        }, 200);
      }, 500);
    }
  });

  $dropdownButtonFindNew.on("click", function() {
    if(delayPopulate === false) {
      delayPopulate = true;

      document.getElementById("search-bar").value= "";
      userInputArchive = "";

      screenTransitionFadeOut();

      setTimeout(function() {
        hideScreenAll();

        document.getElementById("new-recipe-search-bar").value= "";

        screenTransitionFadeIn();

        showNewRecipeFinderScreen();

        setTimeout(function() {
          delayPopulate = false;
        }, 200);
      }, 500);
    }
  });





  $searchIconDropdown.on("click", function() {
    if(currentScreen === "savedRecipeListScreen" && delayLocalSearch === false && $searchBar.val() !== ""
    || currentScreen === "displayedRecipeScreen" && delayLocalSearch === false && $searchBar.val() !== "") {
      searchSavedRecipes();
    }
  });

  $(document).keydown(function(event) {
  /* ----- Enter Key Press ----- */
    if(event.which === 13 && currentScreen === "savedRecipeListScreen" && allowLocalSearch === true
    && delayLocalSearch === false && $searchBar.val() !== ""
    || event.which === 13 && currentScreen === "displayedRecipeScreen" && allowLocalSearch === true
    && delayLocalSearch === false && $searchBar.val() !== "") {
      searchSavedRecipes();
    }
  });


});
