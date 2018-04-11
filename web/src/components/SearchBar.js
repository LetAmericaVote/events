import React from 'react';
import Rivet from '../hoc/Rivet';
import AlgoliaSearch from '../hoc/AlgoliaSearch';

const SearchBar = (props) => {
  const { queryValue, onType } = props;
  const onChange = (event) => onType(event.target.value);

  return (
    <input type="text" value={queryValue} onChange={onChange} placeholder="search..." />
  );
}

export default AlgoliaSearch(Rivet(SearchBar));
