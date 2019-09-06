import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';

export default class Map extends Component {

  state = {
    viewport: {
      width: '100vw',
      height: '100vh',
      latitude: 42.663470, 
      longitude: 21.161588,
      zoom: 8
    }
  };

  componentDidMount() {
    if (window.innerWidth > 600) {
      this.setState({
        ...this.state,
        viewport: {
          ...this.state.viewport,          
          width: '600px',
          height: '600px',
        }          
      });
    } else {
      this.setState({
        viewport: {
          width: '100vw',
          height: '100vh',
        }
      })
    }
  }


  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}  
      />
    );
  }
}
