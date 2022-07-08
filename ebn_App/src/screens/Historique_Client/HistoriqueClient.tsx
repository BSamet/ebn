import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    Image,
    useWindowDimensions,
    Pressable,
    Alert,
    Modal,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {HOST_BACK} from '../../../environment/environment';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import {ActivityIndicator, DataTable} from 'react-native-paper';
import {RefreshControl} from 'react-native';

const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

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
    const [clientToken, setClienToken] = useState<string | null>();
    const [myClientId, setClientId] = useState<string | null>();
    const [clientLastname, setClientLastname] = useState<string | null>();
    const [clientName, setClientName] = useState<string | null>();
    const [clientIsValide, setClientIsValide] = useState<string | null>();
    const [modalHistorique, setModalHistorique] = useState(false);
    const [infoHistorique, setInfoHistorique] = useState<HistoriqueClient>();
    //refresh pages
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        if (clientToken != null && myClientId != null) {
            fetchHistorique();
        }
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, [clientToken, myClientId]);

    const fetchHistorique = () => {
        axios
            .get(HOST_BACK + '/etape/client/' + myClientId, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                },
            })
            .then(res => {
                // recupération historique
                setMyHistorique(res.data.historique);
            });
    };

    useEffect(() => {
        AsyncStorage.getItem('token').then(tokenValue => {
            setClienToken(tokenValue);
            AsyncStorage.getItem('id').then(idValue => {
                setClientId(idValue);
                AsyncStorage.getItem('nom').then(lastnameValue => {
                    setClientLastname(lastnameValue);
                    AsyncStorage.getItem('prenom').then(nameValue => {
                        setClientName(nameValue);
                        AsyncStorage.getItem('isValide').then(isValide => {
                            setClientIsValide(isValide);
                        });
                    });
                });
            });
        });
    }, []);

    useEffect(() => {
        if (clientToken != null && myClientId != null) {
            fetchHistorique();
        }
    }, [clientToken, myClientId]);

    const {height} = useWindowDimensions();

    const openModalHistorique = (historique: HistoriqueClient) => {
        setInfoHistorique(historique);
        setModalHistorique(true);
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
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
                            Bonjour, {clientLastname} {clientName}
                        </Text>
                    </LinearGradient>
                </View>

                {clientIsValide === 'true' &&
                    <View style={styles.historiqueTitleContainer}>
                        <Text style={styles.titleText}>Votre historique</Text>
                    </View>
                }
                <Divider
                    style={{width: '100%', marginVertical: 10}}
                    color="#8AC997"
                    width={2}
                    orientation="horizontal"
                />

                {clientIsValide === 'true' &&
                    <>
                        <View style={styles.historiqueLegende}>
                            <Text style={styles.modalText}>🟢 : Récupération</Text>
                            <Text style={styles.modalText}>🔵 : Assignation</Text>
                        </View>
                        {myHistorique != null &&
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title style={{flex: 1.5}}>Date</DataTable.Title>
                                    <DataTable.Title style={{flex: 1}}>Type de déchets</DataTable.Title>
                                    <DataTable.Title
                                        style={{flex: 0.5, justifyContent: 'center'}}>Poids</DataTable.Title>
                                    <DataTable.Title
                                        style={{flex: 0.5, justifyContent: 'center'}}>Action</DataTable.Title>
                                </DataTable.Header>

                                {myHistorique?.map((hist, index) => (
                                    <Pressable onPress={() => openModalHistorique(hist)} key={index}>
                                        <DataTable.Header>
                                            <DataTable.Cell style={{flex: 1.5}}>
                                                {moment(hist.date).format('DD.MM.YYYY à HH[h] mm')}
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{flex: 1}}>
                                                {hist.typeDeDechet}
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{
                                                flex: 0.5,
                                                justifyContent: 'center'
                                            }}>{hist.poids != 0 ? hist.poids + " kg" : "/"}</DataTable.Cell>
                                            <DataTable.Cell style={{
                                                flex: 0.5,
                                                justifyContent: 'center'
                                            }}>{hist.poids != 0 ? "🟢" : "🔵"}</DataTable.Cell>
                                        </DataTable.Header>
                                    </Pressable>
                                ))}
                            </DataTable>
                        }
                    </>
                }
                {myHistorique === null &&
                    <View style={styles.loader}>
                        <ActivityIndicator animating={true} color={"#8AC997"} size={75}/>
                    </View>
                }
                {clientIsValide === 'false' &&
                    <View>
                        <Text style={styles.errorIsValide}>Votre compte est en attente de validation.{'\n'}Lorque celui-ci sera validé vous aurez accès à l'ensemble de l'application.</Text>
                    </View>
                }

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalHistorique}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitre}>
                                Historique du {'\n'}
                                {moment(infoHistorique?.date).format('DD/MM/YYYY à HH[h]mm')}
                            </Text>
                            <Text style={styles.modalText}>
                                Type de déchets : {infoHistorique?.typeDeDechet}
                            </Text>
                            <Text style={styles.modalText}>
                                Action : {infoHistorique?.typeAction}
                            </Text>
                            {infoHistorique?.poids != 0 &&
                                <Text style={styles.modalText}>
                                    Poids récuperé : {infoHistorique?.poids} kg
                                </Text>
                            }
                            <Text style={styles.modalText}>
                                Commentaire : {infoHistorique?.commentaire}
                            </Text>
                            <Pressable
                                style={styles.historiqueModalCancel}
                                onPress={() => {
                                    setModalHistorique(!modalHistorique);
                                }}>
                                <Text style={styles.textStyle}>Fermer</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: 250,
    },
    historiqueTitleContainer: {
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
    },
    modalTitre: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Confortaa-Bold',
        color: '#8AC997',
        fontSize: 20,
    },
    page: {
        backgroundColor: '#FFFFFF',
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
    historiqueModalCancel: {
        borderRadius: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#8AC997',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
        borderColor: 'white',
        borderWidth: 1,
        width: '50%',
        marginVertical: 5,
    },
    historiqueLegende: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'black',
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
        fontSize: 28,
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
    errorIsValide: {
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 17,
        color: 'red',
        fontWeight: 'bold',
        fontFamily: 'Confortaa-Regular',
    },
});
export default HistoriqueClient;
