$(document).ready(function() {

/* ------------------------- VARIABLE DECLARATIONS ------------------------- */
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


/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function categoryActive() {
  if(currentCatActive === "all") {
    $catAll.addClass("category-active");

    $catBeef.removeClass("category-active");
  }

  else if(currentCatActive === "beef") {
    $catBeef.addClass("category-active");

    $catAll.removeClass("category-active");
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


  $tile0.css("background-image", "url(" + "'" + recipeListMaster[0].img + "'" + ")");
  $tileHeader0.html(recipeListMaster[0].name);

  $tile1.css("background-image", "url(" + "'" + recipeListMaster[1].img + "'" + ")");
  $tileHeader1.html(recipeListMaster[1].name);

  $tile2.css("background-image", "url(" + "'" + recipeListMaster[2].img + "'" + ")");
  $tileHeader2.html(recipeListMaster[2].name);

  $tile3.css("background-image", "url(" + "'" + recipeListMaster[3].img + "'" + ")");
  $tileHeader3.html(recipeListMaster[3].name);

});
