import React from 'react';
import './App.css';
import Map from './components/Map';
import Axios from 'axios';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const App = () => { 
  const [address, setAddress] = React.useState('');

  const opts = {
      mapbox: mapboxgl,
      style: 'mapbox://styles/mapbox/streets-v9',
  }

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(e.target.value)
    const result = await Axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ}&q=${address}&format=json`)
    
    console.log(result)
  }
  
  return (
    <div className="App">
      <header className="App-header">        
        <p>
          Kosovo elections
        </p>        
          <form onSubmit={handleSubmit}>
            <input name={'address'} onChange={e => setAddress(e.target.value)} placeholder={'address'}/>
            <button type={'submit'}>Search</button>
          </form>
          Here be map        
          <Map opts={opts}/>
      </header>
    </div>
  );
}

export default App;
