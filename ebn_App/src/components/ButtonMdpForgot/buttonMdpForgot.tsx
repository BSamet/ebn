import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface buttonMdpForgotProps {
  text: string;
  onPress(): void;
}

const buttonMdpForgot = ({onPress, text}: buttonMdpForgotProps) => {
  // eslint-disable-next-line no-lone-blocks
  {
    return (
      <Pressable onPress={onPress} style={[styles.container]}>
        <Text style={[styles.text]}> {text} </Text>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    color: '#0096f0',
  },
});

export default buttonMdpForgot;
