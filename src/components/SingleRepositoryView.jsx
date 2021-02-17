import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import useRepository from '../hooks/useRepository';
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

const RepositoryHeader = ({ repository }) => (
  <RepositoryItem displayButton={repository !== undefined} item={repository}/>
);

const ReviewItem = ({ review }) => {
  const {
    text,
    rating,
    createdAt,
    user,
  } = review;

  const username = user ? user.username : '';
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

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository({ 
    id, 
    first: 2
  });

  if (loading) return <Text>loading...</Text>;

  const reviewNodes = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  if (reviewNodes) console.log(reviewNodes.map(u => u.user.username));
  
  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  }; 

  const ItemSeparator = () => <View style={styles.separator} />;  

  return (
    <FlatList
      data={reviewNodes}
      renderItem={ node => <ReviewItem review={node.item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={ node => node.id}
      ListHeaderComponent={() => <RepositoryHeader repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.3}
      // ...
    />
  );
};

export default SingleRepositoryView;