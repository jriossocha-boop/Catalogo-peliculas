import React from 'react';
import MovieList from './MovieList';

const Favorites = ({ movies, toggleFavorite, favorites, selectMovie }) => (
  <div>
    <h2>Mis Películas Favoritas</h2>
    <MovieList 
      movies={movies} 
      toggleFavorite={toggleFavorite} 
      favorites={favorites} 
      selectMovie={selectMovie} 
    />
  </div>
);

export default Favorites;