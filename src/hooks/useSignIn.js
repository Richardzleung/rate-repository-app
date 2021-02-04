import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useContext } from 'react';

import { AUTHORIZE_USER } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const [authorize, result] = useMutation(AUTHORIZE_USER);
  const authStorage = useContext(AuthStorageContext);
  const client = useApolloClient();

  if (authStorage === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider');
  }

  const signIn = async ({ username, password }) => {
    const { data } = await authorize({ variables: { username, password } });
    authStorage.setAccessToken(data.authorize.accessToken);
    await client.resetStore();
    
    return data;
  };

  return [signIn, result];
};

export default useSignIn;  