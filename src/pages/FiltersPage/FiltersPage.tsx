import React, { useState, useEffect } from 'react';


import "./FiltersPage.scss"


export type FiltersPageProps = {
  onChange: (filters: Array<string>) => void;
};

export function FiltersPage({onChange}: FiltersPageProps) {
  const [filters, setFilters] = useState<Array<string>>([]);

  function onCheckboxClicked (type: string) {
    var newFilters
    const filterIndex = filters.indexOf(type)
    if (filterIndex == -1) {
      newFilters = filters.concat(type)
      setFilters(newFilters)
    } else {
      newFilters = filters.slice()
      newFilters.splice(filterIndex, 1)
      setFilters(newFilters)
    }

    onChange(newFilters)
  }

  return (
    <div
      className="FiltersPage"
    >
      <div className="FiltersPage__item">
        <input type="checkbox" id="bakery" onChange={() => onCheckboxClicked("Bakery")} />
        <h3>Bakery</h3>
      </div>
      <div className="FiltersPage__item">
        <input type="checkbox" id="korean_cafe" onChange={() => onCheckboxClicked("Korean Cafe")} />
        <h3>Korean Cafe</h3>
      </div>
      <div className="FiltersPage__item">
        <input type="checkbox" id="study" onChange={() => onCheckboxClicked("Study Spot")} />
        <h3>Study Spot</h3>
      </div>
      <div className="FiltersPage__item">
        <input type="checkbox" id="cakes" onChange={() => onCheckboxClicked("Patisserie/Cakes")} />
        <h3>Patisserie/Cakes</h3>
      </div>
    </div>
  )
}

export default FiltersPage;