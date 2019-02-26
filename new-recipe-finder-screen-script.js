$(document).ready(function() {

/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
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

      setTimeout(function() {
        delayRecipeSearchNew = false;
      }, 200);
    }, 500);
  }





/* ---------------------------- EVENT HANDLERS ---------------------------- */
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
      console.log("New Recipe Search Button Press");

      recipeSearchNew();
    }
  });

  $(document).keydown(function(event) {
  /* ----- Enter Key Press ----- */
    if(event.which === 13 && allowRecipeSearchNew === true
    && delayRecipeSearchNew === false && $newRecipeSearchBar.val() !== "") {
      console.log("New Recipe Search Enter Key Press");

      recipeSearchNew();
    }
  });


});
