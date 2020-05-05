// Navigation

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Movies JSON

const MoviesList = {
    "movies": [{
        "Title": "The Notebook",
        "YoutubeId": "FC6biTjEyZw",
    },
        {
            "Title": "P.S. I Love You",
            "YoutubeId": "CZzW6_hR068",
        },
        {
            "Title": "Love actually",
            "YoutubeId": "fOS-HMiVejo",
        },
        {
            "Title": "Crazy, Stupid, Love.",
            "YoutubeId": "8iCwtxJejik",
        },
        {
            "Title": "A Star Is Born",
            "YoutubeId": "nSbzyEJ8X9E",
        },
    ]
};


// Finding the root element
const app = document.getElementById('root');

// Creating a container element
const container = document.createElement('div');
container.setAttribute('class', 'container');

// Attaching the container to the root element
app.appendChild(container);

// The url is our endpoint and contains the data that we want to work with
let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

// Get the title and YoutubeId from the JSON file
MoviesList.movies.forEach(movie=> {
    console.log(movie.Title);
    console.log(movie.YoutubeId);
    let url = "http://www.omdbapi.com/?t="+movie.Title+"&apikey=2a3c4851";

// Embed youtube trailer
    const showVideo = document.createElement("iframe");
    showVideo.setAttribute("src", "https://www.youtube.com/embed/"+movie.YoutubeId);

// The endpoint is passed into the call of the fetch function. The call of the fetch returns a promise
    fetch(proxyUrl + url)
        //when the promise is resolved we extract the JSON part of the response object
        .then(response => {
            return response.json();
        })
        //then we can work with the JSON data
        .then(movie => {
            // We iterate through all the objects


            // Create a div with a card class for the cards
            const card = document.createElement('div');
            card.setAttribute('class', 'grid');


            // Create a div with a card class for the content
            const grid = document.createElement('div');
            grid.setAttribute('class', 'grid');

            // Create an h1 and set the text content to the movie's title and year
            const h1 = document.createElement('h1');
            h1.textContent = movie.Title + ' ' + '(' + movie.Year + ')';

            // Create a p and set the text content to the movie's plot
            const p = document.createElement('p');
            p.textContent = movie.Plot;

            // Create a h3 and set the text content to the movie's imdbRating
            const h2= document.createElement('h2');
            h2.textContent = 'Rating:' + movie.imdbRating + '/10';

            // Create a div with a card class for the trailers
            const trailer = document.createElement('div');
            trailer.setAttribute('class', 'trailer');

            // Append the cards to the container element
            container.appendChild(card);

            //Each  will contain an h1. a p, a h2, trailer element

            card.appendChild(grid);

            grid.appendChild(h1);

            grid.appendChild(p);

            grid.appendChild(h2);

            trailer.appendChild(showVideo);

            card.appendChild(trailer);

        })
        .catch(err => {
            // If Error occurs do something
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Something is went wrong!`;
            app.appendChild(errorMessage);
        })
})

