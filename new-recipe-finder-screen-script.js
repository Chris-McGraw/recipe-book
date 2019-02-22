$(document).ready(function() {

/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
  function newRecipeFinderSearchFocused() {
    document.ontouchmove = function(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    $(document.body).css("overflow", "hidden");

    /* $navbar.css("position", "absolute");
    $navbarDropdown.css("position", "absolute");
    $searchDropdown.css("position", "absolute");

    $navbar.addClass("navbar-retract-all");
    $navbarDropdown.addClass("navbar-retract-all");
    $searchDropdown.addClass("navbar-retract-all");

    $navbar.css("top", "-70px");
    $navbarDropdown.css("top", "-110px");
    $searchDropdown.css("top", "-110px"); */

    $navbar.hide();
    $navbarDropdown.hide();
    $searchDropdown.hide();

    $newRecipeFinderTitle.css("color", "red");
    $bodyGridContainer.css("top", "-20px");

    /* $newRecipeFinderTitle.addClass("new-recipe-finder-screen-retract");
    $newRecipeFinderFormContainer.addClass("new-recipe-finder-screen-retract");

    $newRecipeSearchBar.addClass("new-recipe-finder-screen-retract"); */

    window.scrollTo(0, 0);
  }


  function newRecipeFinderSearchBlurred() {
    document.ontouchmove = function(event) {
      return true;
    }

    $(document.body).css("overflow", "auto");

    /* $navbar.css("position", "fixed");
    $navbarDropdown.css("position", "fixed");
    $searchDropdown.css("position", "fixed");

    $navbar.removeClass("navbar-retract-all");
    $navbarDropdown.removeClass("navbar-retract-all");
    $searchDropdown.removeClass("navbar-retract-all");

    $navbar.css("top", "0px");
    $navbarDropdown.css("top", "30px");
    $searchDropdown.css("top", "30px"); */

    $navbar.show();
    $navbarDropdown.show();
    $searchDropdown.show();

    $newRecipeFinderTitle.css("color", "white");
    $bodyGridContainer.css("top", "110px");

    /* $newRecipeFinderTitle.removeClass("new-recipe-finder-screen-retract");
    $newRecipeFinderFormContainer.removeClass("new-recipe-finder-screen-retract");

    $newRecipeSearchBar.removeClass("new-recipe-finder-screen-retract"); */
  }





/* ---------------------------- EVENT HANDLERS ---------------------------- */
  $newRecipeSearchBar.on("focus", function() {
    newRecipeFinderSearchFocused();
  });

  $newRecipeSearchBar.on("blur", function() {
    newRecipeFinderSearchBlurred();
  });


});
