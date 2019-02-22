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

    /* $newRecipeFinderTitle.css("color", "yellow"); */
  }


  function newRecipeFinderSearchBlurred() {
    $(document.body).css("overflow", "auto");

    $navbar.show();
    $navbarDropdown.show();
    $searchDropdown.show();

    $bodyGridContainer.css("top", "110px");
  }





/* ---------------------------- EVENT HANDLERS ---------------------------- */
  $newRecipeSearchBar.on("focus", function() {
    document.ontouchmove = function(event) {
      event.preventDefault();
      event.stopPropagation();

      touchDevice = true;
    }

    if(touchDevice === true) {
      setTimeout(function() {
        newRecipeFinderSearchFocused();
      }, 200);
    }
  });

  $newRecipeSearchBar.on("blur", function() {
    document.ontouchmove = function(event) {
      return true;

      touchDevice = true;
    }

    if(touchDevice === true) {
      newRecipeFinderSearchBlurred();
    }
  });


});
