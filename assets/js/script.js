const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODlhY2ExZDczZDNhYjgwMTI0MTdlMGIwNGE2MTk3NiIsInN1YiI6IjY2MTcxZTc2MGU0NDE5MDE4NTUyNGZhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZXxoiOegvcKEG_M6RqwU1Ref7xp9pYv-UNKrHV-uoa0'
    }
  };

  const url = 'https://api.themoviedb.org/3/authentication'
  const movieListUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&with_genres=10749%2C%2035%20%7C%2018%20%7C%2010402&with_original_language=en&without_genres=28%2C%2012%2C%2016%2C%2080%2C%2099%2C%2010751%2C%2014%2C%2036%2C%2027%2C%209648%2C%20878%2C%2010770%2C%2053%2C%2010752%2C%2037'
  const titleEl = document.querySelector("#movieTitle");
  const posterEl = document.querySelector("#moviePoster");
  const descriptionEl = document.querySelector("p");
  const moodSelectEl = document.querySelector("#mood-select");
  const buttonEl = document.querySelector("button");

  function displayMovie(movieData){
    titleEl.textContent = movieData.title;
    posterEl.setAttribute("src", "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" + movieData.poster_path);
    descriptionEl.textContent = movieData.overview;

  }

function randomMovieSelection(movieArray){
  const randomMovie = Math.floor(Math.random() * movieArray.length);
  const movieInfo = movieArray[randomMovie];
  displayMovie(movieInfo)
}





   moodSelectEl.addEventListener("change", function(){
    const moodChoice = parseInt(moodSelectEl.value);
    console.log("mc", moodChoice);
    buttonEl.addEventListener("click",function(){
      getMovieAPI(moodChoice);
    });
  });



    function getMovieAPI(genreId){
      console.log("gi", genreId);
    
  console.log("getgenres");
    let genreListUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&genre_ids=35';
    fetch(genreListUrl, options)
    .then(function(results){
      console.log(results);
      return results.json();
    })
    .then(function(genreListData){
      console.log("1", genreListData);
      genreListData = genreListData.results;
      genreListData = genreListData.filter(function(movie){
        return movie.genre_ids.includes(genreId);

      })
      console.log("2", genreListData);
      genreListUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=2&genre_ids=35';
      fetch(genreListUrl, options)
      .then(function(results){
        console.log(results);
        return results.json();
      })
      .then(function(genreListDatapg2){
        genreListDatapg2 = genreListDatapg2.results;
        genreListDatapg2 = genreListDatapg2.filter(function(movie){
          return movie.genre_ids.includes(genreId);
  
        })
        console.log("3", genreListDatapg2);
        const allMovies = genreListData.concat(genreListDatapg2);
        console.log("4", allMovies);
        randomMovieSelection(allMovies);
      })
      
    })
    }
  

  fetch(url, options)
  .then(function(results){
    console.log(results);
    return results.json();
  })
  .then(function(data){
    console.log(data);
  })

  // fetch(movieListUrl, options)
  // .then(function(response){
  //   console.log(response);
  //   return response.json();
  // })
  // .then(function(movieData){
  //   console.log(movieData);
  //   displayMovie(movieData);
  // })

  
  



    
    