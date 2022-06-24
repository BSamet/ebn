import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import {Divider} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import {HOST_BACK} from '../../../environment/environment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {ActivityIndicator, Checkbox, DataTable, RadioButton, Snackbar} from 'react-native-paper';
import {RefreshControl} from 'react-native';

const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

export interface dashboardClient {
    id: number;
    date: string;
    isCollected: boolean;
    commentaire: string;

    collecteur: {
        numeroCollecteur: number;
        numeroVelo: number;
        utilisateur: {
            id: number;
            role: string;
            nom: string;
            prenom: string;
            mail: string;
            telephone: string;
        };
    };
}

export interface ShowClient {
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
}


const DashBordClient = () => {
    // AsyncStorage
    const [clientToken, setClienToken] = useState<string | null>();
    const [myClientId, setClientId] = useState<string | null>();
    const [clientLastname, setClientLastname] = useState<string | null>();
    const [clientName, setClientName] = useState<string | null>();

    const [tourner, setTouner] = useState<dashboardClient[]>();
    const [myclient, setMyClient] = useState<ShowClient>();
    const [modalOpen, setModalOpen] = useState(false);
    const [myCollecteurModal, setMyCollecteurModal] = useState<dashboardClient>();
    const [isVisible, setIsVisible] = React.useState(false);
    // Modal Collect
    const [modalRamassage, setModalRamassage] = useState(false);
    const [visible, setVisible] = useState(false);
    const [wichModalCollect, setWichModalCollect] = useState<string>();
    const [mode, setMode] = useState('date');
    // Modal Collect OneTime
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState('');
    const [textDate, setTextDate] = useState('');
    const [errorOneTimeCollect, setErrorOneTimeCollect] = useState<string>();
    //Modal Subscribe
    const [selectedDay, setSelectedDay] = useState([
        {id: 1, day: 'Lundi', status: false},
        {id: 2, day: 'Mardi', status: false},
        {id: 3, day: 'Mercredi', status: false},
        {id: 4, day: 'Jeudi', status: false},
        {id: 5, day: 'Vendredi', status: false},
    ]);

    //Refresh pages
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        fetchEtape();
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const postRamasagge = (dayToPost: number[]) => {
        let formatDateSave = formatDateForPost(date)
        let data;

        if (wichModalCollect === 'subscribe') {
            data = {
                refDate: formatDateSave,
                clientId: myClientId,
                days: dayToPost,
                isSubscribe: true,
            };
        } else {
            data = {
                refDate: formatDateSave,
                clientId: myClientId,
                isSubscribe: false,
            };
        }

        axios
            .post(HOST_BACK + '/collect', data, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                },
            })
            .then(resp => {
                if (resp.status === 201) {
                    setIsVisible(true);
                }
            })
            .catch(function (error) {
                console.log(error + ' sur post');
            })
            .finally(() => {
                setTextDate('');
                setTimeSlot('');
            });
    };
    const submit = () => {
        let dayToPost: number[] = []
        selectedDay.map((e) => {
            if (e.status) {
                dayToPost.push(e.id);
            }
        })
        if (textDate === '') {
            setErrorOneTimeCollect('Veuillez sélectionner une date !')
        } else if (timeSlot === '') {
            setErrorOneTimeCollect('Veuillez sélectionner une tranche horaire !')
        } else if (wichModalCollect === 'subscribe' && dayToPost.length === 0) {
            setErrorOneTimeCollect('Veuillez sélectionner au moins un jour !')
        } else {
            updateAllCheckedDayToFalse();
            setErrorOneTimeCollect('')
            setTextDate('')
            setTimeSlot('')
            setModalRamassage(!modalRamassage);
            postRamasagge(dayToPost);
        }
    };
    const cancel = () => {
        updateAllCheckedDayToFalse();
        setErrorOneTimeCollect('')
        setTextDate('')
        setTimeSlot('')
        setModalRamassage(!modalRamassage);
    };

    const fetchEtape = () => {
        axios
            .get(HOST_BACK + '/etape/client/' + myClientId, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                },
            })
            .then(res => {
                // appel de l'api
                // recupération client
                setMyClient(res.data.etape[0].client);
                // recuperer les infos du collecteur sans map
                setTouner(res.data.etape);
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
                    });
                });
            });
        });
    }, []);

    useEffect(() => {
        if (clientToken != null && myClientId != null) {
            fetchEtape();
        }
    }, [clientToken, myClientId]);

    // fonction pour les modales
    const showOneTimeModal = () => {
        setWichModalCollect('oneTime')
        setModalRamassage(true);
    };

    const showSubscribeModal = () => {
        setWichModalCollect('subscribe')
        setModalRamassage(true);
    };

    const formatDateForPost = (date: Date) => {
        let formatDate = new Date(
            +date.getFullYear(),
            +date.getMonth(),
            +date.getDate(),
            timeSlot === 'Matin' ? 8 : timeSlot === "Après-midi" ? 12 : 0,
            0,
            0,
        )

        return new Date(moment(formatDate).utc(true).format());
    }

    // toute les fonction pour le datePicker
    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setVisible(false);
        let Fdate = format(currentDate, 'dd/MM/yyyy', 'Europe/Berlin');
        let formatDateSave = formatDateForPost(currentDate)

        setDate(formatDateSave);
        setTextDate(Fdate);
    };

    const showDate = () => {
        setMode('date');
        showPicker();
    };

    const showPicker = () => {
        setVisible(true);
    };

    const selectDayForChecked = (dayNumber: number) => {
        const newCheckedDay = selectedDay.map(day => {
            if (day.id === dayNumber) {
                return {...day, status: !day.status};
            }
            return day;
        });

        setSelectedDay(newCheckedDay);
    }

    const updateAllCheckedDayToFalse = () => {
        const newCheckedDay = selectedDay.map(day => {
            return {...day, status: false};
        });

        setSelectedDay(newCheckedDay);
    }

    const onPressOnCheckbox = (dayNumber: number) => {
        selectDayForChecked(dayNumber);
    }

    const {height} = useWindowDimensions();

    const onDismissSnackBar = () => {
        setIsVisible(false);
    };

    const [testDay, setTestDay] = useState(['lundi', 'jeudi', 'vendredi'])
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
                {/* gestion demande de ramassage ponctuel */}
                <Snackbar
                    wrapperStyle={{top: 0}}
                    theme={{
                        colors: {
                            surface: 'white',
                            accent: 'white',
                            onSurface: '#8AC997',
                        },
                        animation: {
                            scale: 2,
                        },
                    }}
                    visible={isVisible}
                    duration={2500}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                        },
                    }}>
                    Votre demande de collecte à été prise en charge !
                </Snackbar>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalRamassage}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitre}> Votre demande
                                {wichModalCollect === 'oneTime' ? ' de collecte' : wichModalCollect === 'subscribe' ? ' d\'abonnement' : ' ERREUR !'}
                            </Text>
                            <Pressable style={styles.collecteModalSubmit} onPress={showDate}>
                                <Text style={styles.textStyle}> Choisir une date</Text>
                            </Pressable>
                            <View style={styles.timeSlotContainer}>
                                {wichModalCollect === 'subscribe' &&
                                selectedDay.map((day, index) => (
                                    <Pressable key={index}
                                               style={styles.timeSlot}
                                               onPress={() => {
                                                   onPressOnCheckbox(day.id)
                                               }}>
                                        <Text
                                            style={[styles.timeSlotBaseButton, day.status ? styles.daySelected : '']}>{day.day}</Text>
                                        <Checkbox
                                            color={'#2196F3'} uncheckedColor={'lightgrey'}
                                            status={day.status ? 'checked' : 'unchecked'}
                                        />
                                    </Pressable>
                                ))
                                }
                            </View>
                            <View style={styles.timeSlotContainer}>
                                <Pressable style={styles.timeSlot} onPress={() => setTimeSlot('Matin')}>
                                    <Text
                                        style={[styles.timeSlotBaseButton, timeSlot === 'Matin' ? styles.timeSlotSelected : '']}>Matin</Text>
                                    <RadioButton color={'#8AC997'} uncheckedColor={'lightgrey'} value="Matin"
                                                 status={timeSlot === 'Matin' ? 'checked' : 'unchecked'}
                                                 onPress={() => setTimeSlot('Matin')}
                                    />
                                </Pressable>
                                <Pressable style={styles.timeSlot} onPress={() => setTimeSlot('Après-midi')}>
                                    <Text
                                        style={[styles.timeSlotBaseButton, timeSlot === 'Après-midi' ? styles.timeSlotSelected : '']}>Après-midi</Text>
                                    <RadioButton color={'#8AC997'} uncheckedColor={'lightgrey'} value="Après-midi"
                                                 status={timeSlot === 'Après-midi' ? 'checked' : 'unchecked'}
                                                 onPress={() => setTimeSlot('Après-midi')}
                                    />
                                </Pressable>
                            </View>
                            <Text style={styles.textDate}>
                                Vous avez
                                demander {wichModalCollect === "oneTime" ? 'une collecte' : wichModalCollect === 'subscribe' ? 'un abonnement' : ''} : {'\n'}
                                {wichModalCollect === "oneTime" &&
                                <Text style={styles.date}>
                                    {textDate != '' ? 'Le ' + textDate : ''}
                                    {textDate != '' && timeSlot != '' ? ' entre ' : textDate === '' && timeSlot != '' ? ' Entre ' : ''}
                                    {timeSlot != '' && timeSlot === 'Matin' ? '08h00 et 12h00' : timeSlot != '' && timeSlot === 'Après-midi' ? '12h00 et 17h00' : ''}
                                </Text>
                                }
                                {wichModalCollect === "subscribe" &&
                                <Text style={styles.date}>
                                    {textDate != '' ? 'A partir du ' + textDate + ',\n' : ''}
                                    {textDate != '' && timeSlot != '' ? 'entre ' : textDate === '' && timeSlot != '' ? 'Entre ' : ''}
                                    {timeSlot != '' && timeSlot === 'Matin' ? '08h00 et 12h00' : timeSlot != '' && timeSlot === 'Après-midi' ? '12h00 et 17h00' : ''}
                                    {selectedDay.filter((checkDay) => checkDay.status).map(day =>
                                        ' le ' + day.day
                                    ).join(',')}
                                </Text>
                                }
                            </Text>
                            {visible && (
                                <RNDateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    onChange={onChange}
                                />
                            )}
                            <View style={styles.collecteModalSubmitContainer}>
                                <Pressable
                                    style={styles.collecteModalCancel}
                                    onPress={() => {
                                        cancel();
                                    }}>
                                    <Text style={styles.textStyle}>Annuler</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.collecteModalSubmit}
                                    onPress={() => {
                                        submit();
                                    }}>
                                    <Text style={styles.textStyle}>Enregistrer</Text>
                                </Pressable>
                            </View>
                            <Text style={styles.errorOneTimeCollect}>{errorOneTimeCollect}</Text>
                        </View>
                    </View>
                </Modal>

                <View style={styles.requestCollecteContainer}>
                    <Text style={styles.titleText}>Vos collectes</Text>
                    <View style={styles.requestCollecteButton}>
                        <Pressable
                            style={[styles.Ramassage, styles.collectButton]}
                            onPress={() => showOneTimeModal()}>
                            <Text style={styles.textStyle}>Collecte</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.Ramassage, styles.subscribeButton]}
                            onPress={() => showSubscribeModal()}>
                            <Text style={styles.textStyle}>Abonnement</Text>
                        </Pressable>
                    </View>
                </View>

                <Divider
                    style={{width: '100%', margin: 10}}
                    color="#8AC997"
                    width={2}
                    orientation="horizontal"
                />

                {tourner != null &&
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{flex: 1.5}}>Date</DataTable.Title>
                        <DataTable.Title style={{flex: 1}}>Collecteur</DataTable.Title>
                        <DataTable.Title>Numéro téléphone</DataTable.Title>
                    </DataTable.Header>

                    {tourner?.map((item, index) => (
                        <DataTable.Header key={index}>
                            <DataTable.Cell style={{flex: 1.5}}>
                                {moment(item.date).format('DD.MM.YYYY à HH[h] mm')}
                            </DataTable.Cell>
                            <DataTable.Cell style={{flex: 1}}>
                                {item.collecteur.utilisateur.nom}{' '}
                                {item.collecteur.utilisateur.prenom}
                            </DataTable.Cell>
                            <DataTable.Cell>
                                {item.collecteur.utilisateur.telephone}
                            </DataTable.Cell>
                        </DataTable.Header>
                    ))}
                </DataTable>
                }
                {tourner === null &&
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
        width: '100%',
        height: 250,
    },
    requestCollecteContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    requestCollecteButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 28,
        marginTop: 20,
        paddingHorizontal: 10,
        color: 'black',
        fontFamily: 'Confortaa-Regular',
    },
    timeSlotContainer: {
        marginVertical: 10,
    },
    timeSlot: {
        width: 175,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    timeSlotBaseButton: {
        textAlign: 'center',
        fontSize: 17,
        color: 'lightgrey',
        fontFamily: 'Confortaa-Regular',
    },
    timeSlotSelected: {
        fontWeight: 'bold',
        color: '#8AC997'
    },
    daySelected: {
        fontWeight: 'bold',
        color: '#2196F3'
    },
    Ramassage: {
        borderRadius: 30,
        padding: 10,
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
        borderColor: 'white',
        borderWidth: 1,
        width: '40%',
    },
    collectButton: {
        backgroundColor: '#8AC997',
    },
    subscribeButton: {
        backgroundColor: '#2196F3',
    },
    errorOneTimeCollect: {
        textAlign: 'center',
        fontSize: 15,
        color: 'red',
        fontWeight: 'bold',
        fontFamily: 'Confortaa-Regular',
    },
    collecteModalSubmitContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    collecteModalSubmit: {
        borderRadius: 30,
        padding: 10,
        backgroundColor: '#8AC997',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
        borderColor: 'white',
        borderWidth: 1,
        width: '50%',
        marginVertical: 5,
    },
    collecteModalCancel: {
        borderRadius: 30,
        padding: 10,
        backgroundColor: '#ff0000',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
        borderColor: 'white',
        borderWidth: 1,
        width: '50%',
        marginVertical: 5,
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTitre: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
        color: 'black',
    },
    textDate: {
        textAlign: 'center',
        fontSize: 17,
        color: '#000000',
        fontFamily: 'Confortaa-Regular',
    },
    date: {
        textAlign: 'center',
        fontSize: 17,
        color: '#8AC997',
        fontFamily: 'Confortaa-Regular',
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    input: {
        marginBottom: 15,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    },

    divider: {paddingTop: 10, width: 25},
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
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
    modalHistoriqueText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Confortaa-Bold',
        fontSize: 18,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Confortaa-Bold',
        color: '#8AC997',
        fontSize: 20,
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
    page: {
        backgroundColor: '#FFFFFF',
    },

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
    poids: {
        color: 'black',
        marginLeft: 10,
        fontFamily: 'Confortaa-Bold',
        fontSize: 16,
    },
});

export default DashBordClient;
