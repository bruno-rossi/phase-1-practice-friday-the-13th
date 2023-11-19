// Challenge 1
// For each movie returned from http://localhost:3000/movies create an image and add it to the movie-list nav element.
    //  Steps:
        // 1. Fetch data from the URL
        // 2. Outside fetch, create a function named "addMovies" that takes "movies" as an argument. For each element in the movies argument, take that individual movie's data and add an image tag for it to the nav:
            // - create <img src=""/> element and assign it to const imgTag.
            // - assign the imgTag's src to equal the movie argument's "image" property.
            // - querySelect <nav id="movie-list"> and assign it to const navTag.
            // - append the recently created imgTag to the navTag.
        // 3. Call the function from inside fetch .then().
// Challenge 2:
    // Steps:
        // 1. Create a new function called displayMovieData that takes a movie object as its argument.
        // 2. Inside of this function, select the elements for each of the properties we need to display.
            // - Select <img id="detail-image" src="" />. Assign src's value as movie "movie.image" property.
            // - Select <h1 id="title">Title</h1>. Assign its textContent as the "movie.title" property.
            // - Select <h3 id="year-released">Year Released</h5>. Assign its textContent as the "movie.release_year" property.
            // - Select <p id="description">Description</p>. Assign its textContent as the "movie.description" property.
            // - Select <button id="watched">Watched</button>. Assign its textContent as the "movie.watched" property.
            // - Select <span id="amount">0</span>. Assign its textContent as the "movie.blood_amount" property.
        // 3: Call in the function inside fetch .then. Pass the first index of the movieData array as argument for displayMovieData, so that it will be displayed as default when the page loads.
// ## Challenge 3
    // When you click on each movie image in the top nav, you should populate the detail area with the `image`, `title`, `release_year`, `description`, `watched`, and `blood_amount` for the movie that was clicked.
        // Steps:
        // 1. Create a new function for the Watched/Unwatched button: isWatchedButton.

// ## Challenge 4
// When you click on the button in the details it should toggle between `Watched` or `Unwatched` depending on the value of `watched` for the movie currently being displayed.

// _The watched value should stay the same when you click between the different movies._

// ## Challenge 5
// On the right side there's a form that allows the user to enter a number of blood drops to add to each movie (don't ask why). For each movie, I should be able to add more drops.

// We will select the form and add a submit event to it. We will prevent default behavior. We will take in the value from the blood-amount text input element and we will keep it in a variable. When the form is submitted, we will take that input and add to the total blood. We will then display that total in the "#amount" element's textContent.

// Example: 
// - If the value is 0 and I enter 10, then number of drops for the movie should be 10.
// - If the value is 20 and I enter 5, then the number of drops for the movie should be 25.

// _The blood amount value should stay the same when you click between the different movies._


// We will be changing the data after we fetch it, so we need to make a local copy of the data and store in a variant:
let movieData;
let selectedMovie;

fetch("http://localhost:3000/movies")
.then(response => response.json())
.then(fetchedData => {

    // Store a copy of fetchedData as movieData, so it can be modified locally;
    movieData = fetchedData;

    // Call the displayMovieData function and execute it. Pass movieData[0] as its argument.
    displayMovieData(movieData[0]);
    
    // Call the buildNav function and execute it. Pass movieData as its argument.
    buildNav(movieData);

    // Call the watchedButton function:
    watchedButton();

    // Call the addBloodFn function:
    addBloodFn();

})

// Define new function that takes in a movieList array as argument.
function buildNav(movieList) {

    // Add a function to take action on each element of the movieList, passing "movie" as the argument for each element in the array.
    movieList.forEach(movie => {

        // Create imgTag and assign the movie's "image" property as the imgTag's src value.
        const imgTag = document.createElement("img");
        imgTag.src = movie.image;

        // querySelect the page's nav element and append the newly created imgTag.
        const navTag = document.querySelector("#movie-list");
        navTag.append(imgTag);

        // Create a "click" eventListener on the imgTag to execute the displayMovieData function, with movie as its argument.
        imgTag.addEventListener("click", event => {
            displayMovieData(movie);
        })

    })
};

function displayMovieData(movie) {
    
    selectedMovie = movie;
    
    let imgTag = document.querySelector("#detail-image");
    imgTag.src = movie.image;

    let movieTitle = document.querySelector("#title");
    movieTitle.textContent = movie.title;

    let releaseYear = document.querySelector("#year-released");
    releaseYear.textContent = movie.release_year;

    let movieDescription = document.querySelector("#description");
    movieDescription.textContent = movie.description;

    let isWatchedButton = document.querySelector("#watched");
    isWatchedButton.textContent = movie.watched ? "Watched" : "Unwatched";

    let bloodAmount = document.querySelector("#amount");
    bloodAmount.textContent = movie.blood_amount;

};

function watchedButton() {
    let isWatchedButton = document.querySelector("#watched");
    isWatchedButton.addEventListener("click", event => {        
        selectedMovie.watched = !selectedMovie.watched;
        isWatchedButton.textContent = selectedMovie.watched ? "Watched" : "Unwatched";
    });
};

function addBloodFn() {
    const form = document.querySelector("#blood-form");

    form.addEventListener("submit", event => {
        event.preventDefault();

        const numToAdd = event.target["blood-amount"].value;
        selectedMovie.blood_amount += parseInt(numToAdd);

        document.querySelector("#amount").textContent = selectedMovie.blood_amount;

        event.target.reset();
    });
}

