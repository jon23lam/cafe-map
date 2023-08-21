import React, { useState, useEffect } from 'react';
import { SVG_MAP } from '../../assets/svgs';
import { Toggle } from "../../controls/Toggle"

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
        <Toggle 
          text="Bakery"
          icon={SVG_MAP["Sweet Treats"]}
          onClick={onCheckboxClicked}
        />
      </div>
      <div className="FiltersPage__item">
        <Toggle 
          text="Korean Cafe"
          icon={SVG_MAP["Sweet Treats"]}
          onClick={onCheckboxClicked}
        />
      </div>
      <div className="FiltersPage__item">
        <Toggle 
          text="Study Spot"
          icon={SVG_MAP["Sweet Treats"]}
          onClick={onCheckboxClicked}
        />
      </div>
      <div className="FiltersPage__item">
        <Toggle 
          text="Patisserie/Cakes"
          icon={SVG_MAP["Sweet Treats"]}
          onClick={onCheckboxClicked}
        />
      </div>
    </div>
  )
}

export default FiltersPage;