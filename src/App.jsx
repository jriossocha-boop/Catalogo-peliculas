import { useState } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import { movies } from './data/movies';
import './index.css';

function App() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ genre: "all", yearRange: "all", minRating: 0 });
  const [favorites, setFavorites] = useState([]); 
  const [ratings, setRatings] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]);
  };

  const rateMovie = (id, rating) => {
    setRatings(prev => ({ ...prev, [id]: rating }));
  };

  // 1. Lógica del Filtro Principal (Búsqueda + Género + Franja de tiempo + Calificación)
  const filteredMovies = movies.filter(movie => {
    const matchQuery = movie.title.toLowerCase().includes(query.toLowerCase());
    const matchGenre = filters.genre === "all" || movie.genre === filters.genre;
    const matchRating = movie.rating >= filters.minRating;
    
    let matchYear = true;
    if (filters.yearRange === "pre2000") matchYear = movie.year < 2000;
    if (filters.yearRange === "2000-2010") matchYear = movie.year >= 2000 && movie.year <= 2010;
    if (filters.yearRange === "2011-2020") matchYear = movie.year >= 2011 && movie.year <= 2020;
    if (filters.yearRange === "post2020") matchYear = movie.year > 2020;

    return matchQuery && matchGenre && matchYear && matchRating;
  });

  // NUEVO: Si el usuario seleccionó un filtro de año, ordenamos de más nuevo a más antiguo
  if (filters.yearRange !== "all") {
    filteredMovies.sort((a, b) => b.year - a.year);
  }

  // 2. Lógica de la Barra Lateral (Derivada del catálogo general)
  const favoriteMovies = movies.filter(m => favorites.includes(m.id));
  const topRatedMovies = [...filteredMovies].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const latestMovies = [...filteredMovies].sort((a, b) => b.year - a.year).slice(0, 4);

  const selectedMovie = movies.find(m => m.id === selectedId);

  // Componente interno para los items del sidebar
  const SidebarItem = ({ movie }) => (
    <div className="sidebar-item" onClick={() => setSelectedId(movie.id)}>
      <img src={movie.image} alt={movie.title} />
      <div className="sidebar-item-info">
        <h4>{movie.title}</h4>
        <p>★ {movie.rating} • {movie.year}</p>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <Header query={query} setQuery={setQuery} />
      
      {!selectedId && query === "" && (
        <div className="hero" style={{ backgroundImage: `url(${movies[33]?.image})` }}>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>{movies[33]?.title}</h1>
            <p>{movies[33]?.description}</p>
            <button className="btn-primary" onClick={() => setSelectedId(movies[33].id)}>▶ Ver Película</button>
          </div>
        </div>
      )}

      <div className="container">
        {selectedId ? (
          <MovieDetail 
            movie={selectedMovie} 
            close={() => setSelectedId(null)} 
            toggleFavorite={() => toggleFavorite(selectedMovie.id)}
            isFavorite={favorites.includes(selectedMovie.id)}
            rateMovie={(val) => rateMovie(selectedMovie.id, val)}
            userRating={ratings[selectedMovie.id] || 0}
          />
        ) : (
          <>
            <Filters filters={filters} setFilters={setFilters} />
            
            <div className="layout">
              {/* Contenido Principal */}
              <div className="main-content">
                <MovieList 
                  movies={filteredMovies} 
                  toggleFavorite={toggleFavorite} 
                  favorites={favorites} 
                  selectMovie={setSelectedId} 
                />
                {filteredMovies.length === 0 && <p>No se encontraron resultados para estos filtros.</p>}
              </div>

              {/* Barra Lateral Derecha */}
              <aside className="sidebar">
                <h3>Mis Favoritas ({favorites.length})</h3>
                <div className="sidebar-list">
                  {favoriteMovies.length === 0 ? <p style={{fontSize: '0.8rem', color: 'gray'}}>Aún no hay favoritas.</p> : null}
                  {favoriteMovies.map(movie => <SidebarItem key={`fav-${movie.id}`} movie={movie} />)}
                </div>

                <h3>Mejor Valoradas</h3>
                <div className="sidebar-list">
                  {topRatedMovies.map(movie => <SidebarItem key={`top-${movie.id}`} movie={movie} />)}
                </div>

                <h3>Estrenos Recientes</h3>
                <div className="sidebar-list">
                  {latestMovies.map(movie => <SidebarItem key={`new-${movie.id}`} movie={movie} />)}
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;