import React from 'react';
import './App.css';
import Map from './components/Map';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

function App() {
  React.useEffect(() => {
    console.log(process.env)
  })
  const opts = {
      mapbox: mapboxgl,
      style: 'mapbox://styles/mapbox/streets-v9',
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  }
  
  return (
    <div className="App">
      <header className="App-header">        
        <p>
          Kosovo elections
        </p>        
          Here be map        
          <Map opts={opts}/>
      </header>
    </div>
  );
}

export default App;
