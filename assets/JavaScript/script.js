const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODlhY2ExZDczZDNhYjgwMTI0MTdlMGIwNGE2MTk3NiIsInN1YiI6IjY2MTcxZTc2MGU0NDE5MDE4NTUyNGZhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZXxoiOegvcKEG_M6RqwU1Ref7xp9pYv-UNKrHV-uoa0'
    }
  };

  const url = 'https://api.themoviedb.org/3/authentication'
  const movieListUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
  const otherListUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
  const titleEl = document.querySelector("h1");
  const posterEl = document.querySelector("img");
  const descriptionEl = document.querySelector("p");

  function displayMovie(movieData){
    titleEl.textContent = movieData.results[0].title;
    posterEl.setAttribute("src", "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" + movieData.results[0].poster_path);
    descriptionEl.textContent = movieData.results[0].overview;

  }

  fetch(url, options)
  .then(function(results){
    console.log(results);
    return results.json();
  })
  .then(function(data){
    console.log(data);
  })

  fetch(movieListUrl, options)
  .then(function(response){
    console.log(response);
    return response.json();
  })
  .then(function(movieData){
    console.log(movieData);
    displayMovie(movieData);
  })
  fetch(otherListUrl, options)
  .then(function(response){
    console.log(response);
    return response.json();
  })
  .then(function(movieData){
    console.log(movieData);
  })

  
  



    
    