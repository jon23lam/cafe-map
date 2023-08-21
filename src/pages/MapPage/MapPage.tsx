import React, { useState, useEffect } from 'react';
import cafeJson from "../../database/CafeLocations.json"
import { Cafe } from '../../types/Cafe';
import { MapInfoWindow } from "./MapInfoWindow"
import { IceCreamPin } from '../../assets/svgs';
import {
  GoogleMap, 
  Marker,
  MarkerClusterer,
  InfoWindowF,
  useJsApiLoader 
} from '@react-google-maps/api';

const containerStyle = {
  width: '80vw',
  height: '100vh'
};


const center = {
  lat: 43.6405,
  lng: -79.3750
};

const tmpCafes = cafeJson.data.cafes
const INITIAL_ZOOM = 13

const mapsApiKey = process.env.REACT_APP_CAFE_MAP_KEY as string

export type MapPageProps = {
  filters: Array<string>
}

export function MapPage({filters}: MapPageProps) {

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<number| null>(null);
  const [cafeLocations, setCafeLocations] = useState<Array<Cafe>>(cafeJson.data.cafes)

  useEffect(() => {
    if (filters.length > 0) {
      const filteredCafes = cafeJson.data.cafes.filter(cafe => filters.includes(cafe.type))
      setCafeLocations(filteredCafes)
    } else {
      setCafeLocations(cafeJson.data.cafes)
    }
  }, [filters])

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

  function handleActiveMarker(marker: number) {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  function renderMarkers (clusterer: any) {
    return cafeLocations.map((cafe) => (
        <Marker
          key={cafe.id}
          position={{lat: cafe.lat, lng: cafe.lng}}
          onClick={() => handleActiveMarker(cafe.id)}
          clusterer={clusterer}
          icon={{url: IceCreamPin}}
        >
          {activeMarker === cafe.id ? (
            <InfoWindowF 
              position={{lat: cafe.lat, lng: cafe.lng}}
              onCloseClick={() => setActiveMarker(null)}
            >
              <MapInfoWindow 
                name={cafe.name}
                type={cafe.type}
                address={cafe.address}
              />
            </InfoWindowF>
          ) : null}
        </Marker>
      ))
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        onClick={() => setActiveMarker(null)}
        center={center}
        zoom={INITIAL_ZOOM}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {(clusterer) => <div>{renderMarkers(clusterer)}</div>}
        </MarkerClusterer>
      </GoogleMap>
  ) : <></>


}

export default MapPage;