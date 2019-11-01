/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function showAddRecipeForm() {
  addRecipeFormActive = true;

  $addRecipeForm.css("display", "block");

  setTimeout(function() {
    $addRecipeForm.addClass("show-add-recipe-form");
  }, 0);
}


function hideAddRecipeForm() {
  addRecipeFormActive = false;

  $addRecipeForm.removeClass("show-add-recipe-form");

  setTimeout(function() {
    $addRecipeForm.css("display", "none");
  }, 300);
}


function customRecipe(id, name, hash, cat, img, tags, ings, recipe) {
  this.id = idUserInput(id);
  this.name = name.charAt(0).toUpperCase() + name.slice(1);
  this.hash = hashUserInput(hash);
  this.category = cat;
  this.img = img;
  this.tags = tagUserInput(tags);
  this.ingredients = ingredientUserInput(ings);
  this.recipe = recipeStepUserInput(recipe);
}


function idUserInput(input) {
  var splitArray = input.toLowerCase().split(" ");

  for(n = 0; n < splitArray.length; n++) {
    if(n >= 1) {
      splitArray[n] = splitArray[n].charAt(0).toUpperCase() + splitArray[n].slice(1);
    }
  }

  return splitArray.join("");
}


function hashUserInput(input) {
  var splitArray = input.toLowerCase().split(" ");

  return splitArray.join("-");
}


function tagUserInput(input) {
  var splitArray = input.toLowerCase().split(",");

  for(i = 0; i < splitArray.length; i++) {
    splitArray[i] = splitArray[i].trim();
  }

  return splitArray.filter(function(item) {
    return item != "";
  });
}


function ingredientUserInput(input) {
  var splitArray = input.toLowerCase().split(",");

  for(i = 0; i < splitArray.length; i++) {
    splitArray[i] = splitArray[i].trim();
  }

  return splitArray.filter(function(item) {
    return item != "";
  });
}


function recipeStepUserInput(input) {
  var splitArray = input.split(",");

  for(i = 0; i < splitArray.length; i++) {
    splitArray[i] =  splitArray[i].trim().charAt(0).toUpperCase() + splitArray[i].trim().slice(1);
  }

  return splitArray.filter(function(item) {
    return item != "";
  });
}


function checkInputRegEx(input) {
  inputVal = input.val().replace(/\s+/g, "").trim();

  if( /[^a-zA-Z0-9\\,]/.test(inputVal) ) {
    input.css("background-image", "url(https://res.cloudinary.com/dtwyohvli/image/upload/v1572454320/recipe-book/exclamation-triangle-red.png)");

    switch( input.attr("id") ) {
      case "name-input":
        $recipeNameErrorMessage.html("Please enter a valid recipe name.");
        $recipeNameErrorMessage.css("display", "block");
        break;
      case "tag-input":
        $searchTagErrorMessage.css("display", "block");
        break;
      case "ingredient-input":
        $ingredientErrorMessage.css("display", "block");
        break;
      case "recipe-step-input":
        $recipeStepErrorMessage.css("display", "block");
        break;
    }
  }
  else {
    input.css("background-image", "none");

    switch( input.attr("id") ) {
      case "name-input":
        $recipeNameErrorMessage.css("display", "none");
        break;
      case "tag-input":
        $searchTagErrorMessage.css("display", "none");
        break;
      case "ingredient-input":
        $ingredientErrorMessage.css("display", "none");
        break;
      case "recipe-step-input":
        $recipeStepErrorMessage.css("display", "none");
        break;
    }
  }
}


function validateAddRecipeInput(input) {
  inputVal = input.val().replace(/\s+/g, "").trim();

  if(/[^a-zA-Z0-9\\,]/.test(inputVal) === false && inputVal != "") {
    input.css("background-image", "none");

    switch( input.attr("id") ) {
      case "name-input":
        validNameInput = true;
        $recipeNameErrorMessage.css("display", "none");
        break;
      case "tag-input":
        validTagInput = true;
        $searchTagErrorMessage.css("display", "none");
        break;
      case "ingredient-input":
        validIngredientInput = true;
        $ingredientErrorMessage.css("display", "none");
        break;
      case "recipe-step-input":
        validRecipeStepInput = true;
        $recipeStepErrorMessage.css("display", "none");
        break;
    }
  }
  else {
    input.css("background-image", "url(https://res.cloudinary.com/dtwyohvli/image/upload/v1572454320/recipe-book/exclamation-triangle-red.png)");

    switch( input.attr("id") ) {
      case "name-input":
        validNameInput = false;
        $recipeNameErrorMessage.html("Please enter a valid recipe name.");
        $recipeNameErrorMessage.css("display", "block");
        break;
      case "tag-input":
        validTagInput = false;
        $searchTagErrorMessage.css("display", "block");
        break;
      case "ingredient-input":
        validIngredientInput = false;
        $ingredientErrorMessage.css("display", "block");
        break;
      case "recipe-step-input":
        validRecipeStepInput = false;
        $recipeStepErrorMessage.css("display", "block");
        break;
    }
  }
}


function validateAddRecipeForm() {
  validateAddRecipeInput($nameInput);
  validateAddRecipeInput($tagInput);
  validateAddRecipeInput($ingredientInput);
  validateAddRecipeInput($recipeStepInput);

  if(validNameInput === true && validTagInput === true
  && validIngredientInput === true && validRecipeStepInput === true) {
    addRecipeFormValid = true;
  }
  else {
    addRecipeFormValid = false;
  }
}


function preventDuplicateRecipeID(val) {
  var newRecipeId = idUserInput(val);
  var duplicateFound = false;

  for(i = 0; i < recipeListMaster.length; i++) {
    if(newRecipeId === recipeListMaster[i].id) {
      duplicateFound = true;
    }
  }

  if(duplicateFound === true) {
    addRecipeFormValid = false;

    $nameInput.css("background-image", "url(https://res.cloudinary.com/dtwyohvli/image/upload/v1572454320/recipe-book/exclamation-triangle-red.png)");

    $recipeNameErrorMessage.html("This recipe name is already taken.");
    $recipeNameErrorMessage.css("display", "block");
  }
}


function submitAddRecipeForm(name, category, tags, ingredients, recipe) {
  var userRecipeObject = new customRecipe(name, name, name, category, "", tags, ingredients, recipe);
  console.log(userRecipeObject);

  setLocalStorage(userRecipeObject);
  getLocalStorage();

  $addRecipeForm[0].reset();
  $addRecipeFormGrid.scrollTop( 0 );

  clearRecipeLists();
  clearTiles();

  recipeListMaster.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

  sortRecipeCategory();
  populateTiles();
}


function setLocalStorage(data) {
  if(localStorage.length === 0) {
    userSavedRecipes = recipeListMaster;
  }
  else {
    userSavedRecipes.length = 0;

    var archivedUserRecipeArray = JSON.parse( localStorage.getItem("userSavedRecipes") );

    archivedUserRecipeArray.forEach(function(object) {
      userSavedRecipes.push(object);
    });
  }

  userSavedRecipes.push(data);

  localStorage.setItem( "userSavedRecipes", JSON.stringify(userSavedRecipes) );
}


function getLocalStorage() {
  var storedUserRecipeArray = JSON.parse( localStorage.getItem("userSavedRecipes") );
  recipeListMaster.length = 0;

  storedUserRecipeArray.forEach(function(object) {
    recipeListMaster.push(object);
  });
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {

  $(document).keydown(function(event) {
  /* ----- Escape Key Press ----- */
    if(event.which === 27) {
      localStorage.clear();

      console.log("local storage cleared");
    }
  });





  $addRecipeTile.on("click", function(event) {
    event.preventDefault();

    window.scrollTo(0, 0);

    if(navbarDropdownActive === true) {
      navbarDropdownToggle();
    }
    else if(searchDropdownActive === true) {
      searchDropdownToggle();
    }

    showBodyMask();

    showAddRecipeForm();
  });

  document.getElementById("add-recipe-form-grid").ontouchstart = function() {
    if(addRecipeFormInputFocused === false) {
      document.ontouchmove = function(event) {
        return true;
      }
    }
  }

  $addRecipeFormInput.on("focus", function(event) {
    if(touchDevice === true) {
      addRecipeFormInputFocused = true;

      setTimeout(function() {
        $navbar.hide();
        $navbarDropdown.hide();
        $searchDropdown.hide();

        window.scrollTo(0, 0);

        $bodyGridContainer.css("top", "10px");
        $addRecipeForm.css("top", "30px");
      }, 200);

      var formTopOffset = $addRecipeFormGrid.scrollTop() + $nameInput.parent().offset().top;
      var formScrollTo = ($addRecipeFormGrid.scrollTop() + $(this).parent().offset().top) - formTopOffset;

      $addRecipeFormTouchSpacer.css("display", "block");
      document.getElementById("add-recipe-form-grid").scroll(0, formScrollTo);
    }
  });

// ---

  document.getElementById("add-recipe-form-grid").ontouchend = function() {
    window.scrollTo(0, 0);

    document.ontouchmove = function(event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  document.getElementById("body-search-mask").ontouchend = function() {
    if(addRecipeFormActive === true) {
      window.scrollTo(0, 0);
    }
  }

  $addRecipeFormInput.on("blur", function(event) {
    if(touchDevice === true) {
      addRecipeFormInputFocused = false;

      $navbar.show();
      $navbarDropdown.show();
      $searchDropdown.show();

      window.scrollTo(0, 0);

      $bodyGridContainer.css("top", "80px");
      $addRecipeForm.css("top", "100px");

      $addRecipeFormTouchSpacer.css("display", "none");
    }

    checkInputRegEx( $(this) );

    preventDuplicateRecipeID( $nameInput.val().replace(/\s+/g, " ").trim() );
  });

  $addRecipeCloseIcon.on("click", function() {
    if(addRecipeFormActive === true) {
      hideBodyMask();

      hideAddRecipeForm();
    }
  });

  $bodySearchMask.on("click", function() {
    if(addRecipeFormActive === true) {
      hideBodyMask();

      hideAddRecipeForm();
    }
  });

  $navbar.on("click", function() {
    if(addRecipeFormActive === true) {
      hideBodyMask();

      hideAddRecipeForm();
    }
  });

  $searchDropdown.on("click", function() {
    if(addRecipeFormActive === true) {
      hideBodyMask();

      hideAddRecipeForm();
    }
  });





  $addRecipeSubmit.on("click", function() {
    var nameInput = $nameInput.val().replace(/\s+/g, " ").trim();
    var categoryInput = $("input[name=category]:checked").val();
    var tagInput = $tagInput.val().replace(/\s+/g, " ").trim();
    var ingredientInput = $ingredientInput.val().replace(/\s+/g, " ").trim();
    var recipeStepInput = $recipeStepInput.val().replace(/\s+/g, " ").trim();

    validateAddRecipeForm();

    preventDuplicateRecipeID(nameInput);

    if(addRecipeFormValid === true) {
      hideBodyMask();

      hideAddRecipeForm();

      submitAddRecipeForm(nameInput, categoryInput, tagInput, ingredientInput, recipeStepInput);
    }
    else {
      console.log("Invalid Form");
      console.log("");
    }
  });


});
