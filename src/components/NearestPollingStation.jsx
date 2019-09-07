import React from 'react';
import styled from 'styled-components';

const Nearest = styled.div`
  position: absolute;
  background: beige;
  color: black;
  z-index: 100;
  border: 3px solid black;
  border-radius: 12px;
  padding: 6px;
  top: 120px;
`;

const NearestPollingStation = ({ info }) => (
  <Nearest>
    <p>
      Your nearest polling station:
    </p>
    <p>
      Location: {info && info.properties.location}
    </p>
    <p>
      Distance: {info && info.properties.distanceToPoint.toFixed(1)} km from your location.
    </p>
    {console.log(info)}
  </Nearest>
);

export default NearestPollingStation;
