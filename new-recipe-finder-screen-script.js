$(document).ready(function() {

/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
  function newRecipeFinderSearchFocused() {
    $iosStatusBarBackground.css("position", "absolute");
    $navbar.css("position", "absolute");
    $navbarDropdown.css("position", "absolute");
    $searchDropdown.css("position", "absolute");

    window.scrollTo(0, 0);

    setTimeout(function() {
      $newRecipeSearchBar.focus();
    }, 0);

    document.ontouchmove = function(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    $(document.body).css("overflow", "hidden");

    $navbar.addClass("navbar-retract-all");
    $navbarDropdown.addClass("navbar-retract-all");
    $searchDropdown.addClass("navbar-retract-all");

    $bodyGridContainer.addClass("body-grid-container-retract");
  }


  function newRecipeFinderSearchBlurred() {
    document.ontouchmove = function(event) {
      return true;
    }

    $(document.body).css("overflow", "auto");

    $iosStatusBarBackground.css("position", "fixed");
    $navbar.css("position", "fixed");
    $navbarDropdown.css("position", "fixed");
    $searchDropdown.css("position", "fixed")

    $navbar.removeClass("navbar-retract-all");
    $navbarDropdown.removeClass("navbar-retract-all");
    $searchDropdown.removeClass("navbar-retract-all");

    $bodyGridContainer.removeClass("body-grid-container-retract");
  }





/* ---------------------------- EVENT HANDLERS ---------------------------- */
  $newRecipeSearchBar.on("focus", function() {
    newRecipeFinderSearchFocused();
  });

  $newRecipeSearchBar.on("blur", function() {
    newRecipeFinderSearchBlurred();
  });


});
