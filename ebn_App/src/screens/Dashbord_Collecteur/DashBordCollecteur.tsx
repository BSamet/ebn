import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import CustomButton from '../../components/CustomButton';

import {AuthRootParamList} from '../../Navigation/RouteNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';

import axios from 'axios';

type AuthScreenNavigate = NativeStackNavigationProp<AuthRootParamList>;
interface EtapeCollecteur {
  id: number;
  date: string;
  isCollected: boolean;
  commentaire: string;
  client: {
    id: number;
    siret: number;
    nomCommercial: string;
    adresse: string;

    utilisateur: {
      id: number;
      role: string;
      utilisateur: string;
      password: string;
      nom: string;
      prenom: string;
      mail: string;
      telephone: string;
    };
  };
  collecteur: {
    id: number;
    numeroCollecteur: number;
    numeroVelo: number;
    utilisateur: {
      id: number;
      role: string;
      utilisateur: string;
      password: string;
      nom: string;
      prenom: string;
      mail: string;
      telephone: string;
    };
  };
}

// type EtapeCollecteurs = EtapeCollecteur[] | any;

// TODO rendre la list cliquable OnPress() et faire intervenir les données
const DashBordCollecteur = () => {
  const navigation = useNavigation<AuthScreenNavigate>();

  const {height} = useWindowDimensions();
  const [etapes, setEtapes] = useState<EtapeCollecteur>();
  const [fetchOnce, setFetchOnce] = useState(true);

  useEffect(() => {
    if (fetchOnce) {
      axios.get('http://10.8.251.221:5454/etape/1').then(res => {
        // appel de l'api

        setEtapes(res.data);
        console.warn(res.data);

        // on cherche une seul fois
        setFetchOnce(false);
      });
    }
  }, [etapes, fetchOnce]);

  return (
    <ScrollView>
      <View style={styles.page}>
        <View style={styles.header}>
          <LinearGradient
            colors={['#8AC997', '#0096f0']}
            start={{
              x: 0,
              y: 1,
            }}
            end={{
              x: 1,
              y: 2,
            }}
            style={styles.box}>
            <Image
              source={Logo}
              style={[styles.Logo, {height: height * 0.3}]}
              resizeMode="contain"
            />
            {/* TODO remetre les map une fois le query builder tourné par ID collecteur */}
            {/* {etapes?.map(showName => ( */}
            <Text style={styles.topText}>
              Bonjour,{etapes?.collecteur.utilisateur.nom}
            </Text>
            {/* ))} */}
          </LinearGradient>
          <CustomButton
            text={'Flasher QRcode'}
            onPress={() => {
              navigation.navigate('QrCodeScan');
            }}
          />
        </View>
        <Text style={styles.titleText}>Historique de collecte</Text>
        {/* TODO remetre les map une fois le query builder tourné par ID collecteur */}
        {/* {etapes?.map(data => ( */}
        <View style={styles.body}>
          <Text style={styles.date}>{etapes?.client.nomCommercial}</Text>

          <Text style={styles.poids}>
            Heure estimé de passage : {etapes?.date}{' '}
          </Text>
        </View>
        {/* ))} */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {},
  box: {
    width: '100%',
    height: 200,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  page: {
    backgroundColor: '#FFFFFF',
  },
  header: {},

  topText: {
    color: 'black',
    fontSize: 20,
    marginLeft: 20,
    fontFamily: 'Confortaa-Bold',
  },

  Logo: {
    width: '70%',
    height: 175,
    maxHeight: 150,
    marginLeft: 120,
  },
  body: {
    paddingHorizontal: 30,
    marginVertical: 15,
    marginRight: 20,
  },
  titleText: {
    fontSize: 22,
    marginTop: 20,
    paddingHorizontal: 10,
    color: 'black',
    fontFamily: 'Confortaa-Regular',
  },
  date: {
    fontSize: 18,
    color: '#8AC997',
    fontFamily: 'Confortaa-Regular',
  },
  poids: {
    color: 'black',
    marginLeft: 10,
    fontFamily: 'Confortaa-Bold',
    fontSize: 16,
  },
});

export default DashBordCollecteur;
