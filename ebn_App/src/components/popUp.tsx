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
    const [limite, setLimite] = useState(true);
    const scanValue = props.data.res;
    const date = new Date();
    const poidMax = info?.capaciteMax;
    const [client, setClient] = useState();
    const [selectedValue, setSelectedValue] = useState("Récupération du seau");
    const [conteneur, setConteneur] = useState();
    const [modalVisible, setModalVisible] = useState(true);
    const [poids, setPoids] = useState(0);
    const [commentaire, setCommentaire] = useState('');
    let Assignation = {
        isAvailable: false,
        client: props.data.clientId
    };
    let DeAssignation = {
        isAvailable: true,
        client: null
    };
    let dataPost = {
        typeAction: selectedValue,
        date: date.toString(),
        typeDeDechet: info?.typeDechet.typeDechets,
        commentaire: commentaire,
        poids: poids,
        clientId: props.data.clientId,
        collecteurId: 1,
        conteneurId: scanValue,
    };

    useEffect(() => {
        getInfoRecup();
    }, []);

    const submit = () => {
        postPoids();

        if (selectedValue == "dépot du seau") {
            depotConteneur(selectedValue);
        }

    };

    const getInfoRecup = () => {
        axios
            .get(HOST_BACK + '/conteneur/' + scanValue + '/infos')
            .then(res => {
                setInfo(res.data);
                setClient(res.data.client.id);

                console.log(res.data);
            })
            .catch(function (error) {
                console.log("erreur get info scan");
            });

    };

    const getInfoDepot = () => {
        axios
            .get(HOST_BACK + '/conteneur/' + scanValue + '/infos')
            .then(res => {
                setInfo(res.data);
            })
            .catch(function (error) {
                console.log("erreur get info scan");
            });

    };

    const postPoids = () => {
        getInfoRecup();

        axios
            .post(HOST_BACK + '/historique', dataPost)
            .then(res => {
                console.log(res)

            })
            .catch(function (error) {
                console.log(error + ' sur post');
            });

        if (selectedValue == "Récupération du seau") {
            retraitConteneur();
        }
    };

    const retraitConteneur = () => {

        axios
            .patch(HOST_BACK + '/conteneur/' + scanValue, DeAssignation)
            .catch(function (error) {
                alert("le seau n'a pas été repris")
            });
    };

    const depotConteneur = (value) => {
        getInfoDepot();
        console.log(Assignation.client + " client dans post")
        if (value == "dépot du seau") {
            axios
                .patch(HOST_BACK + '/conteneur/' + scanValue, Assignation)
                .catch(function (error) {
                    alert("le seau n'a pas été assigné")
                });
        }
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
                        <Picker
                            selectedValue={selectedValue}
                            style={{height: 50, width: 240}}
                            onValueChange={(itemValue) => {
                                setSelectedValue(itemValue);
                                depotConteneur(itemValue)
                            }}>
                            <Picker.Item label="Récupération du seau" value="Récupération du seau"/>
                            <Picker.Item label="dépot du seau" value="dépot du seau"/>
                        </Picker>
                        <TextInput
                            style={popUpStyles.input}
                            keyboardType="numeric"
                            onChangeText={peser => {
                                setLimite(+peser <= +poidMax);
                                setPoids(peser)
                            }}
                            placeholder="Entrer le poids"
                        />
                        <Text style={popUpStyles.modalText}>
                            Vous avez collecter {limite ? <Text style={popUpStyles.textStyle}>{poids}</Text> :
                            <Text style={{color: "red"}}>{poids}</Text>} kg
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
        </View>
    );
};

export default popUp;
