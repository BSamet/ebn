import {Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

interface CustomButtontprops {
  text: string;
  onPress(): void;
}

const CustomButton = ({onPress, text}: CustomButtontprops) => {
  return (
    <Pressable onPress={onPress} style={[styles.container]}>
      <Text style={[styles.text]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0096f0',
    width: '75%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#0096f0',
    borderWidth: 1,
  },

  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CustomButton;
