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
    backgroundColor: '#0096f0',
    width: '35%',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#0096f0',
    borderWidth: 1,
    padding: 2,
    marginLeft: 120,
  },

  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default qrCodeButton;
