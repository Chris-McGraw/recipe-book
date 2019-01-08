$(document).ready(function() {

/* ------------------------- VARIABLE DECLARATIONS ------------------------- */
  var $searchBar = $("#search-bar");
  var $searchIconDropdown = $("#search-icon-dropdown");
  var recipeListSearch = [];
  var allowLocalSearch = true;
  var $searchResultNone = $("#search-result-none");

  var $categoryItem = $(".category-item");

  var $catAll = $("#cat-all");
  var $catBeef = $("#cat-beef");
  var $catPork = $("#cat-pork");
  var $catPoultry = $("#cat-poultry");
  var $catSeafood = $("#cat-seafood");
  var $catVeg = $("#cat-veg");

  var currentCatActive = "all";

  var $tile = [];
  var $tileLink = [];
  var $tileHeader = [];
  var tileCount = 0;

  var allowPopulate = true;
  var delayPopulate = false;





/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function clearTiles() {
  allowPopulate = false;

  var $currentTiles = $(".tile");
  var $currentTileLinks = $(".tile-link");

  $currentTiles.remove();
  $currentTileLinks.remove();

  tileCount = 0;
  $tile.length = 0;
  $tileLink.length = 0;
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
    case "search":
      var currentRecipeList = recipeListSearch;
      break;
    default:
      var currentRecipeList = recipeListMaster;
  }

  if(tileCount < currentRecipeList.length) {
    allowPopulate = true;

    $newTileLink = $("<a/>")
                     .attr("id", "tile-link-" + tileCount)
                     /* .attr("target", "_blank") */
                     .addClass("tile-link");

    $newTileHeader = $("<h3/>")
                     .attr("id", "tile-header-" + tileCount)
                     .addClass("tile-header");

    $newTile = $("<div/>")
                     .attr("id", "tile-" + tileCount)
                     .addClass("tile")
                     .html("<div></div>");

    $bodyGridContainer.append($newTileLink);
    $newTileLink.append($newTile);
    $newTile.append($newTileHeader);

    $tile[tileCount] = $("#tile-" + tileCount);
    $tile[tileCount].css("background-image", "url(" + "'" + currentRecipeList[tileCount].img + "'" + ")");

    $tileLink[tileCount] = $("#tile-link-" + tileCount);
    $tileLink[tileCount].attr("href", currentRecipeList[tileCount].link);

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


function clearSearch() {
  $categoryItem.removeClass("category-active");
  currentCatActive = "search";

  $searchResultNone.remove();
}


function searchSavedRecipes() {
  allowLocalSearch = false;

  recipeListSearch = [];

  recipeListMaster.forEach(function(element) {
    element.tags.forEach(function(entry) {
      if(entry == $searchBar.val().toLowerCase()) {
        recipeListSearch.push(element);
      }
    });
  });

  if(recipeListSearch.length !== 0) {
    clearSearch();

    clearTiles();

    populateTiles();
  }

  else if(recipeListSearch.length === 0) {
    clearSearch();

    clearTiles();

    $searchResultNone = $("<div>No Results Found</div>")
                     .attr("id", "search-result-none")

    $bodyGridContainer.append($searchResultNone);

    setTimeout(function() {
      $searchResultNone.addClass("search-fade-in");
    }, 0);

  }

  setTimeout(function() {
    allowLocalSearch = true;
  }, 1000);
}


function categoryActive() {
  document.getElementById("search-bar").value= "";
  $searchResultNone.remove();

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
  sortRecipeCategory();

  populateTiles();





  $searchIconDropdown.on("click", function() {
    if(allowLocalSearch === true && $searchBar.val() !== "") {
      searchSavedRecipes();
    }
  });

  $(document).keydown(function(event) {
  /* ----- Enter Key Press ----- */
    if(event.which === 13 && allowLocalSearch === true && $searchBar.val() !== "") {
      searchSavedRecipes();
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


});
