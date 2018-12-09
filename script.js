$(document).ready(function() {

/* ------------------------- VARIABLE DECLARATIONS ------------------------- */
  var $categoryItem = $(".category-item");

  var $catAll = $("#cat-all");
  var $catBeef = $("#cat-beef");
  var $catPork = $("#cat-pork");
  var $catPoultry = $("#cat-poultry");
  var $catSeafood = $("#cat-seafood");
  var $catVeg = $("#cat-veg");

  var currentCatActive = "all";

  var $tile0 = $("#tile-0");
  var $tileHeader0 = $("#tile-header-0");

  var $tile1 = $("#tile-1");
  var $tileHeader1 = $("#tile-header-1");

  var $tile2 = $("#tile-2");
  var $tileHeader2 = $("#tile-header-2");

  var $tile3 = $("#tile-3");
  var $tileHeader3 = $("#tile-header-3");

  var $tile4 = $("#tile-4");
  var $tileHeader4 = $("#tile-header-4");

  var $tile5 = $("#tile-5");
  var $tileHeader5 = $("#tile-header-5");

  var $tile6 = $("#tile-6");
  var $tileHeader6 = $("#tile-header-6");

  var $tile7 = $("#tile-7");
  var $tileHeader7 = $("#tile-header-7");


/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
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
  $catAll.on("click", function() {
    currentCatActive = "all";
    categoryActive();
  });

  $catBeef.on("click", function() {
    currentCatActive = "beef";
    categoryActive();
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


  $tile0.css("background-image", "url(" + "'" + recipeListMaster[0].img + "'" + ")");
  $tileHeader0.html(recipeListMaster[0].name);

  $tile1.css("background-image", "url(" + "'" + recipeListMaster[1].img + "'" + ")");
  $tileHeader1.html(recipeListMaster[1].name);

  $tile2.css("background-image", "url(" + "'" + recipeListMaster[2].img + "'" + ")");
  $tileHeader2.html(recipeListMaster[2].name);

  $tile3.css("background-image", "url(" + "'" + recipeListMaster[3].img + "'" + ")");
  $tileHeader3.html(recipeListMaster[3].name);

  $tile4.css("background-image", "url(" + "'" + recipeListMaster[4].img + "'" + ")");
  $tileHeader4.html(recipeListMaster[4].name);

  $tile5.css("background-image", "url(" + "'" + recipeListMaster[5].img + "'" + ")");
  $tileHeader5.html(recipeListMaster[5].name);

  $tile6.css("background-image", "url(" + "'" + recipeListMaster[6].img + "'" + ")");
  $tileHeader6.html(recipeListMaster[6].name);

  $tile7.css("background-image", "url(" + "'" + recipeListMaster[7].img + "'" + ")");
  $tileHeader7.html(recipeListMaster[7].name);

});
