import React from 'react';
import Map from './components/Map';
import Axios from 'axios';
import SearchResult from './components/SearchResult';
import Footer from './components/Footer';
import { Collapse, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler } from 'reactstrap';
import styled from 'styled-components';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const AppContainer = styled.div`
  text-align: center;
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: white;
  height: 100vh;
`

const AppHeader = styled.header`
  width: 100vw;
  padding-top: 76px;
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
  height: 50%;
  width: 90%;
  background-color: #282c34;
`;

const App = () => { 
  const [address, setAddress] = React.useState('');
  const [searchResult, setSearchResult] = React.useState([]);
  const [selection, setSelection] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [view, setView] = React.useState('map');

  const opts = {
      mapbox: mapboxgl,
      style: 'mapbox://styles/atahanc/ck09f2igy1te21cn4xewrs47e',
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await Axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ}&q=${address}&format=json`);
    setSearchResult(result);
  }

  const handleViewChange = newView => {
    setView(newView);
    setIsOpen(false);
  }
  
  return (
    <AppContainer className="App">
        <Navbar color="dark" expand="md" dark style={{ width: '100vw', position: 'fixed' }}>
          <NavbarBrand href="/">Kosovo Elections</NavbarBrand>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)}/>
          <Collapse isOpen={isOpen} navbar>
            {/* <NavItem> */}
                <NavLink onClick={() => handleViewChange('map')}>Map</NavLink>
            {/* </NavItem> */}
            {/* <NavItem> */}
                <NavLink onClick={() => handleViewChange('comments')}>Comments</NavLink>
            {/* </NavItem> */}
          </Collapse>
        </Navbar>
      <AppHeader className="App-header">        
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
      </AppHeader>
      <Main>
        {
          view === 'map' &&
          <Map selection={selection} opts={opts}/>  
        }
        {
          view === 'comments' &&
          'what do you think?'
        }
      </Main>
      <Footer/>
    </AppContainer>
  );
}

export default App;
