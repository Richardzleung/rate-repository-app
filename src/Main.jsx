import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';


import { AppBar } from './components';
import { RepositoryList } from './components';
import { SignIn } from './components';

const styles = StyleSheet.create({
  container: {
    display:'flex',
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Redirect to="/" />
      </Switch>
      
    </View>
  );
};

export default Main;