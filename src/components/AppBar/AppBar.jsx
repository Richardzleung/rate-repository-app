import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBar.backround,
    opacity: 60,
    flexBasis: 90,
  },
  scrollView: {
    marginHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20
  },
  text: {
    color: theme.appBar.text,
  }
});

export const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal contentContainerStyle={styles.scrollView}>
      <Link to='/' style={{width: 88}} component={TouchableHighlight}>
        <Text style={styles.text}>Repositories</Text>  
      </Link>

      <Link to="/signin" style={{width: 53}} component={TouchableHighlight} activeOpacity={0.8}>
        <Text style={styles.text}>Sign In</Text>
      </Link>
    </ScrollView>
  </View>
  );
};
