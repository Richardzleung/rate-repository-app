import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/react-hooks';
import { View, Button, StyleSheet } from 'react-native';

import FormikTextInput from './SignInForm/FormikTextInput';
import { CREATE_USER } from '../graphql/mutations.js';
import useSignIn from '../hooks/useSignIn.js';

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
  password: '',
  passwordConfirm: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'username must have length between 1 and 30')
    .max(30, 'username must have length between 1 and 30')
    .required('username is required'),
  password: yup
    .string()
    .min(5, 'password length is too short (must be greater than 5 characters)')
    .max(50, 'password lenth is too long (must be less than 50 characters)')
    .required('password is required'),
  passwordConfirm: yup 
    .string()
    .oneOf([yup.ref('password'), null], 'passwords do not match')
    .required('password confirmation is required'),
});

const AddSignUpForm = ({ onSubmit }) => (
  <View style={styles.formContainer}>
    <FormikTextInput name="username" placeholder="Username" />
    <FormikTextInput name="password" placeholder="Password" />
    <FormikTextInput name="passwordConfirm" placeholder="Password Confirmation" />
    <View style={{paddingTop: 10}}>
      <Button onPress={onSubmit} title='Sign Up' />
    </View>
  </View>
);

const SignUpForm = () => {
  const history = useHistory();
  const [create] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, passwordConfirm: password } = values;
    
    try {
      await create({ variables: { 
        input: { 
          username,
          password
      }}});
      await signIn({ username, password });
      history.push(`/`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => <AddSignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUpForm;