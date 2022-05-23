import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, Text} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import {HOST_BACK} from "../../../Environement/environnement";

export interface HistoriqueClient {
  id: number;
  typeAction: string;
  date: number;
  typeDeDechet: string;
  commentaire: string;
  poids: number;
}
const HistoriqueClient = () => {
  const [myHistorique, setMyHistorique] = useState<HistoriqueClient[]>();

  const [fetchOnce, setFetchOnce] = useState(true);
  const [clientToken, setClienToken] = useState('');
  AsyncStorage.getItem('token').then(value => setClienToken(value));
  useEffect(() => {
    console.log(clientToken, ' historique');
    if (fetchOnce) {
      axios
        .get(HOST_BACK + '/etape/client/1', {
          headers: {
            Authorization: `Bearer ${clientToken}`,
          },
        })
        .then(res => {
          // appel de l'api

          // recupération historique
          setMyHistorique(res.data.historique);
          setFetchOnce(false);
        });
    }
  }, [myHistorique, fetchOnce, clientToken]);
  return (
    <ScrollView>
      <Card.Title h1={true}>Mon historique</Card.Title>
      <Card.Divider>
        {myHistorique?.map((hist, index) => (
          <View key={index}>
            <Text style={styles.modalText}>Récuperer le :</Text>
            <Text style={styles.modalHistoriqueText}>
              {moment(hist.date).format('DD.MM.YYYY  à HH[h] mm')}
            </Text>
            <Text style={styles.modalText}>Conteneur :</Text>
            <Text style={styles.modalHistoriqueText}>
              {hist.typeAction} {hist.id}
            </Text>
            <Text style={styles.modalText}>Type de dechet :</Text>
            <Text style={styles.modalHistoriqueText}>{hist.typeDeDechet}</Text>
            <Text style={styles.modalText}>Commentaire du Collecteur :</Text>
            <Text style={styles.modalHistoriqueText}>{hist.commentaire}</Text>
            <Text style={styles.modalText}>Poids total récuperé:</Text>
            <Text style={styles.modalHistoriqueText}>{hist.poids} KG</Text>

            <Divider
              style={{width: '100%', margin: 10}}
              color="#0096f0"
              width={2}
              orientation="horizontal"
            />
          </View>
        ))}
      </Card.Divider>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
export default HistoriqueClient;
