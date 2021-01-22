import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './../Text';

const styles = StyleSheet.create({
  footerElements: {
    flexDirection: 'column-reverse',
    alignItems: 'center'
  },
});

const convertToThousands = starCount => {
  if (starCount && starCount > 1000) {
    return `${(starCount / 1000).toFixed(1)}k`;
  }
  return starCount;
};

const FooterElement = ({ label, value }) => (
  <View style={styles.footerElements}>
    <Text color='textSecondary'>
      {label} 
    </Text>
    <Text fontWeight='bold'>
      {convertToThousands(value)}
    </Text> 
  </View>
);

export default FooterElement;