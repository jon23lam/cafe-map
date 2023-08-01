import React, { useState } from 'react';
import logo from './logo.svg';
import { MapPage } from "./pages/MapPage/MapPage"
import { FiltersPage } from "./pages/FiltersPage/FiltersPage" 

import './App.scss';

function App() {
  
  const [filters, setFilters] = useState<Array<string>>([])

  function onFiltersChange (filters: Array<string>) {
    setFilters(filters)
  }

  return (
    <div className="App">
      <div className="App__map">
        <MapPage filters={filters}/>
      </div>
      <div className="App__filters">
        <FiltersPage onChange={onFiltersChange}/>
      </div>
    </div>
  );
}

export default App;
