$(document).ready(function() {

/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
  function newRecipeFinderSearchFocused() {
    window.scrollTo(0, 0);

    document.ontouchmove = function(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    $(document.body).css("overflow", "hidden");

    $navbar.addClass("navbar-retract-all");
    $navbarDropdown.addClass("navbar-retract-all");
    $searchDropdown.addClass("navbar-retract-all");
    /* $bodyGridContainer.addClass("body-grid-container-retract"); */
  }


  function newRecipeFinderSearchBlurred() {
    document.ontouchmove = function(event) {
      return true;
    }

    $(document.body).css("overflow", "auto");

    $navbar.removeClass("navbar-retract-all");
    $navbarDropdown.removeClass("navbar-retract-all");
    $searchDropdown.removeClass("navbar-retract-all");
    /* $bodyGridContainer.removeClass("body-grid-container-retract"); */
  }





/* ---------------------------- EVENT HANDLERS ---------------------------- */
  $newRecipeSearchBar.on("focus", function() {
    newRecipeFinderSearchFocused();
  });

  $newRecipeSearchBar.on("blur", function() {
    newRecipeFinderSearchBlurred();
  });


});
