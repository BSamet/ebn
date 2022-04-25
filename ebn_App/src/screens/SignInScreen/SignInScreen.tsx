import React from 'react';
import {View, StyleSheet, Text, Image, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.Logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <CustomInput value={''} setValue={''} placeholder="Adresse Email" />
      <CustomInput value={''} setValue={''} placeholder="Mot de Passe" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  Logo: {
    width: '70%',
    height: 175,
    maxHeight: 200,
  },
});

export default SignInScreen;
