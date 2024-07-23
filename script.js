document.addEventListener('DOMContentLoaded', function () {
    fetchMovies();
});

function fetchMovies() {
    const apiKey = '8d480066'; // Correct API key without spaces
    const MoviesGrid = document.getElementById('MoviesGrid');
    MoviesGrid.innerHTML = '<p>Loading movies...</p>';

    const randomSearchTerms = ['action', 'comedy', 'drama', 'adventure'];
    const randomTerm = randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${randomTerm}`)
        .then(response => response.json())
        .then(data => {
            if (data.Search && data.Search.length > 0) {
                moviesToShow(data.Search);
            } else {
                MoviesGrid.innerHTML = '<p>No random movies found!</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching random movies:', error);
            MoviesGrid.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
        });
}

function searchMovies() {
    const apiKey = '8d480066'; // Correct API key without spaces
    const searchInput = document.getElementById('searchInput').value;
    const MoviesGrid = document.getElementById('MoviesGrid');

    if (searchInput.trim() !== '') {
        MoviesGrid.innerHTML = '<p>Loading movies...</p>';

        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`)
            .then(response => response.json())
            .then(data => {
                if (data.Search && data.Search.length > 0) {
                    moviesToShow(data.Search);
                } else {
                    MoviesGrid.innerHTML = '<p>No movies found with the given name!</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                MoviesGrid.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
            });
    } else {
        alert('Enter a movie title then search!');
    }
}

function moviesToShow(movies) {
    const MoviesGrid = document.getElementById('MoviesGrid');
    MoviesGrid.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
            <p>${movie.Year}</p>
        `;

        MoviesGrid.appendChild(movieCard);
    });
}
