import React from 'react';
import Map from './components/Map';
import Axios from 'axios';
import SearchResult from './components/SearchResult';
import Footer from './components/Footer';
import { Navbar } from 'reactstrap';
import styled from 'styled-components';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const AppContainer = styled.div`
  text-align: center;
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  height: 100vh;
`

const AppHeader = styled.header`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const MapContainer = styled.div`
  max-width: 600px;
  max-height: 600px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background-color: #282c34;
`;

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
    <AppContainer className="App">
      <AppHeader className="App-header">        
        <Navbar/>
        <form onSubmit={handleSubmit}>
          <input name={'address'} onChange={e => setAddress(e.target.value)} placeholder={'address'}/>
          <button type={'submit'}>Search</button>
        </form>
      </AppHeader>
      <Main>
        {!selection 
          ? <SearchResult searchResult={searchResult} setSearchResult={setSearchResult} setSelection={setSelection}/>
          : <div>{selection.display_name}
          lon: {selection.lat}
          lat: {selection.lon}</div>
        }
        <MapContainer>
          <Map selection={selection} opts={opts}/>  
        </MapContainer>  
      </Main>
      <Footer/>
    </AppContainer>
  );
}

export default App;
