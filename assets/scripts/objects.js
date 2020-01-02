const addMovieButton = document.getElementById('add-movie-btn');
const searchButton = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
  let movieList = document.getElementById('movie-list');
  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  const filteredMovies = !filter
    ? movies
    : movies.filter(movie => movie.info.title.toLowerCase().includes(filter.toLowerCase()));

  filteredMovies.forEach(movie => {
    const movieEl = document.createElement('li');
    const { info } = movie; // object destructuring 
    const { title : movieTitle } = info;
    let {  getFormattedTitle } = movie;
    //getFormattedTitle = getFormattedTitle.bind(movie);
    let text = getFormattedTitle.call(movie) + ' - ';
    for (const key in info) {
      if (key !== 'title') {
        text = text + ` ${key} : ${info[key]} `;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  let title = document.getElementById('title').value;
  let extraName = document.getElementById('extra-name').value;
  let extraValue = document.getElementById('extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }
  title = title.trim();
  extraName = extraName.trim();
  extraValue = extraValue.trim();
  const newMovie = {
    info: {
      title,
      [extraName]: extraValue
    },
    id: Math.random(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    }
  };
  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};

addMovieButton.addEventListener('click', addMovieHandler);
searchButton.addEventListener('click', searchMovieHandler);
