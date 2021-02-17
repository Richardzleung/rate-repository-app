import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import { GET_AUTHORIZED_USER } from '../graphql/queries';
import UserReviewItem from './UserReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const UserReview = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews: true }
  });

  const reviewNodes = data
    ? data.authorizedUser.reviews.edges.map(edge => edge.node)
    : [];
    
  const ItemSeparator = () => <View style={styles.separator} />;  

  return (
    <FlatList 
      data={reviewNodes}
      keyExtractor={repository => repository.id}
      renderItem={({ item }) => <UserReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      />
  );
};

export default UserReview;