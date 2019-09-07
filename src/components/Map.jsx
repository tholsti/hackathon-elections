import React, {Component} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

export default class Map extends Component {
  state = {
    viewport: {
      width: '100%',
      height: '100%',
      latitude: 42.663470, 
      longitude: 21.161588,
      zoom: 8
    }
  };

  render() {
    const { selection } = this.props;

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
      </ReactMapGL>
    );
  }
}
