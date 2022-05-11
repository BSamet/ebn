import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
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
import {Divider} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import {HOST_BACK} from '../../../environment/environment';
import CustomButton from '../../components/CustomButton';

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
export interface HistoriqueClient {
  id: number;
  typeAction: string;
  date: number;
  typeDeDechet: string;
  commentaire: string;
  poids: number;
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

// TODO rendre la list cliquable OnPress() et faire intervenir les données
const DashBordClient = () => {
  const [fetchOnce, setFetchOnce] = useState(true);
  const [tourner, setTouner] = useState<dashboardClient[]>();
  const [myclient, setMyClient] = useState<ShowClient>();
  const [myHistorique, setMyHistorique] = useState<HistoriqueClient[]>();
  const [modalOpen, setModalOpen] = useState(false);
  const [myCollecteurModal, setMyCollecteurModal] = useState<dashboardClient>();
  const [modalOpenHisto, setModalOpenHisto] = useState(false);
  useEffect(() => {
    if (fetchOnce) {
      axios.get(HOST_BACK + '/etape/client/1').then(res => {
        // appel de l'api
        // recupération client
        setMyClient(res.data.etape[0].client);

        // recupération historique
        setMyHistorique(res.data.historique);

        // recuperer les infos du collecteur sans map
        setTouner(res.data.etape);
        // on cherche une seul fois
        setFetchOnce(false);
      });
    }
  }, [tourner, myclient, myHistorique, fetchOnce]);

  const showModal = (Collecteur: any) => {
    setModalOpen(true);
    setMyCollecteurModal(Collecteur);
  };
  const HistoriqueModal = (Historique: any) => {
    setModalOpenHisto(true);
    setMyHistorique(Historique);
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

        {/* gestion modal historique  */}

        <CustomButton
          text={'Voir votre historique'}
          onPress={() => HistoriqueModal(myHistorique)}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalOpenHisto}>
          <ScrollView>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {myHistorique?.map((hist, index) => (
                  <View key={index}>
                    <Text style={styles.modalText}>Conteneur :</Text>
                    <Text style={styles.modalHistoriqueText}>
                      {hist.typeAction} {hist.id}
                    </Text>
                    <Text style={styles.modalText}>Récuperer le :</Text>
                    <Text style={styles.modalHistoriqueText}>
                      {moment(hist.date).format('DD.MM.YYYY  à HH[h] mm')}
                    </Text>
                    <Text style={styles.modalText}>Type de dechet :</Text>
                    <Text style={styles.modalHistoriqueText}>
                      {hist.typeDeDechet}
                    </Text>
                    <Text style={styles.modalText}>
                      Commentaire du Collecteur :
                    </Text>
                    <Text style={styles.modalHistoriqueText}>
                      {hist.commentaire}
                    </Text>
                    <Text style={styles.modalText}>Poids total récuperé:</Text>
                    <Text style={styles.modalHistoriqueText}>
                      {hist.poids} KG
                    </Text>
                    <Divider orientation="vertical" width={200} />
                  </View>
                ))}

                <Pressable
                  style={[styles.buttonModal, styles.buttonClose]}
                  onPress={() => setModalOpenHisto(!modalOpenHisto)}>
                  <Text style={styles.textStyle}>Fermer</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </Modal>

        <Text style={styles.titleText}>Vos collecte</Text>

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
              <Divider orientation="vertical" width={200} />
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  buttonClose: {
    backgroundColor: 'transparent',
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
