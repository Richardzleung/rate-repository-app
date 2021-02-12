import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import AppBar from './components/AppBar';  
import RepositoryList from './components/RepositoryList';
import SingleRepository from './components/SingleRepository';
import SignIn from './components/SignInForm';
import ReviewForm from './components/ReviewForm';
import SignUpForm from './components/SignupForm';
import useRepositories from './hooks/useRepositories';
 
const styles = StyleSheet.create({ 
  container: {
    display:'flex',
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  const [repositories, setRepositories] = useState(undefined);
  const { repositories: initialRepos } = useRepositories({ orderBy: undefined , orderDirection: undefined });
  
  console.log({initialRepos});
  if (repositories === undefined && initialRepos !== undefined) {
    setRepositories(initialRepos);
  }

  console.log('main',{repositories});
  return (
    <View style={styles.container}>
      <AppBar setRepositories={setRepositories}/>
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
        <Route path="/:id">
          <SingleRepository />
        </Route>
        <Route path="/" exact>
          <RepositoryList repositories={repositories} />
        </Route>
        <Redirect to="/" />
      </Switch>
      
    </View>
  );
};

export default Main;