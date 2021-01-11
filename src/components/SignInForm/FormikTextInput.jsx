import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from '../Text';

const styles = StyleSheet.create({
  errorView: {
    flexBasis: 30,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 3.6,
  },
  errorText: {
    marginTop: 5,
    color:'red',
  },
  entryBoxes: {
    flexBasis: 30,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 3.6,
    //marginBottom: 12
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      {!showError && 
        <TextInput
          onChangeText={value => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          style={styles.entryBoxes}
          {...props}
        />
      }
      {
        <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={styles.errorView}
        {...props}
        /> &&
        <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;