import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  Alert,
} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import ButtonMdpForgot from '../../components/ButtonMdpForgot';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {AuthRootParamList} from '../../../App';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {HOST_BACK} from '../../../environment/environment';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthScreenNavigate = NativeStackNavigationProp<AuthRootParamList>;

const SignInScreen = () => {
  const navigation = useNavigation<AuthScreenNavigate>();
  // const [passwordForgot, setpasswordForgot] = useState(''); // TODO redirection vers modal reset password
  const {height} = useWindowDimensions();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    clearAll().then(() => {});
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const login = () => {
    axios
      .post(HOST_BACK + '/utilisateurs/login', {
        mail: mail.trim(),
        password: password,
      })
      .then(async (res: {data: {access_token: string}}) => {
        const decode: any = jwt_decode(res.data.access_token);

        await AsyncStorage.setItem('role', decode.utilisateur.role);
        await AsyncStorage.setItem('prenom', decode.utilisateur.prenom);
        await AsyncStorage.setItem('nom', decode.utilisateur.nom);
        await AsyncStorage.setItem('token', res.data.access_token);
        await AsyncStorage.setItem('token_exp', JSON.stringify(decode.exp));

        if (decode.utilisateur.role === 'Client') {
          axios
            .post(
              HOST_BACK + '/client/mail',
              {mail: decode.utilisateur.mail},
              {
                headers: {
                  Authorization: `Bearer ${res.data.access_token}`,
                },
              },
            )
            .then(async resCli => {
              await AsyncStorage.setItem('id', resCli.data.id.toString());
            })
            .finally(() => {
              navigation.navigate('Client');
            });
        } else if (decode.utilisateur.role === 'Collecteur') {
          axios
            .post(
              HOST_BACK + '/collecteur/mail',
              {mail: decode.utilisateur.mail},
              {
                headers: {
                  Authorization: `Bearer ${res.data.access_token}`,
                },
              },
            )
            .then(async resCol => {
              await AsyncStorage.setItem('id', resCol.data.id.toString());
            })
            .catch(e => {
              console.log(e);
            })
            .finally(() => {
              navigation.navigate('Collecteur');
            });
        } else {
          Alert.alert(
            'Veuillez vous connecter avec vos login de client ou de collecteur',
          );
        }
      })
      .catch(res => {
        Alert.alert("Une erreur c'est produite lors de la connexion");
      });
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
        value={mail}
        setValue={setMail}
        placeholder="Adresse Email"
        secureTextEntry={false}
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={e => setMail(e.target.value)}
      />
      <CustomInput
        value={password}
        setValue={setPassword}
        placeholder="Mot de Passe"
        secureTextEntry={true}
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={e => setPassword(e.target.value)}
      />
      <CustomButton text={'Connexion'} onPress={login} />
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
