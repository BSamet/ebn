import React, {useEffect, useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import popUpStyles from '../styles/popUpStyles';
import axios from 'axios';
import {HOST_BACK} from "../../environment/environment";

interface conteneurInterface {
    "id": number,
    "capaciteMax": number,
    "isAvailable": boolean,
    "client": {
        "id": number
    },
    "typeDechet": {
        "typeDechets": string
    }
}


const popUp = (props: any) => {
    const [info, setInfo] = useState<conteneurInterface>();
    const scanValue = props.data;
    const date = Date.now()
    const [selectedValue, setSelectedValue] = useState();
    const [conteneur, setConteneur] = useState();
    const [modalVisible, setModalVisible] = useState(true);
    const [poids, setPoids] = useState(0);
    const [commentaire, setCommentaire] = useState('');
    let data = {
        typeAction: selectedValue,
        date: date,
        typeDeDechet: info?.typeDechet.typeDechets,
        commentaire: commentaire,
        poids: poids,
        clientId: info?.client.id,
        collecteurId: 1,
        conteneurId: scanValue,
    };
    useEffect(() => {
        axios
            .get(HOST_BACK + '/conteneur/' + scanValue + '/infos')
            .then(res => {
                setInfo(res.data);
            })
            .catch(function (error) {
                console.log("erreur get info scan");
                console.log(scanValue)
            });
    }, [info]);

    const submit = () => {
        console.warn(data)
        postPoids();
    };

    const postPoids = () => {
        axios
            .post(HOST_BACK + '/historique', data)
            .then(res => {
                console.log(res)

            })
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
            >
                <View style={popUpStyles.centeredView}>
                    <View style={popUpStyles.modalView}>
                        <Text style={popUpStyles.modalTitre}> Information du seau </Text>
                        <Text> </Text>
                        <Picker
                            selectedValue={selectedValue}
                            style={{height: 50, width: 150}}
                            onValueChange={(itemValue) => setSelectedValue(itemValue)}>
                            <Picker.Item label="Récupération du seau" value="Récupération du seau"/>
                            <Picker.Item label="dépot du seau" value="dépot du seau"/>
                        </Picker>
                        <TextInput
                            style={popUpStyles.input}
                            keyboardType="numeric"
                            onChangeText={peser => setPoids(peser)}
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
