/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function hideDisplayedRecipeScreen() {
  $recipeTitleContainer.hide();
  $ingredientContainer.hide();
  $imageContainer.hide();
  $recipeContainer.hide();
  $bottomOptionBar.hide();
  $bottomOptionBarBackground.hide();
}


function showDisplayedRecipeScreen() {
  currentScreen = "displayedRecipeScreen";

  // console.log("current screen = " + currentScreen);
  // console.log("");

  window.scrollTo(0, 0);

  $bodyGridContainer.css("grid-row-gap", "20px");
  $bodyGridContainer.css("top", "110px");
  $bodyGridContainer.css("padding-bottom", "40px");
  $bodyGridContainer.css("-webkit-user-select", "auto");
  $bodyGridContainer.css("user-select", "auto");

  $recipeTitleContainer.empty();

  $imageContainer.css("background-image", "none");

// Footer Position Adjustments Begin
  $copyrightFooter.css("top", "-82px");
  $copyrightFooter.css("height", "82px");

  if(navbarDropdownActive === true || searchDropdownActive === true) {
    removeContainerClasses();
    $mainContentContainer.addClass("main-content-container-expand-recipe");
  }
  else if(navbarDropdownActive === false && searchDropdownActive === false) {
    removeContainerClasses();
    $mainContentContainer.addClass("main-content-container-retract-recipe");
  }
// Footer Position Adjustments End

  $searchBar.attr("placeholder", "Search My Saved Recipes...");

  $ingredientListAll.empty();
  $ingredientListLeft.empty();
  $ingredientListRight.empty();
  $recipeStepList.empty();

  $recipeTitleContainer.show();
  $ingredientContainer.show();
  $imageContainer.show();
  $recipeContainer.show();
  $bottomOptionBar.show();
  $bottomOptionBarBackground.show();

  for(y = 0; y < currentRecipeList.length; y++) {
    if(currentRecipeID === currentRecipeList[y].id) {
      $recipeTitleContainer.html(currentRecipeList[y].name);

      if(currentRecipeList[y].img === "") {
        $imageContainer.css("background-image", "url(https://res.cloudinary.com/dtwyohvli/image/upload/v1571232456/recipe-book/icon-main.png)");

        $imageContainer.css("background-size", "20% auto");
        $imageContainer.css("background-repeat", "no-repeat");
      }
      else {
        $imageContainer.css("background-image", "url(" + "'" + currentRecipeList[y].img + "'" + ")");

        $imageContainer.css("background-size", "cover");
      }

      getIngredientList();

      getRecipeSteps();
    }
  }

  if(currentFontSize === "increased") {
    increaseFontSize();
  }
}


function getSelectedRecipeID() {
  var recipeNameDashed = currentLinkHash;
  var splitArray = recipeNameDashed.split("-");

  for(n = 0; n < splitArray.length; n++) {
    if(n >= 1) {
      splitArray[n] = splitArray[n].charAt(0).toUpperCase() + splitArray[n].slice(1);
    }
  }

  currentRecipeID = splitArray.join("");
}


function getIngredientList() {
  var ingredientListHalfFirst = Math.round(currentRecipeList[y].ingredients.length / 2);
  var ingredientListHalfLast = ingredientListHalfFirst;

  /* Get Ingredient List All */
  for(ingListCount = 0; ingListCount < currentRecipeList[y].ingredients.length; ingListCount++) {
    $ingredientListAll.append("<li class='ingredient-list-item'>- " + currentRecipeList[y].ingredients[ingListCount] + "</li>");
  }

  /* Get Ingredient List Left */
  for(ingListCount = 0; ingListCount < ingredientListHalfFirst; ingListCount++) {
    $ingredientListLeft.append("<li class='ingredient-list-item'>- " + currentRecipeList[y].ingredients[ingListCount] + "</li>");
  }

  /* Get Ingredient List Right */
  for(ingListCount2 = ingredientListHalfLast; ingListCount2 < currentRecipeList[y].ingredients.length; ingListCount2++) {
    $ingredientListRight.append("<li class='ingredient-list-item'>- " + currentRecipeList[y].ingredients[ingListCount2] + "</li>");
  }

  $ingredientListItem = $(".ingredient-list-item");
}


function getRecipeSteps() {
  for(recipeStepCount = 0; recipeStepCount < currentRecipeList[y].recipe.length; recipeStepCount++) {
    $recipeStepList.append("<li class='recipe-step'>" + ([recipeStepCount + 1] + ". ") + currentRecipeList[y].recipe[recipeStepCount] + "</li>");
  }

  $recipeStep = $(".recipe-step");

  $recipeStep.on("click", function() {
    if($(this).hasClass("recipe-step-line-through")) {
      $(this).removeClass("recipe-step-line-through");
      $(this).css("text-decoration", "none");
    }

    else {
      $(this).addClass("recipe-step-line-through");
      $(this).css("text-decoration", "line-through");
    }
  });
}


function increaseFontSize() {
  $bodyGridContainer.css("grid-row-gap", "24px");

  $recipeTitleContainer.css("font-size", "28px");
  $recipeTitleContainer.css("padding-bottom", "4px");

  $ingredientContainer.css("font-size", "18px");
  $ingredientTitle.css("font-size", "24px");
  $ingredientTitle.css("margin-bottom", "24px");
  $ingredientTitle.css("padding-bottom", "9px");

  $ingredientListItem.css("padding-bottom", "10px");

  $recipeContainer.css("font-size", "18px");
  $recipeTitle.css("font-size", "24px");
  $recipeTitle.css("margin-bottom", "24px");
  $recipeTitle.css("padding-bottom", "9px");

  $recipeStep.css("line-height", "24px");
  $recipeStep.css("padding-bottom", "24px");

  currentFontSize = "increased";
}


function decreaseFontSize() {
  $bodyGridContainer.css("grid-row-gap", "20px");

  $recipeTitleContainer.css("font-size", "24px");
  $recipeTitleContainer.css("padding-bottom", "0px");

  $ingredientContainer.css("font-size", "14px");
  $ingredientTitle.css("font-size", "20px");
  $ingredientTitle.css("margin-bottom", "20px");
  $ingredientTitle.css("padding-bottom", "5px");

  $ingredientListItem.css("padding-bottom", "6px");

  $recipeContainer.css("font-size", "14px");
  $recipeTitle.css("font-size", "20px");
  $recipeTitle.css("margin-bottom", "20px");
  $recipeTitle.css("padding-bottom", "5px");

  $recipeStep.css("line-height", "20px");
  $recipeStep.css("padding-bottom", "20px");

  currentFontSize = "default";
}


function toggleFontSize() {
  if(currentFontSize === "default") {
    increaseFontSize();
  }
  else if(currentFontSize === "increased") {
    decreaseFontSize();
  }
}


function toggleDeleteRecipeModal() {
  if(deleteRecipeModalActive === false) {
    if(navbarDropdownActive === true) {
      navbarDropdownToggle();
    }
    else if(searchDropdownActive === true) {
      searchDropdownToggle();
    }

    showBodyMask();
    showDeleteRecipeModal();
  }
  else {
    hideBodyMask();
    hideDeleteRecipeModal();
  }
}


function showDeleteRecipeModal() {
  deleteRecipeModalActive = true;

  $deleteRecipeModal.css("display", "block");

  var storedUserRecipeArray = JSON.parse( localStorage.getItem("userSavedRecipes") );

  for(i = 0; i < storedUserRecipeArray.length; i++) {
    if(storedUserRecipeArray[i].id === currentRecipeID) {
      $deleteRecipeNameSpan.html(storedUserRecipeArray[i].name);
    }
  }

  setTimeout(function() {
    $deleteRecipeModal.addClass("show-delete-recipe-modal");
  }, 0);
}


function hideDeleteRecipeModal() {
  deleteRecipeModalActive = false;
  bottomOptionBarClickCount = 0;

  $deleteRecipeModal.removeClass("show-delete-recipe-modal");

  setTimeout(function() {
    $deleteRecipeModal.css("display", "none");
  }, 300);
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {


  $backButton.on("click", function() {
    if(delayPopulate === false) {
      delayPopulate = true;

      screenTransitionFadeOut();

      setTimeout(function() {
        hideScreenAll();

        screenTransitionFadeIn();

        showSavedRecipeListScreen();

        document.getElementById("search-bar").value = userInputArchive;

        setTimeout(function() {
          delayPopulate = false;
          populateTiles();
        }, 200);
      }, 500);
    }
  });

  $fontSizeButton.on("click", function() {
    toggleFontSize();
  });

  $deleteRecipeIcon.on("click", function() {
    toggleDeleteRecipeModal();
  });

  $deleteRecipeConfirmButton.on("click", function() {
    var storedUserRecipeArray = JSON.parse( localStorage.getItem("userSavedRecipes") );

    for(i = 0; i < storedUserRecipeArray.length; i++) {
      if(storedUserRecipeArray[i].id === currentRecipeID) {
        console.log(storedUserRecipeArray);

        storedUserRecipeArray.splice(i, 1);
      }
    }

    console.log(storedUserRecipeArray);

    userSavedRecipes.length = 0;

    storedUserRecipeArray.forEach(function(object) {
      userSavedRecipes.push(object);
    });

    localStorage.setItem( "userSavedRecipes", JSON.stringify(userSavedRecipes) );




    recipeListMaster = recipeListMasterOrigin.slice(0);

    storedUserRecipeArray.forEach(function(object) {
      recipeListMaster.push(object);
    });

    recipeListMaster.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });

    clearRecipeLists();

    sortRecipeCategory();



    console.log(recipeListMaster);



    hideBodyMask();

    hideDeleteRecipeModal();

    screenTransitionFadeOut();

    setTimeout(function() {
      hideScreenAll();

      screenTransitionFadeIn();

      showSavedRecipeListScreen();

      setTimeout(function() {
        delayPopulate = false;
        populateTiles();
      }, 200);
    }, 500);
  });

// ---

  $deleteRecipeCloseIcon.on("click", function() {
    if(deleteRecipeModalActive === true) {
      hideBodyMask();

      hideDeleteRecipeModal();
    }
  });

  $deleteRecipeCancelButton.on("click", function() {
    if(deleteRecipeModalActive === true) {
      hideBodyMask();

      hideDeleteRecipeModal();
    }
  });

  $navbar.on("click", function() {
    if(deleteRecipeModalActive === true) {
      hideBodyMask();

      hideDeleteRecipeModal();
    }
  });

  $bodySearchMask.on("click", function() {
    if(deleteRecipeModalActive === true) {
      hideBodyMask();

      hideDeleteRecipeModal();
    }
  });

  $bottomOptionBar.on("click", function() {
    if(deleteRecipeModalActive === true) {
      bottomOptionBarClickCount++;

     if(bottomOptionBarClickCount > 1) {
       hideBodyMask();

       hideDeleteRecipeModal();
     }
    }
  });




});
