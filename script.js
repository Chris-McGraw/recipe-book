$(document).ready(function() {

/* ------------------------- VARIABLE DECLARATIONS ------------------------- */
  var $hamburgerMenu = $("#hamburger-menu");
  var $navbarDropdown = $("#navbar-dropdown");
  var navbarDropdownActive = false;
  var delayDropdown = false;

  var $searchIcon = $("#search-icon");
  var $searchDropdown = $("#search-dropdown");
  var searchDropdownActive = false;

  var $bodyGridContainer = $("#body-grid-container");

  var $categoryItem = $(".category-item");

  var $catAll = $("#cat-all");
  var $catBeef = $("#cat-beef");
  var $catPork = $("#cat-pork");
  var $catPoultry = $("#cat-poultry");
  var $catSeafood = $("#cat-seafood");
  var $catVeg = $("#cat-veg");

  var currentCatActive = "all";

  var $tile = [];
  var $tileHeader = [];
  var tileCount = 0;

  var allowPopulate = true;
  var delayPopulate = false;


/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function clearTiles() {
  allowPopulate = false;

  var $currentTiles = $(".tile");

  $currentTiles.remove();

  tileCount = 0;
  $tile.length = 0;
  $tileHeader.length = 0;
}


function populateTiles() {
  switch(currentCatActive) {
    case "all":
      var currentRecipeList = recipeListMaster
      break;
    case "beef":
      var currentRecipeList = recipeListBeef;
      break;
    case "pork":
      var currentRecipeList = recipeListPork;
      break;
    case "poultry":
      var currentRecipeList = recipeListPoultry;
      break;
    case "seafood":
      var currentRecipeList = recipeListSeafood;
      break;
    case "vegetarian":
      var currentRecipeList = recipeListVegetarian;
      break;
    default:
      var currentRecipeList = recipeListMaster
  }

  if(tileCount < currentRecipeList.length) {
    allowPopulate = true;

    $newTileHeader = $("<h3/>")
                     .attr("id", "tile-header-" + tileCount)
                     .addClass("tile-header");

    $newTile = $("<div/>")
                     .attr("id", "tile-" + tileCount)
                     .addClass("tile")
                     .html("<div></div>");

    $bodyGridContainer.append($newTile);
    $newTile.append($newTileHeader);

    $tile[tileCount] = $("#tile-" + tileCount);
    $tile[tileCount].css("background-image", "url(" + "'" + currentRecipeList[tileCount].img + "'" + ")");

    $tileHeader[tileCount] = $("#tile-header-" + tileCount);
    $tileHeader[tileCount].html(currentRecipeList[tileCount].name);

    setTimeout(function() {
      if(allowPopulate === true) {
        $tile[tileCount].addClass("tile-fade-in");

        tileCount++;
      }
    }, 100);

    setTimeout(function() {
      if(allowPopulate === true) {
        populateTiles();
      }
    }, 200);
  }
}


function navbarDropdownToggle() {
  delayDropdown = true;

  if(navbarDropdownActive === false) {
    $navbarDropdown.removeClass("dropdown-retract");
    $bodyGridContainer.removeClass("dropdown-retract");

    $navbarDropdown.addClass("dropdown-expand");
    $bodyGridContainer.addClass("dropdown-expand");

    navbarDropdownActive = true;
  }

  else if(navbarDropdownActive === true) {
    $navbarDropdown.removeClass("dropdown-expand");
    $bodyGridContainer.removeClass("dropdown-expand");

    $navbarDropdown.addClass("dropdown-retract");
    $bodyGridContainer.addClass("dropdown-retract-body");

    navbarDropdownActive = false;
  }

  setTimeout(function() {
    delayDropdown = false;
  }, 100);
}


function searchDropdownToggle() {
  delayDropdown = true;

  if(searchDropdownActive === false) {
    $searchDropdown.removeClass("dropdown-retract");
    $bodyGridContainer.removeClass("dropdown-retract");

    $searchDropdown.addClass("dropdown-expand");
    $bodyGridContainer.addClass("dropdown-expand");

    searchDropdownActive = true;
  }

  else if(searchDropdownActive === true) {
    $searchDropdown.removeClass("dropdown-expand");
    $bodyGridContainer.removeClass("dropdown-expand");

    $searchDropdown.addClass("dropdown-retract");
    $bodyGridContainer.addClass("dropdown-retract-body");

    searchDropdownActive = false;
  }

  setTimeout(function() {
    delayDropdown = false;
  }, 100);
}


function categoryActive() {
  switch(currentCatActive) {
    case "all":
      $categoryItem.removeClass("category-active");
      $catAll.addClass("category-active");
      break;
    case "beef":
      $categoryItem.removeClass("category-active");
      $catBeef.addClass("category-active");
      break;
    case "pork":
      $categoryItem.removeClass("category-active");
      $catPork.addClass("category-active");
      break;
    case "poultry":
      $categoryItem.removeClass("category-active");
      $catPoultry.addClass("category-active");
      break;
    case "seafood":
      $categoryItem.removeClass("category-active");
      $catSeafood.addClass("category-active");
      break;
    case "vegetarian":
      $categoryItem.removeClass("category-active");
      $catVeg.addClass("category-active");
      break;
    default:
      $categoryItem.removeClass("category-active");
      $catAll.addClass("category-active");
  }
}


function categoryClick() {
  categoryActive();
  clearTiles();

  delayPopulate = true;

  setTimeout(function() {
    delayPopulate = false;
    populateTiles();
  }, 200);
}


/* ---------------------------- EVENT HANDLERS ---------------------------- */
  populateTiles();





  $hamburgerMenu.on("click", function() {
    if(delayDropdown === false) {
      navbarDropdownToggle();
    }
  });

  $searchIcon.on("click", function() {
    if(delayDropdown === false) {
      searchDropdownToggle();
    }
  });





  $catAll.on("click", function() {
    if(currentCatActive !== "all" && delayPopulate === false) {
      currentCatActive = "all";
      categoryClick();
    }
  });

  $catBeef.on("click", function() {
    if(currentCatActive !== "beef" && delayPopulate === false) {
      currentCatActive = "beef";
      categoryClick();
    }
  });

  $catPork.on("click", function() {
    if(currentCatActive !== "pork" && delayPopulate === false) {
      currentCatActive = "pork";
      categoryClick();
    }
  });

  $catPoultry.on("click", function() {
    if(currentCatActive !== "poultry" && delayPopulate === false) {
      currentCatActive = "poultry";
      categoryClick();
    }
  });

  $catSeafood.on("click", function() {
    if(currentCatActive !== "seafood" && delayPopulate === false) {
      currentCatActive = "seafood";
      categoryClick();
    }
  });

  $catVeg.on("click", function() {
    if(currentCatActive !== "vegetarian" && delayPopulate === false) {
      currentCatActive = "vegetarian";
      categoryClick();
    }
  });





  /* $tile[0].on("click", function() {
    console.log("scope test 0");
  });

  setTimeout(function() {
    $tile[1].on("click", function() {
      console.log("scope test 1");
    });
  }, 200); */


});
