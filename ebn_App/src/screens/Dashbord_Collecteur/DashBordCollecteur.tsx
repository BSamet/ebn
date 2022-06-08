import React, {useEffect} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import {useState} from 'react';
import axios from 'axios';
import {HOST_BACK} from '../../../environment/environment';
import moment from 'moment';
import QrCodeScanner from '../../components/qrCodeScanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// TODO rendre la list cliquable OnPress() et faire intervenir les données
const DashBordCollecteur = () => {
  // const navigation = useNavigation<AuthScreenNavigate>();
  const {height} = useWindowDimensions();
  const [etapes, setEtapes] = useState<EtapeCollecteur[]>();
  const [userCollecteur, setUserCollecteur] = useState<collecteurInterface>();
  const [fetchOnce, setFetchOnce] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [ClientModal, setClientModal] = useState<EtapeCollecteur>();
  const [collecteurToken, setCollecteurToken] = useState<string | null>('');
  const [collecteurId, setCollecteurId] = useState<string | null>('');
  const [collecteurName, setCollecteurName] = useState<string | null>('');
  const [collecteurLastname, setCollecteurLastname] = useState<string | null>(
    '',
  );

  AsyncStorage.getItem('token').then(value => {
    setCollecteurToken(value);
  });
  AsyncStorage.getItem('id').then(value => {
    setCollecteurId(value);
  });
  AsyncStorage.getItem('nom').then(value => {
    setCollecteurLastname(value);
  });
  AsyncStorage.getItem('prenom').then(value => {
    setCollecteurName(value);
  });

  useEffect(() => {
    if (fetchOnce) {
      axios
        .get(HOST_BACK + '/etape/collecteur/' + collecteurId, {
          headers: {
            Authorization: `Bearer ${collecteurToken}`,
          },
        })
        .then(res => {
          setUserCollecteur(res.data[0].collecteur); // recuperer les infos du collecteur sans map
          setEtapes(res.data); // recuperation des etapes pour map

          // on cherche une seul fois
          setFetchOnce(false);
        });
    }
  }, [etapes, userCollecteur, fetchOnce, collecteurToken, collecteurId, collecteurLastname, collecteurName]);

  const showModal = (Client: any) => {
    setModalOpen(true);
    setClientModal(Client);
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
              Bonjour, {collecteurLastname} {collecteurName}
            </Text>
          </LinearGradient>
        </View>

        <Text style={styles.titleText}>Etape de votre collecte</Text>

        <Modal animationType="slide" transparent={true} visible={modalOpen}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Nom : {ClientModal?.client.utilisateur.nom}
              </Text>
              <Text style={styles.modalText}>
                Prénom: {ClientModal?.client.utilisateur.prenom}
              </Text>
              <Text style={styles.modalText}>
                Téléphone : {ClientModal?.client.utilisateur.telephone}
              </Text>
              <Text style={styles.modalText}>
                Adresse: {ClientModal?.client.adresse}
              </Text>

              <Pressable
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() => setModalOpen(!modalOpen)}>
                <Text style={styles.textStyle}>Fermer</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {etapes?.map((data, index) => (
          <View style={styles.body} key={index}>
            <Pressable onPress={() => showModal(data)}>
              <Text style={styles.date}>{data.client.nomCommercial}</Text>

              <Text style={styles.poids}>
                Heure estimé de passage :{' '}
                {moment(data.date).format('DD.MM.YYYY  à  HH[h] mm')}
              </Text>

              <QrCodeScanner data={data.client.id} />
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
    backgroundColor: 'transparent',
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
    fontFamily: 'Confortaa-Bold',
    color: '#8AC997',
    fontSize: 20,
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
