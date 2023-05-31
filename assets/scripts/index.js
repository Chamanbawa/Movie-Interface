"use strict";
import { select, print, onEvent } from "./utils.js";
import cities from "./cities.js";
import moviesFile from "./movies.js";
print(cities.cities);
print(moviesFile.results);

const movieArea = select(".movie-area");
const url = "./assets/scripts/movies.json";
const citiesUrl = "./assets/scripts/cities.json";
const addressInput = select('.address-input');
const addressSuggestion = select('.address-suggestions');
const citiesArr = [];
const movieInput = select('.movie-input');
const movieSuggestion = select('.movie-suggestions');
const moviesArr = [];
const option = {
    method: "GET",
    headers: { "Content-Type": "application.json; charset=UTF-8" },
    mode: "cors",
};

//#region [Print Movies]
function listMovies(array) {
    movieArea.innerHTML = "";
    let movies = "";
    if (array.length > 0) {
        array.forEach((movie) => {
            movies += ` <div class="movie">
            <div class="movie-image">
            <img
            src="${movie.img}"
            alt="image"
            />
            </div>
            <p class="movie-title">${movie.title}</p>
            </div>`;
        });
    } else {
        movies += `<li>Movies not found</li>`;
  }

  movieArea.innerHTML = ` ${movies}`;
}

//#endregion

//#region getMoviesFrom Json
async function getMovies() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }

    const { results } = await response.json();

    console.log(results);
    listMovies(results);
    moviesToArray(results);
  } catch (error) {
    print(error.message);
  }
}
//#endregion

//#region  Converting movies into array
function moviesToArray(array) {
    array.forEach(movie =>{
        moviesArr.push(movie.title);
    } )
    }

//#endregion

//#region  Get cities from josn

async function getCities() {
  try {
    const response = await fetch(citiesUrl);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const { cities } = await response.json();
    console.log(cities);
    citiesToArray(cities);
  }
   catch (error) {
    print(error.message);
  }
}
//#endregion

//#region Converting cities To Array
function citiesToArray(array) {
array.forEach(city =>{
    citiesArr.push(city.name);
} )
}
//#endregion


//#region Getting movies suggestions
onEvent('input',movieInput,function(){
    if(movieInput === "") {
        movieSuggestion.innerHTML = '';
    }
    const tolowercases = movieInput.value.toLowerCase();
    const matchedMovies = tolowercases === ''? [] : moviesArr.filter(movie =>
      movie.toLowerCase().includes(tolowercases)
    );

    movieSuggestion.innerHTML = ''; 

    matchedMovies.forEach(movie => {
      const div = document.createElement('div');
      div.classList.add("suggested-movie");
      div.innerHTML = movie;
      
      onEvent('click',div,function(){
          movieInput.value = movie;
          movieSuggestion.innerHTML = '';
        })
        movieSuggestion.appendChild(div);
    });
  });


//#endregion

//#region  Getting suggestions of cities

    onEvent('input',addressInput,function(){
      const tolowercases = addressInput.value.toLowerCase();

       const matchedCities = tolowercases === ''? [] :citiesArr.filter(city =>
        city.toLowerCase().includes(tolowercases)
      );

      addressSuggestion.innerHTML = ''; 

      matchedCities.forEach(city => {
        const div = document.createElement('div');
        div.classList.add("suggested-city");
        div.innerHTML = city;

        onEvent('click',div,function(){
            addressInput.value = city;
            addressSuggestion.innerHTML = '';
          })

        addressSuggestion.appendChild(div);
        
    });
});

//#endregion

getMovies();
getCities();