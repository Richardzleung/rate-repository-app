import React from 'react';
import { Searchbar as SearchBarPaper} from 'react-native-paper';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <SearchBarPaper
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default SearchBar;