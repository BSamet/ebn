import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import ButtonMdpForgot from '../../components/ButtonMdpForgot';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

const SignInScreen = () => {
  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [passwordForgot, setpasswordForgot] = useState('');
  const {height} = useWindowDimensions();
  const onSignInPressed = () => {
    console.warn('Connecter');
  };
  const onSignUpPressed = () => {
    console.warn('Inscrit !');
  };
  const onForgotPasswordPressed = () => {
    console.warn('Mot de passe oublié');
  };
  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.Logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <CustomInput
        value={userMail}
        setValue={setUserMail}
        placeholder="Adresse Email"
        secureTextEntry={false}
      />
      <CustomInput
        value={userPassword}
        setValue={setUserPassword}
        placeholder="Mot de Passe"
        secureTextEntry={true}
      />
      <CustomButton text={'Connexion'} onPress={onSignInPressed} />
      <CustomButton text={'Inscription'} onPress={onSignUpPressed} />
      <ButtonMdpForgot
        text={'Mot de passe oublié'}
        onPress={onForgotPasswordPressed}
      />
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
