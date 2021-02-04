import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import * as Linking from 'expo-linking';

import Text from '../Text';
import FooterElement from './ReposItemFooter';

import Jerry from '@images/Jerry.webp';
import Django from '@images/django.png';
import Redux from '@images/redux-283024.png';
import Rails from '@images/tech_rubyonrails.png';

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 4.5
  },
  flexContainer: {
    display: 'flex',
    paddingTop: 25,
  },
  languageTagView: {
    alignItems: 'baseline',
  },
  footerBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

const SelectImage = ({ name }) => {
  let image = null;
  switch (name) {
    case 'jaredpalmer/formik':
      image = Jerry;
      break;
    case 'rails/rails':
      image = Rails;
      break;
    case 'django/django':
      image = Django;
      break;
    case 'reduxjs/redux':
      image = Redux;
      break;
    default:
      return null;
  }
  return (
    <Image 
      style={styles.tinyLogo}
      source={image}
    />
  );
};

const RepositoryItemContainer = ({ item, displayButton, url })  => {
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
  } = item;

  return (
    <View style={styles.flexContainer}>
      <View style={{ flexDirection: 'row'}}>
        <SelectImage name={`${ownerName}/${name}`} />
        <View style={{marginLeft: 10}}>
            <Text testID='full-name' fontWeight='bold'> {fullName} </Text>
            <Text testID='description' color='textSecondary'>{description}</Text>

            <View style={styles.languageTagView}>
              <Text testID='language' languageTag='true'>{language}</Text>
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

export default RepositoryItemContainer;