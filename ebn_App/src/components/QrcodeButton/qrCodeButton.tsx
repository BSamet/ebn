import {Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

interface qrCodeButtontprops {
  text: string;
  onPress(): void;
}

const qrCodeButton = ({onPress, text}: qrCodeButtontprops) => {
  return (
    <Pressable onPress={onPress} style={[styles.container]}>
      <Text style={[styles.text]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8AC997',
    width: '65%',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'transparent',
    borderWidth: 1,
    padding: 9,
    marginLeft: 5,
  },

  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default qrCodeButton;
