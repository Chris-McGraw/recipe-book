$(document).ready(function() {

/* ------------------------- VARIABLE DECLARATIONS ------------------------- */
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
    /* case "pork":
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
      break; */
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


/* ---------------------------- EVENT HANDLERS ---------------------------- */
  populateTiles();





  $catAll.on("click", function() {
    if(currentCatActive !== "all" && delayPopulate === false) {
      currentCatActive = "all";
      categoryActive();
      clearTiles();

      delayPopulate = true;

      setTimeout(function() {
        delayPopulate = false;

        populateTiles();
      }, 200);
    }
  });

  $catBeef.on("click", function() {
    if(currentCatActive !== "beef" && delayPopulate === false) {
      currentCatActive = "beef";
      categoryActive();
      clearTiles();

      delayPopulate = true;

      setTimeout(function() {
        delayPopulate = false;

        populateTiles();
      }, 200);
    }
  });

  $catPork.on("click", function() {
    currentCatActive = "pork";
    categoryActive();
  });

  $catPoultry.on("click", function() {
    currentCatActive = "poultry";
    categoryActive();
  });

  $catSeafood.on("click", function() {
    currentCatActive = "seafood";
    categoryActive();
  });

  $catVeg.on("click", function() {
    currentCatActive = "vegetarian";
    categoryActive();
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
