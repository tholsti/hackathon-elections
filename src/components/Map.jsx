import React, {Component} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import pollingStations from '../assets/poll_location.json';
import pollingImg from '../assets/polling.png';
import styled from 'styled-components';

const PollingMarker = styled.img`
  width: 20px;
  height: 20px;
`

export default class Map extends Component {
  handleClick = station => {
    this.setState({ station })
  };

  state = {
    viewport: {
      width: '100%',
      height: '100%',
      latitude: 42.663470, 
      longitude: 21.161588,
      zoom: 8
    },
    station: {},
  };

  render() {
    const { selection, nearestPollingStation } = this.props;

    return (
      <ReactMapGL
        {...this.state.viewport}
        mapStyle={this.props.opts.style}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}  
      >
        {this.props.selection &&
          <Marker latitude={Number(selection.lat)} longitude={Number(selection.lon)} offsetLeft={-20} offsetTop={-10}>
            <div style={{ color: 'red', border: '1px solid black' }}>You are here</div>
          </Marker>
        }
        {
          this.props.nearestPollingStation &&          
           <Marker latitude={Number(nearestPollingStation.geometry.coordinates[0])} longitude={Number(nearestPollingStation.geometry.coordinates[1])} offsetLeft={-20} offsetTop={-10}>
            <PollingMarker src={pollingImg} style={{ padding: '3px', border: '2px solid red' }}/>
           </Marker>
        }
        {
          pollingStations.map(p => (
            <Marker latitude={Number(p.lat)} longitude={Number(p.lon)} offsetLeft={-20} offsetTop={-10}>
              <PollingMarker src={pollingImg} onClick={() => this.handleClick(p)}/>
            </Marker>)
          )
        }
      </ReactMapGL>
    );
  }
}
