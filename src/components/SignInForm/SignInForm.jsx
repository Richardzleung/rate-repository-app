import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  signIn: {
    backgroundColor: 'white',
    paddingLeft: '15%',
    paddingRight: '15%',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  signinButton: {
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 3.6,
    backgroundColor: 'blue'
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is required'),
  password: yup
    .string()
    .required('password is required'),
});

const UserSignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.signIn}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true}/>
      <Button onPress={onSubmit} title='Sign On' />
    </View>
  );
};

export const SignIn = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => <UserSignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};
