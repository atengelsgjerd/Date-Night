const cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
const drinkNameEl = document.querySelector("#cocktailTitle");
const drinkImageEl = document.querySelector("#cocktailPhoto");
const ingredientListEl = document.querySelector("ul");
const drinkDescriptionEl = document.querySelector("#cocktailDescription")


function displayCocktail(data){
drinkNameEl.textContent = data.drinks[0].strDrink;
drinkImageEl.setAttribute("src", data.drinks[0].strDrinkThumb);
const IngredientArray = [];
const measureArray = [];
for (i = 1; i < 15; i++){
    let tempDrink = data.drinks[0]["strIngredient" + i];
    if (tempDrink){
        drinksArray.push(tempDrink);
    }
    let measurement = data.drinks[0]["strMeasure" + i];
    if (measurement){
        measureArray.push(measurement);
    }
  

}
console.log(IngredientArray, measureArray);
for (i = 0; i < IngredientArray.length; i++){
    console.log(measureArray[i], IngredientArray[i]);
    let totalMeasurement = measureArray[i] + " " + IngredientArray[i];
    console.log(totalMeasurement);
}
}

fetch(cocktailUrl)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
    displayCocktail(data);
})