/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function hideNewRecipeListScreen() {
  $newRecipeListTitle.hide();
  $newRecipeSearchResultContainer.hide();
  $badgeCloneContainer.hide();

  if($edamamBadgeClone.length) {
    $edamamBadgeClone.remove();
  }
  if($edamamBadgeMaskClone.length) {
    $edamamBadgeMaskClone.remove();
  }

  $sortBySelectNewRecipe.hide();
}


function showNewRecipeListScreen() {
  currentScreen = "newRecipeListScreen";

  // console.log("current screen = " + currentScreen);
  // console.log("");

  window.scrollTo(0, 0);

  $bodyGridContainer.css("grid-row-gap", "80px");
  $bodyGridContainer.css("top", "70px");
  $bodyGridContainer.css("padding-bottom", "50px");
  $bodyGridContainer.css("-webkit-user-select", "none");
  $bodyGridContainer.css("user-select", "none");

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

  $searchBar.attr("placeholder", "Search For New Recipes...");
  document.getElementById("search-bar").value= "";

  $newRecipeListTitle.show();
  $newRecipeSearchResultContainer.show();
  $badgeCloneContainer.show();

  $edamamBadgeClone = $edamamBadge.clone();
  $edamamBadgeClone.appendTo($badgeCloneContainer);
  $edamamBadgeClone.css("top", "0px");
  $edamamBadgeClone.css("left", "0px");

  $edamamBadgeMaskClone = $edamamBadgeMask.clone();
  $edamamBadgeMaskClone.appendTo($edamamBadgeMaskCloneLink);
  $edamamBadgeMaskClone.css("top", "0px");
  $edamamBadgeMaskClone.css("left", "0px");

  $sortBySelectNewRecipe.show();
}


function toggleLoadSpinner() {
  $newRecipeSearchSpinner.show();

  setTimeout(function() {
    $newRecipeSearchSpinner.addClass("rotate-search-spinner");
  }, 200);
}


function removeLoadSpinner() {
  $newRecipeSearchSpinner.removeClass("rotate-search-spinner");
  $newRecipeSearchSpinner.hide();
  $newRecipeSearchSpinner.removeClass("fade-out-search-spinner");
}


function getNewRecipes() {
  var userInputTrimNewRecipes = "";

  if(recipeSearchNewOrigin === "searchBarSearchNew") {
    userInputTrimNewRecipes = $newRecipeSearchBar.val().toLowerCase().replace(/\s/g,"+");
  }
  else if(recipeSearchNewOrigin === "navbarSearchNew") {
    userInputTrimNewRecipes = newSearchResultArchiveNavbar;
  }

  recipeListMasterNew = [];

  $.get("https://api.edamam.com/search?q=" + userInputTrimNewRecipes +
  "&app_id=dfccee37&app_key=d26c5e336c0a0000719208cb86e67ca4&from=0&to=15").done(function(data) {
    if(data.hits.length > 0) {
      for(i = 0; i < data.to; i++) {
        recipeListMasterNew[i] = {};
        recipeListMasterNew[i].name = data.hits[i].recipe.label;
        recipeListMasterNew[i].img = data.hits[i].recipe.image;
        recipeListMasterNew[i].url = data.hits[i].recipe.url;

        recipeListMasterNew = recipeListMasterNew.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });
      }

      /* console.log(recipeListMasterNew); */

      $newRecipeSearchSpinner.addClass("fade-out-search-spinner");

      setTimeout(function() {
        removeLoadSpinner();

        if(currentScreen === "newRecipeListScreen") {
          populateTilesNewRecipes();
        }
      }, 200);
    }

    else {
      console.log("no results");
    }
  });
}


function populateTilesNewRecipes() {
  currentRecipeList = recipeListMasterNew;

  if(tileCount < currentRecipeList.length) {
    allowPopulate = true;

    $newTileHeader = $("<h3/>")
                     .attr("id", "tile-header-" + tileCount)
                     .addClass("tile-header");

    $newTileLink = $("<a/>")
                     .attr("id", "tile-link" + tileCount)
                     .attr("target", "_blank")
                     .addClass("tile-link");

    $newTile = $("<div/>")
                     .attr("id", "tile-" + tileCount)
                     .addClass("tile")
                     .html("<div></div>");

    $bodyGridContainer.append($newTileLink);
    $newTileLink.append($newTile);
    $newTile.append($newTileHeader);

    $newTileLink[tileCount] = $("#tile-link" + tileCount);
    $newTileLink[tileCount].attr("href", recipeListMasterNew[tileCount].url);

    $tile[tileCount] = $("#tile-" + tileCount);
    $tile[tileCount].css("background-image", "url(" + "'" + recipeListMasterNew[tileCount].img + "'" + ")");

    $tileHeader[tileCount] = $("#tile-header-" + tileCount);
    $tileHeader[tileCount].html(recipeListMasterNew[tileCount].name);

    setTimeout(function() {
      if(allowPopulate === true) {
        $tile[tileCount].addClass("tile-fade-in");

        tileCount++;
      }
    }, 100);

    setTimeout(function() {
      if(allowPopulate === true) {
        populateTilesNewRecipes();
      }
    }, 200);
  }
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {


  $sortBySelectNewRecipe.on("focus", function() {
    if(touchDevice === true) {
      document.ontouchmove = function(event) {
        event.preventDefault();
        event.stopPropagation();
      }

      setTimeout(function() {
        /* newRecipeFinderSearchFocused(); */

        window.scrollTo(0, 0);

        $(document.body).css("overflow", "hidden");

        $navbar.hide();
        $navbarDropdown.hide();
        $searchDropdown.hide();

        if(navbarDropdownActive === true || searchDropdownActive === true) {
          $bodyGridContainer.css("top", "-40px");
        }
        else if(navbarDropdownActive === false && searchDropdownActive === false) {
          $bodyGridContainer.css("top", "0px");
        }

        $bodySearchMask.removeClass("body-search-mask-retract");
        $bodySearchMask.addClass("body-search-mask-expand");

        $bodySearchMask.css("background-color", "rgba(0, 0, 0, 0.0)");
        $bodySearchMask.css("z-index", "10");

        $searchBar.attr("disabled", "disabled");
      }, 200);
    }
  });

  $sortBySelectNewRecipe.on("blur", function() {
    if(touchDevice === true) {
      /* newRecipeFinderSearchBlurred(); */

      document.ontouchmove = function(event) {
        return true;
      }

      $(document.body).css("overflow", "auto");

      $navbar.show();
      $navbarDropdown.show();
      $searchDropdown.show();

      $bodyGridContainer.css("top", "70px");

      $bodySearchMask.removeClass("body-search-mask-expand");
      $bodySearchMask.addClass("body-search-mask-retract");

      setTimeout(function() {
        $bodySearchMask.css("z-index", "-10");
        $bodySearchMask.css("background-color", "rgba(0, 0, 0, 0.8)");;
      }, 300);

      $searchBar.removeAttr("disabled");

      /* sortRecipeMaster(); */
    }
  });

  $sortBySelectNewRecipe.change(function() {
    if(touchDevice !== true) {
      /* sortRecipeMaster(); */
    }
  });


});
