const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODlhY2ExZDczZDNhYjgwMTI0MTdlMGIwNGE2MTk3NiIsInN1YiI6IjY2MTcxZTc2MGU0NDE5MDE4NTUyNGZhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZXxoiOegvcKEG_M6RqwU1Ref7xp9pYv-UNKrHV-uoa0",
  },
};

const url = "https://api.themoviedb.org/3/authentication";
const movieListUrl =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&with_genres=10749%2C%2035%20%7C%2018%20%7C%2010402&with_original_language=en&without_genres=28%2C%2012%2C%2016%2C%2080%2C%2099%2C%2010751%2C%2014%2C%2036%2C%2027%2C%209648%2C%20878%2C%2010770%2C%2053%2C%2010752%2C%2037";
// const titleEl = document.querySelector("#movieTitle");

const posterEl = document.querySelector("#moviePoster");
const descriptionEl = document.querySelector("p");
const moodSelectEl = document.querySelector("#mood-select");
const buttonEl = document.querySelector("#sendBtn");

const movieSectionEl = document.querySelector("#movie-section");
const movieTitleEl = document.querySelector("#movie-title");
const movieContainer = document.querySelector("#movie-container");
const movieOverview = document.querySelector("#movie-overview");
const nextButton = document.querySelector("#nextBtn");
const moodId = JSON.parse(localStorage.getItem("mood")) || 35;
// const movieDescriptionSectionEl = document.querySelector("#movie-description_section");

const cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const drinkNameEl = document.querySelector("#cocktailTitle");
const drinkImageEl = document.querySelector("#cocktailPhoto");
const ingredientListEl = document.querySelector("ul");
const drinkDescriptionEl = document.querySelector("#cocktailDescription");

function displayMovie(movieData, genreId) {
  // titleEl.textContent = movieData.title;
  //Display the title of the movie.
  // movieTitleEl.textContent = movieData.title;
  movieContainer.innerHTML = "";
  movieOverview.innerHTML = ''

  //Create image element and append to the movie section.

  const posterContainer = document.createElement("div");
  //const movieTitle = document.createElement('h3')
  const movieTitle = document.querySelector("#movieTitle");
  const movieOverviewContentEl = document.createElement("h4");
  const movieDescriptionContentEl = document.createElement("p");
  const overviewSpan = document.createElement("strong");
  const posterTitleEl = document.createAttribute("h4");
  const moviePosterEl = document.createElement("img");
  const nextMovieBtn = document.createElement("button");
  // moviePosterEl.classList.add(`w-20`, `h-21`);
  // We should also add alt element.

  //movieTitle.textContent =  movieData.title
  movieTitle.textContent = movieData.title;

  moviePosterEl.setAttribute(
    "src",
    "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" +
      movieData.poster_path
  );
  posterContainer.classList.add(`border-black`);
  posterTitleEl.textContent = "Movie Posture";
  nextMovieBtn.textContent = "next movie";

  //Append the image to its container.

  // Create element for description

  // Add the description of the movie.

  movieOverviewContentEl.textContent = "Overview: ";
  //movieDescriptionContentEl.textContent = movieData.overview;
  movieDescriptionContentEl.textContent = movieData.overview;
  console.log("movie Description:", movieData.overview);
  nextMovieBtn.setAttribute(
    "class",
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  );
  nextMovieBtn.setAttribute("value", genreId);
  // movieDescriptionContentEl.append(document.createElement(`<span>Description<span>`));

  // Append
  nextButton.addEventListener("click", function () {
   
    getMovieAPI(moodId);
  });

  posterContainer.appendChild(moviePosterEl, moviePosterEl);
  // movieSectionEl.appendChild(posterContainer);
  // descriptionContainer.append(movieDescriptionEl);
  movieContainer.append(
    //movieTitle,
    posterContainer,
    overviewSpan
    // movieDescriptionContentEl,
    //  nextMovieBtn
  );

  movieOverview.append(movieOverviewContentEl, movieDescriptionContentEl);

  // titleEl.textContent = movieData.title;
  // posterEl.setAttribute("src", "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" + movieData.poster_path);
  // descriptionEl.textContent = movieData.overview;
}

function displayCocktail(data) {
  drinkNameEl.textContent = data.drinks[0].strDrink;
  drinkImageEl.setAttribute("src", data.drinks[0].strDrinkThumb);
  drinkDescriptionEl.textContent = data.drinks[0].strInstructions;
  const IngredientArray = [];
  const measureArray = [];
  for (i = 1; i < 15; i++) {
    let tempDrink = data.drinks[0]["strIngredient" + i];
    if (tempDrink) {
      IngredientArray.push(tempDrink);
    }
    let measurement = data.drinks[0]["strMeasure" + i];
    if (measurement) {
      measureArray.push(measurement);
    }
  }

  console.log(IngredientArray, measureArray);
  for (i = 0; i < IngredientArray.length; i++) {
    console.log(measureArray[i], IngredientArray[i]);
    let totalMeasurement = measureArray[i] + " " + IngredientArray[i];
    console.log(totalMeasurement);
  }
}

let genreListData = [];
let genreListDatapg2 = [];

function randomMovieSelection(movieArray) {
  const randomMovie = Math.floor(Math.random() * movieArray.length);
  const movieInfo = movieArray[randomMovie];
  displayMovie(movieInfo);
  console.log(movieInfo);
}

function getMovieAPI(genreId) {
  let moviesArray = [];
  let genreListUrl =
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&genre_ids=${genreId}`;

  let filteredMovies;
  let filteredMoviesPg2;

  fetch(genreListUrl, options)
    .then(function (results) {
      return results.json();
    })
    .then(function (data) {
      let genreListData = data.results;
      moviesArray = moviesArray.concat(genreListData);
      filteredMovies = genreListData.filter(function (movie) {
        return movie.genre_ids.includes(genreId);
      });

      console.log("1", genreListData);
      return filteredMovies;
    })
    .then(function () {
      genreListUrl =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2&genre_ids=35";
      return fetch(genreListUrl, options);
    })
    .then(function (results) {
      return results.json();
    })
    .then(function (data) {
      let genreListDatapg2 = data.results;
      moviesArray = moviesArray.concat(genreListDatapg2);

      filteredMoviesPg2 = genreListDatapg2.filter(function (movie) {
        return movie.genre_ids.includes(genreId);
      });

      console.log("3", filteredMoviesPg2);

      const allMovies = filteredMovies.concat(filteredMoviesPg2);
      console.log("4", allMovies);
      randomMovieSelection(moviesArray);
    });
}

function randomCocktail() {
  fetch(cocktailUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayCocktail(data);
    });
}

// fetch(url, options)
//   .then(function (results) {
//     console.log(results);
//     return results.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

// fetch(movieListUrl, options)
// .then(function(response){
//   console.log(response);
//   return response.json();
// })
// .then(function(movieData){
//   console.log(movieData);
//   displayMovie(movieData);
// })
moodSelectEl.addEventListener("change", function () {
  const moodChoice = parseInt(moodSelectEl.value);
  console.log("mc", moodChoice);
  buttonEl.addEventListener("click", function () {
    getMovieAPI(moodChoice);
    localStorage.setItem("mood", JSON.stringify(moodChoice));
    randomCocktail();
    document.getElementById('nextPanel').classList.remove('hide')
  });
});

document.getElementById('nextBtnDrink').addEventListener('click', function (){
  randomCocktail()
})

// window.location.reload();
