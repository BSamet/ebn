import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

interface CustomInputprops {
  value: string;
  setValue: string;
  placeholder: string;
}

const CustomInput = ({value, setValue, placeholder}: CustomInputprops) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder={placeholder} style={styles.input} value={''} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#0096f0',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {},
});

export default CustomInput;
