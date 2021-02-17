import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import AppBar from './components/AppBar';  
import RepositoryList from './components/RepositoryList';
import SingleRepositoryView from './components/SingleRepositoryView';
import SignIn from './components/SignInForm';
import ReviewForm from './components/ReviewForm';
import SignUpForm from './components/SignupForm';
import UserReviews from './components/UserReviews';
 
const styles = StyleSheet.create({ 
  container: {
    display:'flex',
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Switch>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/add-review">
          <ReviewForm />
        </Route>
        <Route path="/sign-up">
          <SignUpForm />
        </Route>
        <Route path="/my-review">
          <UserReviews />
        </Route>
        <Route path="/:id">
          <SingleRepositoryView />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
      
    </View>
  );
};

export default Main;