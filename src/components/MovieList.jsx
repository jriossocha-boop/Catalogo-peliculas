import React from 'react';

const MovieCard = ({ movie, toggleFavorite, isFavorite, selectMovie }) => (
  <div className="movie-card" onClick={() => selectMovie(movie.id)}>
    <span className="rating-badge">★ {movie.rating}</span>
    <img src={movie.image} alt={movie.title} />
    <div className="card-info">
      <h3>{movie.title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '5px' }}>
        {movie.year} • {movie.genre}
      </p>
      
      {/* Nuevo botón de Favoritos */}
      <button 
        className={`fav-btn ${isFavorite ? 'active' : ''}`} 
        onClick={(e) => { 
          e.stopPropagation(); // Evita que se abra el detalle al hacer clic en el botón
          toggleFavorite(movie.id); 
        }}
      >
        <span>{isFavorite ? '♥' : '♡'}</span>
        {isFavorite ? 'En Favoritas' : 'Agregar'}
      </button>

    </div>
  </div>
);

const MovieList = ({ movies, toggleFavorite, favorites, selectMovie }) => (
  <div className="movie-grid">
    {movies.map(movie => (
      <MovieCard 
        key={movie.id} 
        movie={movie} 
        toggleFavorite={toggleFavorite} 
        isFavorite={favorites.includes(movie.id)}
        selectMovie={selectMovie}
      />
    ))}
  </div>
);

export default MovieList;