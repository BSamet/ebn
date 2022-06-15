import React, {useEffect} from 'react';
import {
    Button,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import {useState} from 'react';
import axios from 'axios';
import {HOST_BACK} from '../../../environment/environment';
import moment from 'moment';
import QrCodeScanner from '../../components/qrCodeScanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Divider} from "react-native-elements";
import {Card, Avatar, Checkbox, Paragraph, ActivityIndicator} from "react-native-paper";

require('moment/locale/fr.js');

interface EtapeCollecteur {
    id: number;
    date: string;
    isCollected: boolean;
    isAssigned: boolean;
    commentaire: string;
    client: {
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
    };
}

interface collecteurInterface {
    id: number;
    numeroCollecteur: number;
    numeroVelo: number;
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

const DashBordCollecteur = () => {
    // const navigation = useNavigation<AuthScreenNavigate>();
    const {height} = useWindowDimensions();
    const [etapes, setEtapes] = useState<EtapeCollecteur[]>();
    const [fetchOnce, setFetchOnce] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [ClientModal, setClientModal] = useState<EtapeCollecteur>();
    const [collecteurName, setCollecteurName] = useState<string | null>();
    const [collecteurLastname, setCollecteurLastname] = useState<string | null>();

    let collecteurId: string | null;
    let collecteurToken: string | null;

    useEffect(() => {
        if (fetchOnce) {
            AsyncStorage.getItem('id').then(idValue => {
                collecteurId = idValue;
                AsyncStorage.getItem('token').then(tokenValue => {
                    collecteurToken = tokenValue;
                    AsyncStorage.getItem('prenom').then(nameValue => {
                        setCollecteurName(nameValue);
                        AsyncStorage.getItem('nom').then(lastnameValue => {
                            setCollecteurLastname(lastnameValue);
                            axios
                                .get(HOST_BACK + '/etape/collecteur/' + collecteurId, {
                                    headers: {
                                        Authorization: `Bearer ${collecteurToken}`,
                                    },
                                })
                                .then(res => {
                                    setEtapes(res.data); // recuperation des etapes pour map
                                    setFetchOnce(false);
                                })
                                .catch((e) => {
                                    console.log(e)
                                });
                        });
                    });
                });
            });
        }
    }, [etapes, fetchOnce]);


    const updateCollecte = (index: number) => {
        setEtapes((etapes) => {
            const updatedEtape = [...etapes];
            updatedEtape[index].isCollected = true
            return updatedEtape
        })
    }

    const updateAssigned = (index: number) => {
        setEtapes((etapes) => {
            const updatedEtape = [...etapes];
            updatedEtape[index].isAssigned = true
            return updatedEtape
        })
    }

    const collectedOrAssigned = (index: number) => {
        if (etapes[index].isCollected && etapes[index].isAssigned) {
            return "Collecté et Assigné"
        } else if (etapes[index].isCollected) {
            return "Collecté"
        } else {
            return "Non collecté"
        }
    }

    const collectedOrAssignedColor = (index: number) => {
        if (etapes[index].isCollected && etapes[index].isAssigned) {
            return "#0096f0"
        } else if (etapes[index].isCollected) {
            return "#8AC997"
        } else {
            return "red"
        }
    }

    return (
        <ScrollView>
            <View style={styles.page}>
                <View>
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
                            Bonjour, {collecteurLastname} {collecteurName}
                        </Text>
                    </LinearGradient>
                </View>

                <View style={styles.header}>
                    <Text style={styles.titleText}>Votre Agenda
                        du {'\n'} {moment(Date.now()).locale('fr').format('DD MMMM YYYY')}</Text>
                </View>

                <Divider
                    style={{width: '100%', margin: 10}}
                    color="#8AC997"
                    width={2}
                    orientation="horizontal"
                />

                <Modal animationType="slide" transparent={true} visible={modalOpen}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Nom : {ClientModal?.client.utilisateur.nom}
                            </Text>
                            <Text style={styles.modalText}>
                                Prénom: {ClientModal?.client.utilisateur.prenom}
                            </Text>
                            <Text style={styles.modalText}>
                                Téléphone : {ClientModal?.client.utilisateur.telephone}
                            </Text>
                            <Text style={styles.modalText}>
                                Adresse: {ClientModal?.client.adresse}
                            </Text>

                            <Pressable
                                style={[styles.buttonModal, styles.buttonClose]}
                                onPress={() => setModalOpen(!modalOpen)}>
                                <Text style={styles.textStyle}>Fermer</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                {fetchOnce &&
                    etapes?.map((item, index) => (
                        <Card style={styles.cardContainer} key={index}>
                            <Card.Title title={item.client.nomCommercial}
                                        subtitle={collectedOrAssigned(index)}
                                        subtitleStyle={{color: collectedOrAssignedColor(index)}}/>
                            <Card.Content style={styles.cardMainContainer}>
                                <Paragraph>Heure : {moment(item.date).utc().format('HH[h] mm')}</Paragraph>
                                <Paragraph>Adresse : {item.client.adresse}</Paragraph>
                            </Card.Content>
                            <Card.Actions style={styles.cardActionContainer}>
                                <QrCodeScanner data={item.client.id} titleButton={"Collecte"} action={"Collecte"}
                                               colorButton={"#8AC997"}
                                               etapeIndex={index} setIscollected={updateCollecte} etapeId={item.id}
                                               disabled={item.isCollected}/>
                                <QrCodeScanner data={item.client.id} titleButton={"Assigner"} action={"Assigne"}
                                               colorButton={"#0096f0"}
                                               etapeIndex={index} setIsAssigned={updateAssigned} etapeId={item.id}
                                               disabled={item.isAssigned}/>
                            </Card.Actions>
                        </Card>
                    ))
                }
                {!fetchOnce &&
                    <View style={styles.loader}>
                        <ActivityIndicator animating={true} color={"#8AC997"} size={75}/>
                    </View>
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        width:'100%',
        height:250,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'transparent',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Confortaa-Bold',
        color: '#8AC997',
        fontSize: 20,
    },
    button: {},
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
        textAlign: "center",
        fontSize: 28,
        marginTop: 20,
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
    cardContainer: {
        borderBottomColor: "black",
        borderBottomWidth: 0.5,
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    cardMainContainer: {
        display: "flex",
        alignItems: "center"
    },
    cardActionContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flex: 1
    },
});

export default DashBordCollecteur;
