import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Divider} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import {HOST_BACK} from '../../../environment/environment';

import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface dashboardClient {
  id: number;
  date: string;
  isCollected: boolean;
  commentaire: string;

  collecteur: {
    numeroCollecteur: number;
    numeroVelo: number;
    utilisateur: {
      id: number;
      role: string;
      nom: string;
      prenom: string;
      mail: string;
      telephone: string;
    };
  };
}

export interface ShowClient {
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
}
export interface Session {
  idClient: string;
  token: string;
}
export interface DemandePonctuelRamassage {
  date: number;
  client: {
    id: number;
  };
}

// TODO rendre la list cliquable OnPress() et faire intervenir les données
const DashBordClient = () => {
  const [fetchOnce, setFetchOnce] = useState(true);
  const [tourner, setTouner] = useState<dashboardClient[]>();
  const [myclient, setMyClient] = useState<ShowClient>();
  // const [sessionClient, setSessionClient] = useState<Session>();
  const [modalOpen, setModalOpen] = useState(false);
  const [myCollecteurModal, setMyCollecteurModal] = useState<dashboardClient>();
  // const [Token, setToken] = useState();
  const [modalRamassage, setModalRamassage] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date());
  const [textDate, setTextDate] = useState('');
  const [clientToken, setClienToken] = useState('');

  // fonction pour post
  let data = {
    date: date.toString(),
    clientId: myclient?.id,
  };
  const postRamasagge = () => {
    axios
      .post(HOST_BACK + '/ramassage-ponctuel', data, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
        },
      })
      .then(resp => {
        if (resp.status === 201) {
          Alert.alert('Votre demande de ramassage à bien été pris en compte');
        }
      })
      .catch(function (error) {
        console.log(error + ' sur post');
      })
      .finally(() => {
        setTextDate('à definir');
      });
  };
  const submit = () => {
    postRamasagge();
  };
  // jwt

  AsyncStorage.getItem('token').then(value => setClienToken(value));
  useEffect(() => {
    console.log(clientToken, 'client Bryan');
    if (fetchOnce) {
      axios
        .get(HOST_BACK + '/etape/client/1', {
          headers: {
            Authorization: `Bearer ${clientToken}`,
          },
        })

        .then(res => {
          // appel de l'api
          // recupération client
          setMyClient(res.data.etape[0].client);

          // recuperer les infos du collecteur sans map
          setTouner(res.data.etape);
          // on cherche une seul fois
          setFetchOnce(false);
        });
    }
  }, [tourner, myclient, fetchOnce, clientToken]);

  // fonction pour les modales
  const showModal = (Collecteur: any) => {
    setModalOpen(true);
    setMyCollecteurModal(Collecteur);
  };

  // toute les fonction pour le datePicker
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setVisible(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let Fdate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear() +
      ' à ' +
      tempDate.getHours() +
      'h' +
      tempDate.getMinutes();

    setTextDate(Fdate);
  };

  const showDate = () => {
    setMode('date');
    showPicker();
  };

  const showTime = () => {
    setMode('time');
    showPicker();
  };
  const showPicker = () => {
    setVisible(true);
  };

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
            <Text style={styles.topText}>
              Bonjour,{myclient?.nomCommercial}
            </Text>
          </LinearGradient>
        </View>
        {/* gestion demande de ramassage ponctuel */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalRamassage}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitre}> Votre demande de ramassage</Text>
              <Pressable style={styles.RamassageModal} onPress={showDate}>
                <Text style={styles.textStyle}> Choisir une date</Text>
              </Pressable>
              <Pressable style={styles.RamassageModal} onPress={showTime}>
                <Text style={styles.textStyle}>Choisir une heure</Text>
              </Pressable>
              <Text style={styles.date}>
                Vous avez demander un ramassage le {textDate}
              </Text>
              {visible && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  onChange={onChange}
                />
              )}
              <Pressable
                style={styles.RamassageModal}
                onPress={() => {
                  setModalRamassage(!modalRamassage);
                  submit();
                }}>
                <Text style={styles.textStyle}> Enregistrer </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Text style={styles.titleText}>Vos collectes</Text>
        <Pressable
          style={styles.Ramassage}
          onPress={() => setModalRamassage(true)}>
          <Text style={styles.textStyle}>Besoin d'un ramassage ?</Text>
        </Pressable>
        <Divider
          style={{width: '100%', margin: 10}}
          color="#8AC997"
          width={2}
          orientation="horizontal"
        />

        {/* modal afficher les collecteur  */}

        <Modal animationType="slide" transparent={true} visible={modalOpen}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Nom : {myCollecteurModal?.collecteur.utilisateur.nom}
              </Text>
              <Text style={styles.modalText}>
                Prénom : {myCollecteurModal?.collecteur.utilisateur.prenom}
              </Text>
              <Text style={styles.modalText}>
                Numéro: {myCollecteurModal?.collecteur.utilisateur.telephone}
              </Text>

              <Pressable
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() => setModalOpen(!modalOpen)}>
                <Text style={styles.textStyle}>Fermer</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {tourner?.map((item, index) => (
          <View style={styles.body} key={index}>
            <Pressable onPress={() => showModal(item)}>
              <Text style={styles.date}>
                {item.collecteur.utilisateur.nom}{' '}
                {item.collecteur.utilisateur.prenom}
              </Text>
              <Text style={styles.poids}>
                Heure approximative de votre collecte {'  '}
                {moment(item.date).format('DD.MM.YYYY  à HH[h] mm')}
              </Text>
              <Divider
                style={{width: '100%', margin: 10}}
                color="#0096f0"
                width={2}
                orientation="horizontal"
              />
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  RamassageModal: {
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#8AC997',
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 1,
    width: '50%',
    marginLeft: '5%',
    marginVertical: 5,
  },
  Ramassage: {
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#8AC997',
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 1,
    width: '50%',
    marginLeft: '25%',
    marginVertical: 5,
  },
  modalTitre: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },

  input: {
    marginBottom: 15,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },

  divider: {paddingTop: 10, width: 25},
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalHistoriqueText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Confortaa-Bold',

    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Confortaa-Bold',
    color: '#8AC997',
    fontSize: 20,
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
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
    fontSize: 28,
    marginTop: 20,
    paddingHorizontal: 10,
    color: 'black',
    fontFamily: 'Confortaa-Regular',
    marginLeft: 115,
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
