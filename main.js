const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=f86a641ef848920068a69864d5b6dbd4'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=f86a641ef848920068a69864d5b6dbd4&query='


const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");


getMovies(API_URL)

async function getMovies(url){
    const response = await fetch(url);
    const data = await response.json();

    showMovies(data.results);
}

form.addEventListener("submit",(e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm && searchTerm !==""){
        getMovies(SEARCH_API + search.value)
        search.value=""
    }else {
        window.location.reload();
    }
});


function showMovies(movies){
    main.innerHTML=""
    
movies.forEach((movie) => {
    const { title, poster_path,  overview , vote_average} = movie

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML=`<img src="${IMG_PATH + poster_path}"></
            alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average.toFixed(1)}</span>
            </div>
            <div class="overview">
                <h3>${title} <small>overview</small></h3>
                <p>${overview}</p>
            </div>`

            main.appendChild(movieEl)
})
}

function getClassByRate(vote) {
    if (vote >= 7.5) {
      return 'green'
    } else if (vote >= 5) {
      return 'yellow'
    } else {
      return 'red'
    }
  }