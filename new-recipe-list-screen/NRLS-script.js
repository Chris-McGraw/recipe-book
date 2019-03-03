/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function hideNewRecipeListScreen() {
  $newRecipeListTitle.hide();
  $newRecipeSearchTermContainer.hide();
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

  $newRecipeListTitle.show();
  $newRecipeSearchTermContainer.show();
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


function getNewRecipes() {
  var userInputTrimNewRecipes = $newRecipeSearchBar.val().toLowerCase().replace(/\s/g,"+");

  recipeListNew = [];
  recipeListNewImg = [];
  recipeListNewLink = [];

  $.get("https://api.edamam.com/search?q=" + userInputTrimNewRecipes +
  "&app_id=dfccee37&app_key=d26c5e336c0a0000719208cb86e67ca4&from=0&to=15").done(function(data) {
    if(data.hits.length > 0) {
      for(i = 0; i < data.to; i++) {
        recipeListNew.push(data.hits[i].recipe.label);
        recipeListNewImg.push(data.hits[i].recipe.image);
        recipeListNewLink.push(data.hits[i].recipe.url);
      }

      console.log(recipeListNew);

      populateTilesNewRecipes();
    }

    else {
      console.log("no results");
    }
  });
}


function populateTilesNewRecipes() {
  /* console.log(tileCount); */

  currentRecipeList = recipeListNew;

  /* console.log(currentRecipeList.length);
  console.log(recipeListNew.length); */

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
    $newTileLink[tileCount].attr("href", recipeListNewLink[tileCount]);

    $tile[tileCount] = $("#tile-" + tileCount);
    $tile[tileCount].css("background-image", "url(" + "'" + recipeListNewImg[tileCount] + "'" + ")");

    $tileHeader[tileCount] = $("#tile-header-" + tileCount);
    $tileHeader[tileCount].html(currentRecipeList[tileCount]);

    /* $newTile.on("click", function() {
    }); */

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
