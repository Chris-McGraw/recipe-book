$(document).ready(function() {

/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
  function newRecipeFinderSearchFocused() {
    window.scrollTo(0, 0);

    document.ontouchmove = function(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    $(document.body).css("overflow", "hidden");

    $navbar.hide();
    $navbarDropdown.hide();
    $searchDropdown.hide();

    $bodyGridContainer.css("top", "-20px");

    $newRecipeFinderTitle.css("color", "red");
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





/* ---------------------------- EVENT HANDLERS ---------------------------- */
  $newRecipeSearchBar.on("focus", function() {
    setTimeout(function() {
      newRecipeFinderSearchFocused();
    }, 200);
  });

  $newRecipeSearchBar.on("blur", function() {
    newRecipeFinderSearchBlurred();
  });


});
