import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import React, {useState} from 'react';
import {View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import ButtonMdpForgot from '../../components/ButtonMdpForgot';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {AuthRootParamList} from '../../Navigation/RouteNavigator';

type AuthScreenNavigate = NativeStackNavigationProp<AuthRootParamList>;

const SignInScreen = () => {
  const navigation = useNavigation<AuthScreenNavigate>();
  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  // const [passwordForgot, setpasswordForgot] = useState(''); // TODO redirection vers modal reset password
  const {height} = useWindowDimensions();

  // const onSignUpPressed = () => {
  //   console.warn('Inscrit !');
  // };
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
      <CustomButton
        text={'Connexion'}
        onPress={() => {
          navigation.navigate('Client');
        }}
      />
      <CustomButton
        text={'Inscription'}
        onPress={() => {
          navigation.navigate('Collecteur');
        }}
      />
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
    flex: 1,
    backgroundColor: '#8AC997',
  },
  Logo: {
    width: '70%',
    height: 175,
    maxHeight: 200,
  },
});

export default SignInScreen;
