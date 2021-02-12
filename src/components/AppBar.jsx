import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link, useHistory } from 'react-router-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/react-hooks';


import theme from '../theme';
import Text from './Text';
import { LOGIN } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
import FilterRepositoryMenu from './FilterMenu';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBar.backround,
    opacity: 60,
    flexBasis: 90,
  },
  scrollView: {
    flexDirection: 'row'
  },
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    //justifyContent: 'center',
  },
  sortContainer: {
    alignItems: 'flex-end',
  },
  tabText: {
    color: 'white',
  },
});

const AppBarTab = ({ children, ...props }) => {
  return (
    <Pressable style={styles.tabTouchable} {...props}>
      <View style={styles.tabContainer}>
        <Text fontWeight="bold" style={styles.tabText}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

const AppBar = ({setRepositories}) => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const history = useHistory();

  const { data } = useQuery(LOGIN);
  const authorizedUser = data ? data.authorizedUser : undefined;

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  };

  return (
  <View style={styles.container}>
    <ScrollView style={styles.scrollView} horizontal>
        <Link to="/" component={AppBarTab}> Repositories</Link>
        { authorizedUser
          ? <>
              <Link to="add-review" component={AppBarTab}> Create a review </Link>
              <AppBarTab onPress={onSignOut}>Sign out</AppBarTab> 
            </>
          : <>
              <Link to="/sign-in" component={AppBarTab}>Sign in</Link>  
              <Link to="/sign-up" component={AppBarTab}>Sign Up</Link>
            </>   
        }
        
    </ScrollView>
      <View style={styles.sortContainer}>
        <FilterRepositoryMenu setRepositories={setRepositories}/>
      </View>
  </View>
  );
};

export default AppBar;
