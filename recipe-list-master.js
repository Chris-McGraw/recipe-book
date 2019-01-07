var bbqChicken = {
  id: "bbqChicken",
  name: "BBQ Chicken",
  category: "poultry",
  img: "https://res.cloudinary.com/dtwyohvli/image/upload/v1544379016/recipe-book/bbq-chicken.jpg",
  link: "recipes/bbq-chicken.html",
  ingredients: ["3 lbs. chicken thighs", "1/2 cup olive oil", "3 tbsp. white vinegar",
  "1 tbsp. salt", "1 tbsp. white sugar", "1 tsp. red pepper flakes", "1 cup ketchup",
  "1/4 cup brown sugar", "2 tbsp. paprika", "1 tbsp. chili powder"],
  recipe: []
};

var chili = {
  id: "chiliConCarne",
  name: "Chili Con Carne",
  category: "beef",
  img: "https://res.cloudinary.com/dtwyohvli/image/upload/v1544118007/recipe-book/chili-con-carne.jpg",
  link: "recipes/chili-con-carne.html",
  ingredients: ["1 lb. ground beef", "1 large yellow onion", "3 cloves garlic",
  "1 fresh lime, juiced", "1 can diced tomatoes", "1 can dark red kidney beans", "1 tbsp. chili powder",
  "1 tsp. ground cumin", "1/4 tsp. cayenne pepper", "1/4 tsp. garlic powder", "1/2 tsp. onion powder",
  "1 tsp. salt", "1/4 tsp. freshly ground pepper"],
  recipe: ["1. Finely dice onion/garlic and add to large pot.",
  "2. Saute for 10-15 minutes over low heat until soft.",
  "3. Transfer onion/garlic to seperate dish and set aside.",
  "4. Add ground beef to pot over medium high heat and cook for 3-5 minutes or until browned.",
  "5. Drain excess fat and add remaining ingredients including cooked onion/garlic.",
  "6. Reduce heat to low and let simmer for at least 1-2 hours uncovered, stirring occasionally."]
};

var fajitas = {
  id: "fajitas",
  name: "Fajitas",
  category: "poultry",
  img: "https://res.cloudinary.com/dtwyohvli/image/upload/v1544117892/recipe-book/fajitas.jpg",
  link: "recipes/fajitas.html",
  ingredients: [],
  recipe: []
};

var frittata = {
  name: "Frittata",
  category: "vegetarian",
  img: "https://res.cloudinary.com/dtwyohvli/image/upload/v1544402454/recipe-book/frittata.jpg",
  link: "recipes/template.html",
  ingredients: [],
  recipe: []
};

var hamburgers = {
  name: "Hamburgers",
  category: "beef",
  img: "https://res.cloudinary.com/dtwyohvli/image/upload/v1544379558/recipe-book/hamburgers.jpg",
  link: "recipes/template.html",
  ingredients: [],
  recipe: []
};

var macAndCheese = {
  name: "Mac & Cheese",
  category: "vegetarian",
  img: "https://res.cloudinary.com/dtwyohvli/image/upload/v1544747322/recipe-book/mac-and-cheese.jpg",
  link: "recipes/template.html",
  ingredients: [],
  recipe: []
};

var potatoCasserole = {
  name: "Potato Casserole",
  category: "vegetarian",
  img: "https://res.cloudinary.com/dtwyohvli/image/upload/v1544379270/recipe-book/potato-casserole.jpg",
  link: "recipes/template.html",
  ingredients: [],
  recipe: []
};

var pulledPork = {
  name: "Pulled Pork",
  category: "pork",
  img: "https://res.cloudinary.com/dtwyohvli/image/upload/v1544747322/recipe-book/pulled-pork.jpg",
  link: "recipes/template.html",
  ingredients: [],
  recipe: []
};

var spaghetti = {
  name: "Spaghetti",
  category: "beef",
  img: "https://res.cloudinary.com/dtwyohvli/image/upload/v1544118748/recipe-book/spaghetti.jpg",
  link: "recipes/template.html",
  ingredients: [],
  recipe: []
};

var springSalad = {
  name: "Spring Salad",
  category: "vegetarian",
  img: "https://res.cloudinary.com/dtwyohvli/image/upload/v1544121716/recipe-book/spring-salad.jpg",
  link: "recipes/template.html",
  ingredients: [],
  recipe: []
};

var tortelliniSoup = {
  name: "Tortellini Soup",
  category: "poultry",
  img: "https://res.cloudinary.com/dtwyohvli/image/upload/v1544380718/recipe-book/tortellini-soup.jpg",
  link: "recipes/template.html",
  ingredients: [],
  recipe: []
};



var recipeListMaster = [bbqChicken, chili, fajitas, frittata, hamburgers, macAndCheese,
  potatoCasserole, pulledPork, spaghetti, springSalad, tortelliniSoup];

var recipeListBeef = [];

var recipeListPork = [];

var recipeListPoultry = [];

var recipeListSeafood = [];

var recipeListVegetarian = [];



function sortRecipeCategory() {
  recipeListMaster.forEach(function(element) {
    switch(element.category) {
      case "beef":
        recipeListBeef.push(element);
        break;
      case "pork":
        recipeListPork.push(element);
        break;
      case "poultry":
        recipeListPoultry.push(element);
        break;
      case "seafood":
        recipeListSeafood.push(element);
        break;
      case "vegetarian":
        recipeListVegetarian.push(element);
        break;
      default:
        recipeListAll.push(element);
    }
  });
}
