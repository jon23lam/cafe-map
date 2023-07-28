import React, { useState, useEffect } from 'react';
import cafeJson from "../database/CafeLocations.json"
import { Cafe } from '../types/Cafe';
import { 
  GoogleMap, 
  Marker,
  MarkerClusterer,
  InfoWindowF,
  useJsApiLoader 
} from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 43.6405,
  lng: -79.3750
};

const INITIAL_ZOOM = 13
const cafeLocations: Array<Cafe> = cafeJson.data.cafes


export function MapPage() {
  const mapsApiKey = process.env.REACT_APP_CAFE_MAP_KEY as string

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const [activeMarker, setActiveMarker] = useState<number| null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapsApiKey
  })


  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    map.setZoom(INITIAL_ZOOM)


    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null)
  }, [])

  const handleActiveMarker = (marker: number) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        onClick={() => setActiveMarker(null)}
        center={center}
        zoom={INITIAL_ZOOM}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
          {cafeLocations.map(({ id, name, address, type, lat, lng }) => (
            <Marker
              key={id}
              position={{lat: lat, lng: lng}}
              onClick={() => handleActiveMarker(id)}
            >
              {activeMarker === id ? (
                <InfoWindowF 
                  position={{lat: lat, lng: lng}}
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <div>{`${name} (${type})`}</div>
                </InfoWindowF>
              ) : null}
            </Marker>
          ))}
      </GoogleMap>
  ) : <></>


}

export default MapPage;