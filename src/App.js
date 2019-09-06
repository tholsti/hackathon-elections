import React from 'react';
import './App.css';
import Map from './components/Map';
import Axios from 'axios';
import SearchResult from './components/SearchResult';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const App = () => { 
  const [address, setAddress] = React.useState('');
  const [searchResult, setSearchResult] = React.useState([]);
  const [selection, setSelection] = React.useState(null);

  const opts = {
      mapbox: mapboxgl,
      style: 'mapbox://styles/mapbox/streets-v9',
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await Axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ}&q=${address}&format=json`);
    setSearchResult(result);
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
          {!selection 
            ? <SearchResult searchResult={searchResult} setSearchResult={setSearchResult} setSelection={setSelection}/>
            : <div>{selection.display_name}
            lon: {selection.lat}
            lat: {selection.lon}</div>
            }
          
          <Map opts={opts}/>
      </header>
    </div>
  );
}

export default App;
