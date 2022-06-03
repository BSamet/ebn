import React, {useEffect, useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import popUpStyles from '../styles/popUpStyles';
import axios from 'axios';
import {HOST_BACK} from "../../environment/environment";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [selectedValue, setSelectedValue] = useState("faite votre choix");
    const [modalVisible, setModalVisible] = useState(true);
    const [poids, setPoids] = useState(0);
    const [commentaire, setCommentaire] = useState('');
    const [clientToken, setClienToken] = useState('');
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
        getInfo();
    }, [info]);

    const submit = () => {

        switch(selectedValue){
            case "dépot du seau":
                depotConteneur(selectedValue);
                break;
            case "Récupération du seau":
                retraitConteneur(selectedValue);
                break;
            case "faite votre choix":
                alert("faite un choix");
                break;
        }
        postPoids();
    };

    //permet de recupérer le token
    AsyncStorage.getItem('token').then(value => setClienToken(value));

    //Fait un get de tout les infos consernant le conteneur
    const getInfo = () => {
        axios
            .get(HOST_BACK + '/conteneur/' + scanValue + '/infos', {
                headers: {
                    'Authorization': `Bearer ${clientToken}`
                }
            })
            .then(res => {
                setInfo(res.data);


            })
            .catch(function (error) {
                console.log("erreur get info scan");
            });

    };

    //envoi les informations rentrer dans la popUp en bdd (historique)
    const postPoids = () => {
        getInfo();

        axios
            .post(HOST_BACK + '/historique', dataPost , {
                headers: {
                    'Authorization': `Bearer ${clientToken}`
                }
            })
            .then(res => {
                console.log(res)

            })
            .catch(function (error) {
                console.log(error , ' sur post');
            });

    };

    //permet de déassigner le conteneur bdd (Table conteneur)
    const retraitConteneur = (value) => {
        getInfo();

        if (value == "Récupération du seau"){
            axios
            .patch(HOST_BACK + '/conteneur/' + scanValue, DeAssignation , {
                headers: {
                    'Authorization': `Bearer ${clientToken}`
                }
            })
            .catch(function (error) {
                alert("le seau n'a pas été repris");
                console.log(Assignation, "assignation")
            });
        }
    };

    //permet d'assigner le conteneur en bdd (Table conteneur)
    const depotConteneur = (value) => {
        getInfo();

        if (value == "dépot du seau") {
            axios
                .patch(HOST_BACK + '/conteneur/' + scanValue, Assignation, {
                    headers: {
                        'Authorization': `Bearer ${clientToken}`
                    }
                })
                .catch(function (error) {
                    alert("le seau n'a pas été assigné")
                    console.log(Assignation,"assignation")
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
                                depotConteneur(itemValue);
                                retraitConteneur(itemValue);
                            }}>
                            <Picker.Item label="Faite votre choix" value="faite votre choix"/>
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
