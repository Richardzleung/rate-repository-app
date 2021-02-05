import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import * as Linking from 'expo-linking';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-native';

import Text from '../Text';
import theme from '../../theme';
import FooterElement from './ReposItemFooter';

import { GET_ONE_REPOSITORY } from '../../graphql/queries';

const styles = StyleSheet.create({
  flexContainer: {
    backgroundColor: 'white',
    padding: 25,
  },
  avatarContainer: {
    flexGrow: 0,
    marginLeft: 5
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 4.5
  },
  languageTagView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  languageText: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    color: theme.colors.white,
    paddingVertical: 3,
    paddingHorizontal: 6
  },
  footerBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});


export const OneRepository = () => {
  const { id } = useParams();
  console.log({ id });
  const { data, loading, error } = useQuery(GET_ONE_REPOSITORY, {
    variables: { id }
  });

  if (loading) return null;  

  console.log({data, loading, url, error});
  const url = id ? data.repository.url : undefined;

  return <RepositoryItem displayButton={id !== undefined} item={data.repository}/>;
};

const RepositoryItem = ({ item, displayButton })  => {
  const {
    description,
    language,
    ownerName,
    name,
    forksCount,
    ratingAverage,
    fullName =  fullName ? fullName : `${ownerName}/${name}`,
    reviewCount,
    stargazersCount,
    url,
    ownerAvatarUrl
  } = item;

  return (
    <View style={styles.flexContainer}>
      <View style={{ flexDirection: 'row'}}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.tinyLogo} />
        </View>
        
        <View style={{marginLeft: 10}}>
            <Text testID='full-name' fontWeight='bold'> {fullName} </Text>
            <Text testID='description' color='textSecondary'>{description}</Text>

            <View style={styles.languageTagView}>
              <Text testID='language' style={styles.languageText}>{language}</Text>
            </View>
        </View>
      </View>

      <View testID='footer' style={styles.footerBar}>
        <FooterElement testID='stars' label='Stars' value={stargazersCount} />
        <FooterElement testID='forks' label='Forks' value={forksCount} />
        <FooterElement testID='reviews' label='Reviews' value={reviewCount} />
        <FooterElement testID='ratings' label='Ratings' value={ratingAverage} />
      </View>

      { displayButton && <Button title='Open in Github' onPress={() => Linking.openURL(url)}/> }
    </View>
  );
};

export default RepositoryItem;