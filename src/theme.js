import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: '#FFFFFF',
  },
  appBar: {
    backround: '#24292e',
    text: '#d4af37'
  },
  fontSizes: {
    body: 14,
    subheading: 13,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      main: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  roundness: 3
};

export default theme;