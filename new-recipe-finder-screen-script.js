$(document).ready(function() {

/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
  function newRecipeFinderSearchFocused() {
    document.ontouchmove = function(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    $(document.body).css("overflow", "hidden");

    $navbar.hide();
    $navbarDropdown.hide();
    $searchDropdown.hide();

    $bodyGridContainer.css("top", "-20px");
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
    newRecipeFinderSearchFocused();

    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 200);
  });

  $newRecipeSearchBar.on("blur", function() {
    newRecipeFinderSearchBlurred();
  });


});
