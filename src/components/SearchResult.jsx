import React from 'react';
import styled from 'styled-components';

const Results = styled.div`
  position: absolute;
  position: absolute;
    background: black;
    width: 90vw;
    z-index: 100;
    left: -162px;
    `;

const Container = styled.div`
  position: relative;
  `;

const Result = styled.div`
  cursor: pointer;
  padding-bottom: 6px;
`;

const SearchResult = props => {
  
  return (
    <Container>
      <Results>
        {props.searchResult.data && props.searchResult.data.map(r => (
        <Result onClick={() => {
          props.setSelection(r);
          props.setSearchResult(null);
          }}
        >
          {r.display_name}
        </Result>
        ))}
      </Results>
    </Container>
  )
}

export default SearchResult;
