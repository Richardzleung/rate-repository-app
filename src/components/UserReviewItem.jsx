import React from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/react-hooks';
import { format } from 'date-fns';

import Text from './Text';
import Subheading from './Subheading';
import theme from '../theme';
import { DELETE_REVIEW } from '../graphql/mutations';

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
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  buttonSpacing: {
    marginRight: 5
  },
  textContainer: {
    marginTop: 4
  }
});

const UserReviewItem = ({ review }) => {
  const history = useHistory();
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const {
    text,
    rating,
    createdAt,
    repository: {
      fullName = 'name not found',
      id = 'id not found'
    },
  } = review;

  const date = format(new Date(createdAt), "MM-dd-yyyy");

  const deleteReviewAlert = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
         // style
        },
        { 
          text: "Delete",
          onPress: () => deleteReview({variables: { id}}),
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text color='primary'>{rating}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text fontWeight='bold'>{fullName}</Text>
        <Subheading>{date}</Subheading>
        <Text>{text}</Text>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonSpacing} >
            <Button title='View Repository' onPress={() => history.push(`/${id}`)}/>
          </View>
          <Button title='Delete review' onPress={deleteReviewAlert} color='red'/>
        </View>
        
      </View>
    </View>
  );
};

export default UserReviewItem;