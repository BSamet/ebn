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
    const [modalVisible, setModalVisible] = useState(true);
    const [poids, setPoids] = useState<string | number>(0);
    const [commentaire, setCommentaire] = useState('');
    const [clientToken, setClienToken] = useState<string | null>();
    const [error, setError] = useState<string | null>();
    let etapeid = props.etapeId;
    let etapeIndex = props.etapeIndex;
    let setIscollected = props.setIscollected;
    let setIsAssigned = props.setIsAssigned;
    let setModalOff = props.setModalOff;
    let action = props.action;
    let Assignation = {
        isAvailable: false,
        client: props.data.clientId
    };
    let DeAssignation = {
        isAvailable: true,
        client: null
    };
    let dataPost = {
        typeAction: action,
        date: date,
        typeDeDechet: info?.typeDechet.typeDechets,
        commentaire: commentaire,
        poids: poids,
        clientId: props.data.clientId,
        collecteurId: 1,
        conteneurId: scanValue,
    };
    let updateEtapeCollected = {
        isCollected: true,
        commentaire: commentaire,
    }

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
        switch (action) {
            case "Assigne":
                if (info?.client != null) {
                    setError("Ce seau est déjà assigner à un client, veuillez contacter l'administrateur !")
                } else {
                    depotConteneur(action);
                    postPoids();
                }
                break;
            case "Collecte":
                if (info?.client === null) {
                    setError("Ce seau n'est assigner à aucun client, veuillez contacter l'administrateur !")
                } else {
                    retraitConteneur(action);
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
                setModalVisible(!modalVisible);
                setModalOff();
            })
            .catch(function (error) {
                console.log(error, ' sur post');
            });
    };

    //permet de déassigner le conteneur bdd (Table conteneur)
    const retraitConteneur = (value: string) => {
        if (value == "Collecte") {
            axios
                .patch(HOST_BACK + '/conteneur/' + scanValue, DeAssignation, {
                    headers: {
                        'Authorization': `Bearer ${clientToken}`
                    }
                })
                .then(function (result) {
                    axios
                        .patch(HOST_BACK + '/etape/' + etapeid, updateEtapeCollected, {
                            headers: {
                                'Authorization': `Bearer ${clientToken}`
                            }
                        })
                        .then(function (result) {
                            setIscollected(etapeIndex);
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                })
                .catch(function (error) {
                    alert("le seau n'a pas été collecté");
                });
        }
    };

    //permet d'assigner le conteneur en bdd (Table conteneur)
    const depotConteneur = (value: string) => {
        if (value == "Assigne") {
            axios
                .patch(HOST_BACK + '/conteneur/' + scanValue, Assignation, {
                    headers: {
                        'Authorization': `Bearer ${clientToken}`
                    }
                })
                .then(function (result) {
                    axios
                        .patch(HOST_BACK + '/etape/' + etapeid, {isAssigned: true}, {
                            headers: {
                                'Authorization': `Bearer ${clientToken}`
                            }
                        })
                        .then(function (result) {
                            setIsAssigned(etapeIndex);
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                })
                .catch(function (error) {
                    alert("le seau n'a pas été assigné")
                    console.log(Assignation, "assignation")
                });
        }
    };

    const setAllModal = () => {
        setModalVisible(!modalVisible)
        setModalOff()
    }

    const assignedOrCollected = () => {
        if (action === "Assigne") {
            return true
        } else if (action === "Collecte") {
            return true
        } else {
            return false
        }
    }


    return (
        <View style={popUpStyles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={popUpStyles.centeredView}>
                    <View style={popUpStyles.modalView}>
                        <Text
                            style={popUpStyles.modalTitre}>{action === "Collecte" ? "Collecte d'un seau" : action === "Assigne" ? "Assigner un seau" : "Une erreur c'est produite"}</Text>
                        {error != null &&
                            <Text style={popUpStyles.modalError}>{error}</Text>
                        }
                        {action === "Collecte" &&
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
                                {!limite
                                    ? <Text style={popUpStyles.modalError}>
                                    Limite de poids dépassé !
                                    </Text>
                                    : <Text></Text>
                                }
                            </View>
                        }
                        {assignedOrCollected() &&
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
                                    setAllModal();
                                }}>
                                <Text style={popUpStyles.textStyle}>Annuler</Text>
                            </Pressable>
                            {assignedOrCollected() &&
                                <Pressable
                                    style={[popUpStyles.button, popUpStyles.buttonSave]}
                                    onPress={() => {
                                        submit();
                                    }}>
                                    <Text style={popUpStyles.textStyle}>Enregistrer</Text>
                                </Pressable>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default popUp;
