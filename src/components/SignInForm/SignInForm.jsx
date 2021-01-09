import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  signIn: {
    backgroundColor: 'white',
  }
});

const initialValues = {
  username: '',
  password: '',
};

const UserSignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.signIn}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" />
      <Button onPress={onSubmit} title='Sign On'/>
    </View>
  );
};

export const SignIn = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <UserSignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};
