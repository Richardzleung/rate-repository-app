import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TouchableHighlight } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import SearchBar from '../SearchBar';
import SortMenu from '../SortMenu';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  separator: {
    height: 10,
  },
  header: {
    zIndex: 1
  }
});

export class RepositoryListContainer extends React.Component {
  renderHeader = () => (
    <>
      <SortMenu setRepositories={this.props.setRepositories}/>   
      <SearchBar searchQuery={this.props.searchQuery} setSearchQuery={this.props.setSearchQuery}/>
    </>
  );

  render() {
    const { repositories, history, onEndReach } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    // console.log(repositoryNodes.map(e => e.id));
    const ItemSeparator = () => <View style={styles.separator} />;  

    return (
      <FlatList
      data={repositoryNodes}
      style={styles.container}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={repository => repository.id}
      ListHeaderComponent={this.renderHeader}
      ListHeaderComponentStyle={styles.header}
      renderItem={({item}) => (
        <TouchableHighlight onPress={() => history.push(`/${item.id}`)}>
          <RepositoryItem item={item} />
        </TouchableHighlight>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0}
      />
    );
  }
}

const RepositoryList = () => {
  const [repositories, setRepositories] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  const [value] = useDebounce(searchQuery, 800);

  const { repositories: data, fetchMore } = useRepositories({
    first: 8,
    searchKeyword: value
  });

  useEffect(() => {
    if (data) {
      setRepositories(data);
    }
  }, [data]);
  
  const onEndReach = () => {
    console.log('reached');
    fetchMore();
  };

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      setRepositories={setRepositories}
      history={history}
      onEndReach={onEndReach}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      />
  );
};

export default RepositoryList;

