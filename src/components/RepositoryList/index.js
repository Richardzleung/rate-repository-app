import React from 'react';
import { FlatList, View, StyleSheet, TouchableHighlight } from 'react-native';
import { useHistory, useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { GET_ONE_REPOSITORY } from './../../graphql/queries';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    
  },
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories, displayButton, url }) => {
  const history= useHistory();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;  

  return (
    <FlatList
      data={repositoryNodes}
      style={styles.container}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={repository => repository.id}
      testID='flat-list'
      renderItem={({item}) => (
        <TouchableHighlight onPress={() => history.push(`/${item.id}`)}>
          <RepositoryItem displayButton={displayButton} url={url} item={item} />
        </TouchableHighlight>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_ONE_REPOSITORY, {
    variables: { id },
    errorPolicy: 'ignore'
  });
  const url = data ? data.repository.url : undefined;

  if (loading) return 'loading';
  console.log({data, loading, error, url});
  return <RepositoryListContainer 
    displayButton={id !== undefined} 
    url={url}
    repositories={repositories} 
  />;
};

export default RepositoryList;