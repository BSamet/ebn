import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  GestureResponderEvent,
  Image,
  Modal,
  Pressable,
  PressableProps,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';

import {AuthRootParamList} from '../../Navigation/RouteNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';

import axios from 'axios';
import {HOST_BACK} from '../../../environment/environment';
import QrcodeButton from '../../components/QrcodeButton';

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
}

interface collecteurInterface {
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
}
let dataClient: EtapeCollecteur = {
  id: 0,
  date: '',
  isCollected: false,
  commentaire: '',
  client: {
    id: 0,
    siret: 0,
    nomCommercial: '',
    adresse: '',
    utilisateur: {
      id: 0,
      role: '',
      utilisateur: '',
      password: '',
      nom: '',
      prenom: '',
      mail: '',
      telephone: '',
    },
  },
};

// TODO rendre la list cliquable OnPress() et faire intervenir les données
const DashBordCollecteur = () => {
  // navigation typé

  const navigation = useNavigation<AuthScreenNavigate>();
  const {height} = useWindowDimensions();
  const [etapes, setEtapes] = useState<EtapeCollecteur[]>();
  const [userCollecteur, setUserCollecteur] = useState<collecteurInterface>();
  const [fetchOnce, setFetchOnce] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectClient, setSelectCLient] = useState(1);

  useEffect(() => {
    if (fetchOnce) {
      axios.get(HOST_BACK + '/etape/collecteur/1').then(res => {
        // appel de l'api

        setUserCollecteur(res.data[0].collecteur); // recuperer les infos du collecteur sans map
        setEtapes(res.data); // recuperation des etapes pour map
        setSelectCLient(res.data);

        // on cherche une seul fois
        setFetchOnce(false);
      });
    }
  }, [etapes, selectClient, userCollecteur, fetchOnce]);

  const showModal = (
    event: GestureResponderEvent,
    index: number,
    idClient: any,
  ) => {
    setSelectCLient(index);
    setModalOpen(true);
    console.log(idClient);

    for (const etape of etapes) {
      if (etape.client.id === idClient) {
        dataClient = etape.client;

        break;
      }
    }
  };

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

            <Text style={styles.topText}>
              Bonjour, {userCollecteur?.utilisateur.nom}{' '}
              {userCollecteur?.utilisateur.prenom}
            </Text>
          </LinearGradient>
          <QrcodeButton
            text={'Flasher QRcode'}
            onPress={() => {
              navigation.navigate('QrCodeScan');
            }}
          />
        </View>

        <Text style={styles.titleText}>Etape de votre collecte</Text>

        {etapes?.map((client, index) => (
          <Modal animationType="slide" transparent={true} visible={modalOpen}>
            <View style={styles.centeredView}>
              <View style={styles.modalView} key={index}>
                <Text style={styles.modalText}>
                  Nom : {client.client.utilisateur.nom}
                </Text>
                <Text style={styles.modalText}>
                  Prénom: {client.client.utilisateur.prenom}
                </Text>
                <Text style={styles.modalText}>
                  Téléphone : {client.client.utilisateur.telephone}
                </Text>
                <Text style={styles.modalText}>
                  Adresse: {client.client.adresse}
                </Text>
                <Pressable
                  style={[styles.buttonModal, styles.buttonClose]}
                  onPress={() => setModalOpen(!modalOpen)}>
                  <Text style={styles.textStyle}>Fermer</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ))}

        {etapes?.map((data, index) => (
          <View style={styles.body} key={index}>
            <Pressable onPress={event => showModal(event, 0, data.client.id)}>
              <Text style={styles.date}>{data.client.nomCommercial}</Text>

              <Text style={styles.poids}>
                Heure estimé de passage : {data.date}{' '}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DashBordCollecteur;
