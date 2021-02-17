import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, Button, Provider } from 'react-native-paper';

import useRepositories from '../hooks/useRepositories';

const SortRepositoryMenu = ({ setRepositories }) => {
  const [visible, setVisible] = useState(false);
  const { repositories: highRatedRepos } = useRepositories({orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'});
  const { repositories: lowRatedRepos } = useRepositories({orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'});
  const { repositories: latestRepos } = useRepositories({orderBy: 'CREATED_AT', orderDirection: 'DESC'});

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  
  const setLatest = () => {
    setRepositories(latestRepos);
    closeMenu();
  };

  const setHighest = () => {
    setRepositories(highRatedRepos);
    closeMenu();
  };

  const setLowest = () => {
    setRepositories(lowRatedRepos);
    closeMenu();
  };
  
  return (
    <Provider>
      <View>
        <Menu 
          visible={visible} 
          onDismiss={closeMenu} 
          anchor={<Button onPress={openMenu}> Select an item</Button>}>
          <Menu.Item onPress={setLatest} title="Latest Repositories" />
          <Menu.Item onPress={setHighest} title="Highest Rated Repositories" />
          <Menu.Item onPress={setLowest} title="Lowest Rated Repositories" />
        </Menu>
      </View>
    </Provider>
  );
};

export default SortRepositoryMenu;