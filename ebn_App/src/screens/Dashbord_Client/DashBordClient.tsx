import React from 'react';
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
import PopUp from '../../components/popUp';

export interface dashboardClient {
  Day: string;
  Month: string;
  Year: string;
}

// TODO rendre la list cliquable OnPress() et faire intervenir les données
const DashBordClient = () => {
  const list = [
    {
      Day: 'Vendredi 13',
      Month: 'Novembre',
      Year: '2022',
      weight: 67,
    },
    {
      Day: 'Samedi 14',
      Month: 'Novembre',
      Year: '2022',
      weight: 98,
    },
    {
      Day: 'Lundi 16',
      Month: 'Novembre',
      Year: '2022',
      weight: 34,
    },
    {
      Day: 'Jeudi 19',
      Month: 'Novembre',
      Year: '2022',
      weight: 23,
    },
    {
      Day: 'Vendredi 20',
      Month: 'Novembre',
      Year: '2022',
      weight: 12,
    },
    {
      Day: 'Samedi 21',
      Month: 'Novembre',
      Year: '2022',
      weight: 35,
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
            <Text style={styles.topText}>Bonjour, Nom Client</Text>
          </LinearGradient>
        </View>
        <Text style={styles.titleText}>Historique de collecte</Text>
        {list.map((item, index) => (
          <View style={styles.body} key={index}>
            <Text style={styles.date}>
              {item.Day} {item.Month} {item.Year}
            </Text>
            <Text style={styles.poids}>poids collecté : {item.weight} KG </Text>
          </View>
        ))}
        <PopUp></PopUp>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default DashBordClient;
