/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {

  $(document).keydown(function(event) {
  /* ----- 3 Num Key Press ----- */
    if(event.which === 51) {
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

// ---

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
    hideBodyMask();

    hideAddRecipeForm();

    submitAddRecipeForm();
  });


});
