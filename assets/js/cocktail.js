const cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
const drinkNameEl = document.querySelector("#cocktailTitle");
const drinkImageEl = document.querySelector("#cocktailPhoto");
const ingredientListEl = document.querySelector("ul");
const drinkDescriptionEl = document.querySelector("#cocktailDescription")


function displayCocktail(data){
drinkNameEl.textContent = data.drinks[0].strDrink;
drinkImageEl.setAttribute("src", data.drinks[0].strDrinkThumb);
const drinksArray = [];
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
console.log(drinksArray, measureArray);
for (i = 0; i < drinksArray.length; i++){
    console.log(measureArray[i], drinksArray[i]);
    let totalMeasurement = measureArray[i] + " " + drinksArray[i];
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