import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import { GET_ONE_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryList/RepositoryItem';
import Text from './Text';
import Subheading from './Subheading';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  separator: {
    height: 10,
  },
  ratingContainer: {
    marginLeft: 5,
    marginRight: 5,
    height: 35,
    width: 35,
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3
  },
  textContainer: {
    marginTop: 4
  }
});

const RepositoryInfo = ({ repository }) => (
  <RepositoryItem displayButton={repository.id !== undefined} item={repository}/>
);

const ReviewItem = ({ review }) => {
  if(!review) return null;
  const {
    text,
    rating,
    user: { username },
    createdAt,
  } = review;
  // Single review item
  const date = format(new Date(createdAt), "MM-dd-yyyy");

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text color='primary'>{rating}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text fontWeight='bold'>{username}</Text>
        <Subheading>{date}</Subheading>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_ONE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });

  const ItemSeparator = () => <View style={styles.separator} />;  
  
  if (loading) return <Text>Loading</Text>;  

  return (
    <FlatList
      data={data.repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
      // ...
    />
  );
};

export default SingleRepository;