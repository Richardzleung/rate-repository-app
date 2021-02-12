import React from 'react';
import { FlatList, View, StyleSheet, TouchableHighlight } from 'react-native';
import { useHistory } from 'react-router-native';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    zIndex: -1
  },
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;  
  // console.log({repositoryNodes});
  return (
    <FlatList
      data={repositoryNodes}
      style={styles.container}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={repository => repository.id}
      testID='flat-list'
      renderItem={({item}) => (
        <TouchableHighlight onPress={() => history.push(`/${item.id}`)}>
          <RepositoryItem item={item} />
        </TouchableHighlight>
      )}
    />
  );
};

const RepositoryList = ({ repositories }) => {
  
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;