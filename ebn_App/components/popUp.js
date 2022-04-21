import React, {useState} from 'react';
import {Alert, Modal, Pressable, Text, TextInput, View} from 'react-native';
import popUpStyles from '../styles/popUpStyles';

const popUp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const state = {
    poids: ' ',
    commentaire: ' ',
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
            <Text style={popUpStyles.modalText}> Information du seau </Text>
            <TextInput
              style={popUpStyles.input}
              onChangeText={text => {
                setState({poids: text});
              }}
              placeholder="Entrer le poids"
            />
            <Text style={popUpStyles.modalText}>
              {' '}
              Le poids est de {state.poids}{' '}
            </Text>
            <TextInput
              style={popUpStyles.input}
              placeholder="Entrer un commentaire"
            />
            <Pressable
              style={[popUpStyles.button, popUpStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
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
