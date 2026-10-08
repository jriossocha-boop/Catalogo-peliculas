import React from 'react';

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters">
      <select name="genre" value={filters.genre} onChange={handleChange}>
        <option value="all">Todos los Géneros</option>
        <option value="Acción">Acción</option>
        <option value="Ciencia Ficción">Ciencia Ficción</option>
        <option value="Terror">Terror</option>
        <option value="Fantasía">Fantasía</option>
        <option value="Animación">Animación</option>
      </select>
      
      {/* Nuevo filtro por Franja de Tiempo */}
      <select name="yearRange" value={filters.yearRange} onChange={handleChange}>
        <option value="all">Cualquier Época</option>
        <option value="pre2000">Clásicos (Antes de 2000)</option>
        <option value="2000-2010">2000 - 2010</option>
        <option value="2011-2020">2011 - 2020</option>
        <option value="post2020">Estrenos (2021 en adelante)</option>
      </select>

      <select name="minRating" value={filters.minRating} onChange={handleChange}>
        <option value={0}>Cualquier Calificación</option>
        <option value={7}>Más de 7.0</option>
        <option value={8}>Más de 8.0</option>
      </select>
    </div>
  );
};

export default Filters;