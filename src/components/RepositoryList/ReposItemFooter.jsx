import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './../Text';
import FormatToThousands from './../../utils/convertToThousands';

const styles = StyleSheet.create({
  footerElements: {
    flexDirection: 'column-reverse',
    alignItems: 'center'
  },
});


const FooterElement = ({ label, value, ...props }) => (
  <View style={styles.footerElements}>
    <Text color='textSecondary' > {label} </Text>
    <Text fontWeight='bold' {...props}> {FormatToThousands(value)} </Text> 
  </View>
);

export default FooterElement;