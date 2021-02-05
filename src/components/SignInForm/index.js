import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import useSignIn from '../../hooks/useSignIn';

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
      <FormikTextInput testID='usernameField' name="username" placeholder="Username" />
      <FormikTextInput testID='passwordField' name="password" placeholder="Password" secureTextEntry={true}/>
      <Button testID='signOnButton' onPress={onSubmit} title='Sign On' />
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => <UserSignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();
  
  const onSubmit = async (values) => {
    const { username, password } = values;
    await signIn({ username, password });
    history.push("/");
    // console.log({authorize});
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignIn;