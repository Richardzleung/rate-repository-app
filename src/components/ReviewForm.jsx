import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/react-hooks';
import { View, Button, StyleSheet } from 'react-native';

import FormikTextInput from './SignInForm/FormikTextInput';
import { CREATE_REVIEW } from '../graphql/mutations.js';

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    paddingLeft: '15%',
    paddingRight: '15%',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
});

const initialValues = {
  username: '',
  name: '',
  rating: '',
  review: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is required'),
  name: yup
    .string()
    .required('password is required'),
  rating: yup 
    .number()
    .min(0, 'rating must be greater than 0')
    .max(100, 'rating must be less than 100')
    .required('rating is required'),
  review: yup 
    .string(),
});

const AddReviewForm = ({ onSubmit }) => (
  <View style={styles.formContainer}>
    <FormikTextInput name="username" placeholder="Username" />
    <FormikTextInput name="name" placeholder="Name" />
    <FormikTextInput name="rating" placeholder="Rating" />
    <FormikTextInput name="review" placeholder="Review" multiline="true" />
    <View style={{paddingTop: 10}}>
      <Button onPress={onSubmit} title='Add Review' />
    </View>
  </View>
);

const ReviewForm = () => {
  const history = useHistory();
  const [create] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    const { username, name, rating, review } = values;
    try {
      const { data: { createReview: { repositoryId }} = { createReview: { repositoryId: 'something wrong'}}} = 
      await create({ variables: { 
        input: { 
          ownerName: username, 
          repositoryName: name, 
          rating: Number(rating), 
          text: review 
      }}});
      history.push(`/${repositoryId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => <AddReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default ReviewForm;