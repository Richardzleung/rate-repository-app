import React from 'react';
import { View, Image, StyleSheet, } from 'react-native';

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

const RepositoryItem = ({ item })  => (
  <View style={styles.flexContainer}>

    <View style={{ flexDirection: 'row'}}>
      <SelectImage name={item.fullName} />
      <View style={{marginLeft: 10}}>
          <Text fontWeight='bold'>{item.fullName}</Text>
          <Text color='textSecondary'>{item.description}</Text>

          <View style={styles.languageTagView}>
            <Text languageTag='true'>{item.language}</Text>
          </View>
      </View>
    </View>

    <View style={styles.footerBar}>
      <FooterElement label='Stars' value={item.stargazersCount} />
      <FooterElement label='Forks' value={item.forksCount} />
      <FooterElement label='Reviews' value={item.reviewCount} />
      <FooterElement label='Ratings' value={item.ratingAverage} />
    </View>

  </View>
);

export default RepositoryItem;