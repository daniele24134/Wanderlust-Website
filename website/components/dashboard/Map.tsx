import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const Map = () => {
  return (
    <div
      style={{
        backgroundColor: 'red',
      }}
    >
      <MapContainer
        center={[40.8054, -74.0241]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[40.8054, -74.0241]} draggable={true}>
          <Popup>Omar's house</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
