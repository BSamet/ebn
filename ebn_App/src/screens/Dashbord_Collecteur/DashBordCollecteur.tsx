import React from 'react';
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

export interface dashboardCollecteur {
  Client: string;
  Rue: string;
}
// TODO rendre la list cliquable OnPress() et faire intervenir les données
const DashBordCollecteur = () => {
  const navigation = useNavigation();

  const list = [
    {
      Client: 'Baccio',
      Street: '13 rue de moselle',
      Hour: '10H40',
    },
    {
      Client: 'Winstub Factory',
      Street: '13 rue de moselle',
      Hour: '10H40',
    },
    {
      Client: 'Chez Aness',
      Street: '13 rue de moselle',
      Hour: '10H40',
    },
    {
      Client: 'Merguez Party',
      Street: '13 rue de moselle',
      Hour: '10H40',
    },
    {
      Client: 'KojoSenpai',
      Street: '13 rue de moselle',
      Hour: '10H40',
    },
    {
      Client: 'ChaudFLo',
      Street: '13 rue de moselle',
      Hour: '10H40',
    },
  ];
  const {height} = useWindowDimensions();
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

            <Text style={styles.topText}>Bonjour, Nom Collecteur</Text>
          </LinearGradient>
          <CustomButton
            text={'Flasher QRcode'}
            onPress={() => {
              navigation.navigate('QrCodeScan');
            }}
          />
        </View>
        <Text style={styles.titleText}>Historique de collecte</Text>
        {list.map(item => (
          <View style={styles.body}>
            <Text style={styles.date}>
              {item.Client} {item.Street}
            </Text>
            <Text style={styles.poids}>
              Heure estimé de passage : {item.Hour}
            </Text>
          </View>
        ))}
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
