import React, {useEffect, useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from 'react-native';
import popUpStyles from '../styles/popUpStyles';
import axios from 'axios';
import {HOST_BACK} from "../../environment/environment";

interface conteneurInterface {
    id: number,
    capaciteMax: number,
    isAvailable: boolean
}

const popUp = (props: any) => {
    const [info, setInfo] = useState<conteneurInterface>();
    const scanValue = props.data;
    const [conteneur, setConteneur] = useState();
    const [modalVisible, setModalVisible] = useState(true);
    const [poids, setPoids] = useState(0);
    const [commentaire, setCommentaire] = useState('');
    let data = {
        typeAction: 'récupération du saut',
        date: '2022-05-05T18:57:30.295Z',
        typeDeDechet: 'Biodéchets',
        commentaire: commentaire,
        poids: poids,
        clientId: 1,
        collecteurId: 1,
        conteneurId: 3,
    };
    useEffect(() => {
        axios
            .get(HOST_BACK + '/conteneur/' + scanValue)
            .then(res => {
                console.log(res)
            })
            .catch(function (error) {
                console.log("erreur get info scan")
            });
    }, [info]);

    const submit = () => {
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
                        <Text> </Text>
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
