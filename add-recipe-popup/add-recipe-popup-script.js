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
  var inputVal = input.val().replace(/\s+/g, "").trim();

  if( /[^a-zA-Z0-9\\,]/.test(inputVal) ) {
    input.css("background-image", "url(https://res.cloudinary.com/dtwyohvli/image/upload/v1572454320/recipe-book/exclamation-triangle-red.png)");

    switch( input.attr("id") ) {
      case "name-input":
        validNameInputRegEx = false;
        $recipeNameErrorMessage.html("Recipe names cannot contain special characters.");
        $recipeNameErrorMessage.css("display", "block");
        break;
      case "tag-input":
        validTagInputRegEx = false;
        $searchTagErrorMessage.html("Search tags cannot contain special characters.");
        $searchTagErrorMessage.css("display", "block");
        break;
      case "ingredient-input":
        validIngredientInputRegEx = false;
        $ingredientErrorMessage.html("Ingredients cannot contain special characters.");
        $ingredientErrorMessage.css("display", "block");
        break;
      case "recipe-step-input":
        validRecipeStepInputRegEx = false;
        $recipeStepErrorMessage.html("Recipe Steps cannot contain special characters.");
        $recipeStepErrorMessage.css("display", "block");
        break;
    }
  }
  else {
    switch( input.attr("id") ) {
      case "name-input":
        validNameInputRegEx = true;
        break;
      case "tag-input":
        validTagInputRegEx = true;
        break;
      case "ingredient-input":
        validIngredientInputRegEx = true;
        break;
      case "recipe-step-input":
        validRecipeStepInputRegEx = true;
        break;
    }
  }
}


function checkBlankInput(input) {
  var inputVal = input.val().replace(/\s+/g, "").trim();

  if(inputVal != "") {
    switch( input.attr("id") ) {
      case "name-input":
        validNameInputBlank = true;
        break;
      case "tag-input":
        validTagInputBlank = true;
        break;
      case "ingredient-input":
        validIngredientInputBlank = true;
        break;
      case "recipe-step-input":
        validRecipeStepInputBlank = true;
        break;
    }
  }
  else {
    input.css("background-image", "url(https://res.cloudinary.com/dtwyohvli/image/upload/v1572454320/recipe-book/exclamation-triangle-red.png)");

    switch( input.attr("id") ) {
      case "name-input":
        validNameInputBlank = false;
        $recipeNameErrorMessage.html("Please enter a valid recipe name.");
        $recipeNameErrorMessage.css("display", "block");
        break;
      case "tag-input":
        validTagInputBlank = false;
        $searchTagErrorMessage.html("Please enter at least one valid search tag.");
        $searchTagErrorMessage.css("display", "block");
        break;
      case "ingredient-input":
        validIngredientInputBlank = false;
        $ingredientErrorMessage.html("Please enter at least one valid recipe ingredient.");
        $ingredientErrorMessage.css("display", "block");
        break;
      case "recipe-step-input":
        validRecipeStepInputBlank = false;
        $recipeStepErrorMessage.html("Please enter at least one valid recipe step.");
        $recipeStepErrorMessage.css("display", "block");
        break;
    }
  }
}


function validateAddRecipeInput(input) {
  checkBlankInput(input);
  checkInputRegEx(input);

  switch( input.attr("id") ) {
    case "name-input":
      if(validNameInputRegEx === true && validNameInputBlank === true) {
        validNameInput = true;

        input.css("background-image", "none");
        $recipeNameErrorMessage.css("display", "none");
      }
      else {
        validNameInput = false;
      }
      break;
    case "tag-input":
      if(validTagInputRegEx === true && validTagInputBlank === true) {
        validTagInput = true;

        input.css("background-image", "none");
        $searchTagErrorMessage.css("display", "none");
      }
      else {
        validTagInput = false;
      }
      break;
    case "ingredient-input":
      if(validIngredientInputRegEx === true && validIngredientInputBlank === true) {
        validIngredientInput = true;

        input.css("background-image", "none");
        $ingredientErrorMessage.css("display", "none");
      }
      else {
        validIngredientInput = false;
      }
      break;
    case "recipe-step-input":
      if(validRecipeStepInputRegEx === true && validRecipeStepInputBlank === true) {
        validRecipeStepInput = true;

        input.css("background-image", "none");
        $recipeStepErrorMessage.css("display", "none");
      }
      else {
        validRecipeStepInput = false;
      }
      break;
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


function limitMaxInputValues(val) {
  var splitArray = val.toLowerCase().split(",");

  for(i = 0; i < splitArray.length; i++) {
    splitArray[i] = splitArray[i].trim();
  }

  var newArray = splitArray.filter(function(item) {
    return item != "";
  });

  if(newArray.length > 5) {
    addRecipeFormValid = false;

    $tagInput.css("background-image", "url(https://res.cloudinary.com/dtwyohvli/image/upload/v1572454320/recipe-book/exclamation-triangle-red.png)");

    $searchTagErrorMessage.html("Please do not enter more than five search tags.");
    $searchTagErrorMessage.css("display", "block");
  }
}


function scrollFormToError() {
  if($nameInput.css("background-image") != "none") {
    $addRecipeFormGrid.scrollTop(0);
  }
  else if($tagInput.css("background-image") != "none") {
    $addRecipeFormGrid.scrollTop($tagInput.offset().top);
  }
  else if($ingredientInput.css("background-image") != "none") {
    $addRecipeFormGrid.scrollTop($ingredientInput.offset().top);
  }
  else if($recipeStepInput.css("background-image") != "none") {
    $addRecipeFormGrid.scrollTop($recipeStepInput.offset().top);
  }
}


function submitAddRecipeForm(name, category, tags, ingredients, recipe) {
  var userRecipeObject = new customRecipe(name, name, name, category, "", tags, ingredients, recipe);
  console.log(userRecipeObject);

  setLocalStorage(userRecipeObject);
  getLocalStorage();

  $addRecipeForm[0].reset();
  $addRecipeFormGrid.scrollTop(0);

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

  /* $(document).keydown(function(event) {
  // ----- Escape Key Press -----
    if(event.which === 27) {
      localStorage.clear();

      console.log("local storage cleared");
    }
  }); */





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

  // Check for Blank Input or Visible Error Icon
    if($(this).val().length !== 0 || $(this).css("background-image") !== "none") {
      validateAddRecipeInput( $(this) );
    }

  // Check for Duplicate Recipe Names
    if($(this).attr("id") === "name-input") {
      preventDuplicateRecipeID( $nameInput.val().replace(/\s+/g, " ").trim() );
    }
  // Check for Maximum Number of Search Tags
    else if($(this).attr("id") === "tag-input") {
      limitMaxInputValues( $tagInput.val().replace(/\s+/g, " ").trim() );
    }
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

// ---

  addButtonMouseTouchEvents($addRecipeSubmit);

  $addRecipeSubmit.on("click", function() {
    var nameInput = $nameInput.val().replace(/\s+/g, " ").trim();
    var categoryInput = $("input[name=category]:checked").val();
    var tagInput = $tagInput.val().replace(/\s+/g, " ").trim();
    var ingredientInput = $ingredientInput.val().replace(/\s+/g, " ").trim();
    var recipeStepInput = $recipeStepInput.val().replace(/\s+/g, " ").trim();

    validateAddRecipeForm();
    preventDuplicateRecipeID(nameInput);
    limitMaxInputValues(tagInput);

    scrollFormToError();

    if(addRecipeFormValid === true) {
      hideBodyMask();
      hideAddRecipeForm();

      submitAddRecipeForm(nameInput, categoryInput, tagInput, ingredientInput, recipeStepInput);
    }
    else {
      console.log("Invalid Form");
    }
  });


});
