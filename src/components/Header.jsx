import React from 'react';

const SearchBar = ({ query, setQuery }) => (
  <div className="search-bar">
    <input 
      type="text" 
      placeholder="Buscar película..." 
      value={query} 
      onChange={(e) => setQuery(e.target.value)} 
    />
  </div>
);

const Header = ({ query, setQuery }) => (
  <header className="header">
    <div className="logo">
      <span style={{ fontSize: '28px' }}>▶</span> Sueño<span>flix</span>
    </div>
    <SearchBar query={query} setQuery={setQuery} />
  </header>
);

export default Header;