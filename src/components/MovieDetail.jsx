import React from 'react';

const MovieDetail = ({ movie, close, toggleFavorite, isFavorite, rateMovie, userRating }) => {
  return (
    <div className="movie-detail">
      <img src={movie.image} alt={movie.title} style={{ maxWidth: '300px', borderRadius: '10px', objectFit: 'cover' }} />
      
      {/* Contenedor principal de la información */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '2.5rem', margin: '0 0 10px 0' }}>
          {movie.title} <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>({movie.year})</span>
        </h2>
        
        <p style={{ fontSize: '1.1rem', margin: '5px 0' }}><strong>Género:</strong> {movie.genre}</p>
        <p style={{ fontSize: '1.1rem', margin: '5px 0', color: '#facc15' }}><strong>Calificación Global:</strong> ★ {movie.rating}</p>
        
        <p style={{ marginTop: '20px', fontSize: '1.1rem', lineHeight: '1.6', color: '#d1d5db' }}>
          {movie.description}
        </p>
        
        {/* Contenedor de Botones Principales (Alineados horizontalmente) */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '30px', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={close} style={{ margin: 0, padding: '10px 20px', fontSize: '1rem' }}>
            ⬅ Volver
          </button>
          
          <button 
            className={`fav-btn ${isFavorite ? 'active' : ''}`} 
            onClick={toggleFavorite}
            style={{ margin: 0, padding: '10px 20px', fontSize: '1rem' }}
          >
            <span>{isFavorite ? '♥' : '♡'}</span>
            {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
          </button>
        </div>

        {/* Panel de Valoración Personal (Caja estilizada y empujada al fondo) */}
        <div style={{ 
          marginTop: 'auto', 
          padding: '15px 20px', 
          background: 'rgba(0, 0, 0, 0.3)', 
          borderRadius: '10px', 
          display: 'inline-block',
          alignSelf: 'flex-start',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}><strong>Tu valoración:</strong></p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span 
                  key={star} 
                  className={star <= userRating ? 'active' : ''} 
                  onClick={() => rateMovie(star)}
                  style={{ fontSize: '1.5rem', transition: 'color 0.2s' }}
                >
                  ★
                </span>
              ))}
            </div>
            
            {/* Botón para quitar valoración (solo aparece si ya se valoró, pasándole un 0 al estado) */}
            {userRating > 0 && (
              <button 
                onClick={() => rateMovie(0)} 
                style={{ 
                  background: 'transparent', 
                  border: '1px solid #ef4444', 
                  color: '#ef4444', 
                  padding: '5px 10px', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  fontSize: '0.85rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                ✖ Borrar
              </button>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MovieDetail;