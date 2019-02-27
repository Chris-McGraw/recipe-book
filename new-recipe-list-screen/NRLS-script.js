/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function hideNewRecipeListScreen() {
  $newRecipeListTitle.hide();
}


function showNewRecipeListScreen() {
  currentScreen = "newRecipeListScreen";

  // console.log("current screen = " + currentScreen);
  // console.log("");

  window.scrollTo(0, 0);

  $bodyGridContainer.css("grid-row-gap", "80px");
  $bodyGridContainer.css("top", "110px");
  $bodyGridContainer.css("padding-bottom", "60px");
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
}


function getNewRecipes() {
  var userInputTrimNewRecipes = $newRecipeSearchBar.val().toLowerCase().replace(/\s/g,"+");

  /* console.log(userInputTrimNewRecipes);
  console.log(""); */

  $.get("https://api.edamam.com/search?q=" + userInputTrimNewRecipes + "&app_id=dfccee37&app_key=d26c5e336c0a0000719208cb86e67ca4&from=0&to=5", function(data) {
    if(data.hits.length > 0) {
      for(i = 0; i < data.to; i++) {
        console.log(data.hits[i].recipe.label)

        console.log("");
      }
    }

    else {
      console.log("no results");
    }
  });
}
