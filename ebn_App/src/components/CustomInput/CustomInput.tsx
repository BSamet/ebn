import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

interface CustomInputprops {
  value: string;
  setValue: any;
  placeholder: string;
  secureTextEntry: boolean;
}

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
}: CustomInputprops) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
      />
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
  input: {
    color: 'black',
  },
});

export default CustomInput;
