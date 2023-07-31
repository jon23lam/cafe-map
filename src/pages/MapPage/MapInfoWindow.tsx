import React, { useState, useEffect } from 'react';

import "./MapPageInfoWindow.scss"


export type MapInfoWindowProps = {
  name: string;
  type: string;
  address: string
};

export function MapInfoWindow({ name, type, address }: MapInfoWindowProps ) {


  return (
    <div
      className="MapInfoWindow"
    >
      <h2><u>{`${name} (${type})`}</u></h2>
      <h3>{`Address: ${address}`}</h3>
    </div>
  )
}

export default MapInfoWindow;