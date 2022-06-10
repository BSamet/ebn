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
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {DataTable, Snackbar} from 'react-native-paper';
import {RefreshControl} from 'react-native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

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
  token: string | null;
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
  const [textDate, setTextDate] = useState('à définir');

  const [clientToken, setClienToken] = useState<string | null>('');
  const [myClientId, setClientId] = useState<string | null>('');
  const [clientNom, setClientNom] = useState<string | null>('');
  const [clientPrenom, setClientPrenom] = useState<string | null>('');
  const [isVisible, setIsVisible] = React.useState(false);
  //refresh pages
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    fetchEtape();
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  // fonction pour post
  let data = {
    date: date,
    clientId: myClientId,
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
          setIsVisible(true);
        }
      })
      .catch(function (error) {
        console.log(error + ' sur post');
      })
      .finally(() => {
        setTextDate('à définir');
      });
  };
  const submit = () => {
    postRamasagge();
  };

  AsyncStorage.getItem('token').then(value => {
    setClienToken(value);
  });
  AsyncStorage.getItem('id').then(value => {
    setClientId(value);
  });
  AsyncStorage.getItem('nom').then(value => {
    setClientNom(value);
  });
  AsyncStorage.getItem('prenom').then(value => {
    setClientPrenom(value);
  });

  const fetchEtape = () => {
    axios
      .get(HOST_BACK + '/etape/client/' + myClientId, {
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
  };

  useEffect(() => {
    if (fetchOnce) {
      fetchEtape();
    }
  }, [tourner, myclient, fetchOnce, clientToken, myClientId]);

  // fonction pour les modales
  const showModal = (Collecteur: any) => {
    setModalOpen(true);
    setMyCollecteurModal(Collecteur);
  };

  // toute les fonction pour le datePicker
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setVisible(false);
    let tempDate = new Date(currentDate);

    let Fdate = format(currentDate, 'dd/MM/yyyy à H:mm', 'Europe/Berlin');

    let formatDateSave = new Date(
      +tempDate.getFullYear(),
      +tempDate.getMonth(),
      +tempDate.getDate(),
      +tempDate.getHours() + 2,
      +tempDate.getMinutes(),
    );

    setDate(formatDateSave);
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

  const onDismissSnackBar = () => {
    setIsVisible(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.page}>
        <View>
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
              Bonjour, {clientNom} {clientPrenom}
            </Text>
          </LinearGradient>
        </View>
        {/* gestion demande de ramassage ponctuel */}
        <Snackbar
          wrapperStyle={{top: 0}}
          theme={{
            colors: {
              surface: 'white',
              accent: 'white',
              onSurface: '#8AC997',
            },
            animation: {
              scale: 2,
            },
          }}
          visible={isVisible}
          duration={2500}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Ok',
            onPress: () => {},
          }}>
          Votre demande de collecte à été prise en charge !
        </Snackbar>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalRamassage}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitre}> Votre demande de ramassage</Text>
              <Pressable style={styles.collecteModalSubmit} onPress={showDate}>
                <Text style={styles.textStyle}> Choisir une date</Text>
              </Pressable>
              <Pressable style={styles.collecteModalSubmit} onPress={showTime}>
                <Text style={styles.textStyle}>Choisir une heure</Text>
              </Pressable>
              <Text style={styles.textDate}>
                Vous avez demander un ramassage le {'\n'}
                <Text style={styles.date}>{textDate}</Text>
              </Text>
              {visible && (
                <RNDateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  onChange={onChange}
                />
              )}
              <View style={styles.collecteModalSubmitContainer}>
                <Pressable
                  style={styles.collecteModalCancel}
                  onPress={() => {
                    setModalRamassage(!modalRamassage);
                  }}>
                  <Text style={styles.textStyle}>Annuler</Text>
                </Pressable>
                <Pressable
                  style={styles.collecteModalSubmit}
                  onPress={() => {
                    setModalRamassage(!modalRamassage);
                    submit();
                  }}>
                  <Text style={styles.textStyle}>Enregistrer</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.requestCollecteContainer}>
          <Text style={styles.titleText}>Vos collectes</Text>
          <View style={styles.requestCollecteButton}>
            <Pressable
              style={styles.Ramassage}
              onPress={() => setModalRamassage(true)}>
              <Text style={styles.textStyle}>Collecte</Text>
            </Pressable>
            <Pressable
              style={styles.Ramassage}
              onPress={() => setModalRamassage(true)}>
              <Text style={styles.textStyle}>Abonnement</Text>
            </Pressable>
          </View>
        </View>

        <Divider
          style={{width: '100%', margin: 10}}
          color="#8AC997"
          width={2}
          orientation="horizontal"
        />

        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{flex: 1.5}}>Date</DataTable.Title>
            <DataTable.Title style={{flex: 1}}>Collecteur</DataTable.Title>
            <DataTable.Title>Numéro téléphone</DataTable.Title>
          </DataTable.Header>

          {tourner?.map((item, index) => (
            <DataTable.Header>
              <DataTable.Cell style={{flex: 1.5}}>
                {moment(item.date).format('DD.MM.YYYY à HH[h] mm')}
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}>
                {item.collecteur.utilisateur.nom}{' '}
                {item.collecteur.utilisateur.prenom}
              </DataTable.Cell>
              <DataTable.Cell>
                {item.collecteur.utilisateur.telephone}
              </DataTable.Cell>
            </DataTable.Header>
          ))}
        </DataTable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  requestCollecteContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  requestCollecteButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    marginTop: 20,
    paddingHorizontal: 10,
    color: 'black',
    fontFamily: 'Confortaa-Regular',
  },
  Ramassage: {
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#8AC997',
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    borderColor: 'white',
    borderWidth: 1,
    width: '40%',
  },
  collecteModalSubmitContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  collecteModalSubmit: {
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#8AC997',
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    borderColor: 'white',
    borderWidth: 1,
    width: '50%',
    marginVertical: 5,
  },
  collecteModalCancel: {
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#ff0000',
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    borderColor: 'white',
    borderWidth: 1,
    width: '50%',
    marginVertical: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitre: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  textDate: {
    textAlign: 'center',
    fontSize: 17,
    color: '#000000',
    fontFamily: 'Confortaa-Regular',
  },
  date: {
    textAlign: 'center',
    fontSize: 17,
    color: '#8AC997',
    fontFamily: 'Confortaa-Regular',
    fontWeight: 'bold',
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
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
  poids: {
    color: 'black',
    marginLeft: 10,
    fontFamily: 'Confortaa-Bold',
    fontSize: 16,
  },
});

export default DashBordClient;
