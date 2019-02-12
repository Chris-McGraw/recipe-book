$(document).ready(function() {

/* ------------------------- VARIABLE DECLARATIONS ------------------------- */
  var $hamburgerMenu = $("#hamburger-menu");
  var $hamburgerBarTop = $("#hamburger-bar-top");
  var $hamburgerBarMiddle = $("#hamburger-bar-middle");
  var $hamburgerBarBottom = $("#hamburger-bar-bottom");





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

      if(currentScreen === "savedRecipeListScreen") {
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

      if(currentScreen === "savedRecipeListScreen") {
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

      if(currentScreen === "savedRecipeListScreen") {
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

      if(currentScreen === "savedRecipeListScreen") {
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





/* ---------------------------- EVENT HANDLERS ---------------------------- */
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


});
