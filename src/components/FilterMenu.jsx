import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, Button, Provider } from 'react-native-paper';

import useRepositories from '../hooks/useRepositories';

const FilterRepositoryMenu = ({setRepositories}) => {
  const [visible, setVisible] = useState(false);
  const { repositories: highRatedRepos } = useRepositories({orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'});
  const { repositories: lowRatedRepos } = useRepositories({orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'});
  const { repositories: latestRepos } = useRepositories({orderBy: 'CREATED_AT', orderDirection: 'DESC'});


  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  
  return (
    <Provider>
      <View style={{
        display: 'flex',
        paddingTop: 10,
        paddingBottom: 10, 
        flexDirection: 'row',
        zIndex: 3
        }}>
        <Menu visible={visible} onDismiss={closeMenu} anchor={<Button onPress={openMenu}>Select an item...</Button>}>
          <Menu.Item onPress={() => setRepositories(latestRepos)} title="Latest Repositories" />
          <Menu.Item onPress={() => setRepositories(highRatedRepos)} title="Highest Rated Repositories" />
          <Menu.Item onPress={() => setRepositories(lowRatedRepos)} title="Lowest Rated Repositories" />
        </Menu>
      </View>
    </Provider>
  );
};

export default FilterRepositoryMenu;