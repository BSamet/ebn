import React, {useEffect, useState} from 'react';
import {Alert, DevSettings, Modal, Pressable, Text, TextInput, View} from 'react-native';
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
    const [fetchOnce, setFetchOnce] = useState(true);
    const [info, setInfo] = useState<conteneurInterface>();
    const [limite, setLimite] = useState(true);
    const scanValue = props.data.res;
    const date = new Date();
    const poidMax: number | undefined = info?.capaciteMax;
    const [selectedValue, setSelectedValue] = useState("Séléctionné une action");
    const [modalVisible, setModalVisible] = useState(true);
    const [poids, setPoids] = useState<string | number>(0);
    const [commentaire, setCommentaire] = useState('');
    const [clientToken, setClienToken] = useState<string | null>();
    const [error, setError] = useState<string | null>();
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
        date: date,
        typeDeDechet: info?.typeDechet.typeDechets,
        commentaire: commentaire,
        poids: poids,
        clientId: props.data.clientId,
        collecteurId: 1,
        conteneurId: scanValue,
    };

    //permet de recupérer le token
    AsyncStorage.getItem('token').then(value => setClienToken(value));

    useEffect(() => {
        if (fetchOnce) {
            AsyncStorage.getItem('token')
                .then((value) => {
                    setClienToken(value);
                    axios
                        .get(HOST_BACK + '/conteneur/' + scanValue + '/infos', {
                            headers: {
                                'Authorization': `Bearer ${value}`
                            }
                        })
                        .then(res => {
                            setFetchOnce(false);
                            setInfo(res.data);
                        })
                        .catch(function (error) {
                            console.log("erreur get info scan");
                        });
                })
        }
    }, [info]);

    const submit = () => {
        switch (selectedValue) {
            case "Dépot du seau":
                if (info?.client != null) {
                    setError("Ce seau est déjà assigner à un client, veuillez contacter l'administrateur !")
                } else {
                    depotConteneur(selectedValue);
                    postPoids();
                }
                break;
            case "Récupération du seau":
                if (info?.client === null) {
                    setError("Ce seau n'est assigner à aucun client, veuillez contacter l'administrateur !")
                } else {
                    retraitConteneur(selectedValue);
                    postPoids();
                }
                break;
            case "Séléctionné une action":
                setError("Veuillez séléctioné une action à effectuer");
                break;
        }
    };

    //envoi les informations rentrer dans la popUp en bdd (historique)
    const postPoids = () => {
        axios
            .post(HOST_BACK + '/historique', dataPost, {
                headers: {
                    'Authorization': `Bearer ${clientToken}`
                }
            })
            .then(res => {
                console.log(res.data)
                setModalVisible(!modalVisible);
            })
            .catch(function (error) {
                console.log(error, ' sur post');
            });
    };

    //permet de déassigner le conteneur bdd (Table conteneur)
    const retraitConteneur = (value) => {
        if (value == "Récupération du seau") {
            axios
                .patch(HOST_BACK + '/conteneur/' + scanValue, DeAssignation, {
                    headers: {
                        'Authorization': `Bearer ${clientToken}`
                    }
                })
                .catch(function (error) {
                    alert("le seau n'a pas été collecté");
                    console.log(Assignation, "assignation")
                });
        }
    };

    //permet d'assigner le conteneur en bdd (Table conteneur)
    const depotConteneur = (value: string) => {
        if (value == "Dépot du seau") {
            axios
                .patch(HOST_BACK + '/conteneur/' + scanValue, Assignation, {
                    headers: {
                        'Authorization': `Bearer ${clientToken}`
                    }
                })
                .catch(function (error) {
                    alert("le seau n'a pas été assigné")
                    console.log(Assignation, "assignation")
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
                        <Text style={popUpStyles.modalTitre}>Information du seau</Text>
                        <Text style={popUpStyles.modalError}>{error}</Text>
                        <Picker
                            selectedValue={selectedValue}
                            style={popUpStyles.pickerSelection}
                            onValueChange={(itemValue) => {
                                setSelectedValue(itemValue);
                            }}>
                            <Picker.Item label="Séléctionné une action" value="Séléctionné une action"/>
                            <Picker.Item label="Récupération du seau" value="Récupération du seau"/>
                            <Picker.Item label="Dépot du seau" value="Dépot du seau"/>
                        </Picker>
                        {selectedValue === "Récupération du seau" &&
                            <View>
                                <TextInput
                                    style={popUpStyles.input}
                                    keyboardType="numeric"
                                    onChangeText={peser => {
                                        setLimite(+peser <= +poidMax);
                                        setPoids(peser)
                                    }}
                                    placeholder="Entrer le poids"
                                    placeholderTextColor={"lightgrey"}
                                />
                                <Text style={popUpStyles.modalText}>
                                    Vous avez collecter {limite ? <Text style={popUpStyles.textStyle}>{poids}</Text> :
                                    <Text style={{color: "red"}}>{poids}</Text>} kg
                                </Text>
                            </View>
                        }
                        {selectedValue !== "Séléctionné une action" &&
                            <View>
                                <TextInput
                                    style={popUpStyles.input}
                                    onChangeText={com => setCommentaire(com)}
                                    placeholder="Entrer un commentaire"
                                    placeholderTextColor={"lightgrey"}
                                />
                            </View>
                        }
                        <View style={popUpStyles.buttonContainer}>
                            <Pressable
                                style={[popUpStyles.button, popUpStyles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={popUpStyles.textStyle}>Annuler</Text>
                            </Pressable>
                            <Pressable
                                style={[popUpStyles.button, popUpStyles.buttonSave]}
                                onPress={() => {
                                    submit();
                                }}>
                                <Text style={popUpStyles.textStyle}>Enregistrer</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default popUp;
