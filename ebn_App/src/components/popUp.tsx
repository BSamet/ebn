import React, {useState} from 'react';
import {Alert, Modal, Pressable, Text, TextInput, View} from 'react-native';
import popUpStyles from '../styles/popUpStyles';
import InformationClient from './informationClient';
import axios from 'axios';
import {URL_API} from '@env';

const popUp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [poids, setPoids] = useState(0);
  const [commentaire, setCommentaire] = useState('');
  let data = {
    typeAction: 'récupération du saut',
    date: '2022-05-01T18:57:30.295Z',
    typeDeDechet: 'Biodéchets',
    commentaire: commentaire,
    poids: poids,
    clientId: 1,
    collecteurId: 1,
    conteneurId: 3,
  };
  const submit = () => {
    postPoids();
  };
  const postPoids = () => {
    axios
      .post(URL_API + 'historique', data)
      .then(res => {})
      .catch(function (error) {
        console.log(error + ' sur post');
      });
  };
  return (
    <View style={popUpStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={popUpStyles.centeredView}>
          <View style={popUpStyles.modalView}>
            <InformationClient> </InformationClient>
            <Text style={popUpStyles.modalTitre}> Information du seau </Text>
            <TextInput
              style={popUpStyles.input}
              keyboardType="numeric"
              onChangeText={pesser => setPoids(pesser)}
              placeholder="Entrer le poids"
            />
            <Text style={popUpStyles.modalText}>
              Vous avez collecter {poids} kg
            </Text>
            <TextInput
              style={popUpStyles.input}
              onChangeText={com => setCommentaire(com)}
              placeholder="Entrer le commentaire"
            />
            <Pressable
              style={[popUpStyles.button, popUpStyles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                submit();
              }}>
              <Text style={popUpStyles.textStyle}> Enregistrer </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[popUpStyles.button, popUpStyles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={popUpStyles.textStyle}> pésage </Text>
      </Pressable>
    </View>
  );
};

export default popUp;
