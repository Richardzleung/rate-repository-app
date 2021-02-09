import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from '../Text';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 2,
    marginBottom: 10,
    color:'red',
  },
  entryBoxes: {
    flexBasis: 30,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 3.6,
    paddingLeft: 4,
    //marginBottom: 12
  },
  errorEntryBox: {
    flexBasis: 30,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 3.6,
    paddingLeft: 4
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      {
        <TextInput
          onChangeText={value => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          style={!showError ? styles.entryBoxes : styles.errorEntryBox}
          {...props}
        />
      }
      { showError && 
        <Text style={styles.errorText}>{meta.error}</Text> 
      }
    </>
  );
};

export default FormikTextInput;