import React from 'react'

const SearchResult = props => {
  console.log(props);
  
  return (
    <>
      {props.searchResult.data && props.searchResult.data.map(r => (
      <div onClick={() => {
        props.setSelection(r);
        props.setSearchResult(null);
        }}
      >
          {r.display_name}
      </div>
      ))}
    </>
  )
}

export default SearchResult;
