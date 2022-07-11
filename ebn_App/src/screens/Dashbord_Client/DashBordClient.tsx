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
import {StackActions, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack/lib/typescript/src/types";
import {AuthRootParamList} from "../../../App";

type AuthScreenNavigate = NativeStackNavigationProp<AuthRootParamList>;


const wait = (timeout: number | undefined) => {
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
    clientvalide: boolean;
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
    collect: [{
        cronExpression: string;
        refDate: string;
        typeDechet: {
            id: number,
            typeDechets: string;
        }
    }];
    typeDechet: [{
        id: number,
        typeDechets: string;
    }]
}

export interface TypeOfWaste {
    id: number,
    typeDechets: string
}


const DashBordClient = () => {
    const navigation = useNavigation<AuthScreenNavigate>();

    // AsyncStorage
    const [clientToken, setClienToken] = useState<string | null>();
    const [clientTokenExp, setClientTokenExp] = useState<number | null>();
    const [myClientId, setClientId] = useState<string | null>();
    const [clientLastname, setClientLastname] = useState<string | null>();
    const [clientName, setClientName] = useState<string | null>();
    const [clientIsValide, setClientIsValide] = useState<string | null>();

    const [tournee, setTournee] = useState<dashboardClient[]>();
    const [myclient, setMyClient] = useState<ShowClient>();
    const [allTypeOfWaste, setAllTypeOfWaste] = useState<TypeOfWaste[]>();
    const [isVisible, setIsVisible] = React.useState(false);
    // Modal Collect
    const [modalRamassage, setModalRamassage] = useState(false);
    const [visible, setVisible] = useState(false);
    const [wichModalCollect, setWichModalCollect] = useState<string>();
    const [mode, setMode] = useState('date');
    // Modal Collect OneTime
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState('');
    const [typeOfWaste, setTypeOfWaste] = useState<TypeOfWaste>()
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
        if (clientToken != null && myClientId != null) {
            fetchClient();
            fetchEtape();
            fetchTypeOfWaste()
        }
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, [clientToken, myClientId]);

    const postRamasagge = (dayToPost: number[]) => {
        let formatDateSave = formatDateForPost(date)
        let data;
        if (wichModalCollect === 'subscribe') {
            data = {
                refDate: formatDateSave,
                clientId: myClientId,
                days: dayToPost,
                isSubscribe: true,
                typeDechetId: typeOfWaste?.id
            };
        } else {
            data = {
                refDate: formatDateSave,
                clientId: myClientId,
                isSubscribe: false,
                typeDechetId: typeOfWaste?.id
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
                    let newCollect = {...myclient};
                    newCollect.collect?.push(resp.data)
                    setMyClient(newCollect)
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
        } else if (typeOfWaste === undefined) {
            setErrorOneTimeCollect("Veuillez séléctionner un type de déchet !")
        } else {
            let formatDateSave = formatDateForPost(date)
            let findCollect = false;
            myclient?.collect.map((collect) => {
                if (collect.cronExpression === null && wichModalCollect === 'oneTime') {
                    if (collect.refDate === new Date(formatDateSave).toISOString() && collect.typeDechet.id === typeOfWaste.id) {
                        findCollect = true;
                    }
                } else if (collect.cronExpression != null && wichModalCollect === 'subscribe') {
                    // Récupérer les heures dans la demande abonnement et les abonnements en cours
                    let refDateToDate = new Date(collect.refDate);
                    let getHourInCollectDate = refDateToDate.getHours();
                    let subscribeRequestDateToDate = new Date(formatDateSave);
                    let getHourInCollectRequestDate = subscribeRequestDateToDate.getHours()

                    if (getHourInCollectDate.toString() === getHourInCollectRequestDate.toString() && collect.typeDechet.id === typeOfWaste.id) {
                        let splitCronExpression = collect.cronExpression.split(' ');
                        let takeSplitCronExpressionDays = splitCronExpression[splitCronExpression.length - 1];
                        let allDaysInCronExpressionToArray = takeSplitCronExpressionDays.split(',');
                        if (allDaysInCronExpressionToArray.some(day => dayToPost.includes(parseInt(day)))) {
                            findCollect = true;
                        }
                    }
                }
            })
            if (findCollect && wichModalCollect === "oneTime") {
                setErrorOneTimeCollect('Vous avez déjà une demande collecte à cette date !')
            } else if (findCollect && wichModalCollect === "subscribe") {
                setErrorOneTimeCollect('Vous avez déjà un abonnement à cette date en cours !')
            } else {
                updateAllCheckedDayToFalse();
                setErrorOneTimeCollect('');
                setTextDate('');
                setTimeSlot('');
                setTypeOfWaste(undefined);
                setModalRamassage(!modalRamassage);
                postRamasagge(dayToPost);
            }
        }
    };
    const cancel = () => {
        updateAllCheckedDayToFalse();
        setErrorOneTimeCollect('')
        setTextDate('')
        setTimeSlot('')
        setTypeOfWaste(undefined)
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
                setTournee(res.data.etape);
            });
    };

    const fetchClient = () => {
        axios
            .get(HOST_BACK + '/client/' + myClientId, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                },
            })
            .then(res => {
                setMyClient(res.data);
            });
    }

    const fetchTypeOfWaste = () => {
        axios
            .get(HOST_BACK + '/type-dechets/', {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                },
            })
            .then(res => {
                setAllTypeOfWaste(res.data);
            });
    }

    const clearAll = async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            console.log(e);
        }
    };

    const checkTokenExp = () => {
        if(clientTokenExp) {
            if (clientTokenExp * 1000 < Date.now()) {
                clearAll().then(() => {
                    navigation.dispatch(StackActions.popToTop());
                })
            } else {
                return
            }
        } else {
            clearAll().then(() => {
                navigation.dispatch(StackActions.popToTop());
            })
        }
    }

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
                            AsyncStorage.getItem('token_exp').then(tokenExp => {
                                if (typeof tokenExp === "string") {
                                    setClientTokenExp(parseInt(tokenExp))
                                }
                            })
                        });
                    });
                });
            });
        });
    }, []);

    useEffect(() => {
        if (clientToken != null && myClientId != null && clientTokenExp != null) {
            fetchClient();
            fetchEtape();
            fetchTypeOfWaste()
            checkTokenExp()
        }
    }, [clientToken, myClientId, clientTokenExp]);

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

        return new Date(formatDate);
    }

    // toute les fonction pour le datePicker
    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setVisible(false);
        let Fdate = format(currentDate, 'dd/MM/yyyy', 'Europe/Paris');
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
                    visible={modalRamassage}
                >
                    <ScrollView>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalTitre}> Votre demande
                                    {wichModalCollect === 'oneTime' ? ' de collecte' : wichModalCollect === 'subscribe' ? ' d\'abonnement' : ' ERREUR !'}
                                </Text>
                                <Pressable style={styles.collecteModalSubmit} onPress={showDate}>
                                    <Text style={styles.textStyle}> Choisir une date</Text>
                                </Pressable>
                                {wichModalCollect === 'subscribe' &&
                                    <Text style={styles.textDate}>Jour demandé :</Text>
                                }
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
                                <Text style={styles.textDate}>Tranche horaire :</Text>
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
                                <Text style={styles.textDate}>Type de déchet :</Text>
                                <View style={styles.timeSlotContainer}>
                                    {allTypeOfWaste?.map((waste, index) => (
                                        <Pressable style={styles.timeSlot} onPress={() => setTypeOfWaste({
                                            id: waste.id,
                                            typeDechets: waste.typeDechets
                                        })} key={index}>
                                            <Text
                                                style={[styles.timeSlotBaseButton, typeOfWaste?.id === waste.id ? styles.timeSlotSelected : '']}>{waste.typeDechets}</Text>
                                            <RadioButton color={'#8AC997'} uncheckedColor={'lightgrey'} value="Matin"
                                                         status={typeOfWaste?.id === waste.id ? 'checked' : 'unchecked'}
                                                         onPress={() => setTypeOfWaste({
                                                             id: waste.id,
                                                             typeDechets: waste.typeDechets
                                                         })}
                                            />
                                        </Pressable>
                                    ))}
                                </View>
                                <Text style={styles.textDate}>
                                    Vous avez
                                    demander {wichModalCollect === "oneTime" ? 'une collecte' : wichModalCollect === 'subscribe' ? 'un abonnement' : ''} : {'\n'}
                                    {wichModalCollect === "oneTime" &&
                                        <Text style={styles.date}>
                                            {typeOfWaste?.typeDechets != undefined ? "De " + typeOfWaste?.typeDechets.toLowerCase() : ''}
                                            {textDate != '' && typeOfWaste === undefined ? 'Le ' + textDate : textDate != '' && typeOfWaste != undefined ? ', le ' + textDate : ''}
                                            {(textDate != '' && timeSlot != '') || (timeSlot != '' && typeOfWaste != undefined) ? ' entre ' : textDate === '' && typeOfWaste === undefined && timeSlot != '' ? ' Entre ' : ''}
                                            {timeSlot != '' && timeSlot === 'Matin' ? '08h00 et 12h00' : timeSlot != '' && timeSlot === 'Après-midi' ? '12h00 et 17h00' : ''}
                                        </Text>
                                    }
                                    {wichModalCollect === "subscribe" &&
                                        <Text style={styles.date}>
                                            {typeOfWaste?.typeDechets != undefined ? "De " + typeOfWaste?.typeDechets.toLowerCase() : ''}
                                            {textDate != '' && typeOfWaste === undefined ? 'À partir du ' + textDate + ',\n' : textDate != '' && typeOfWaste != undefined ? ', à partir du ' + textDate + ',\n' : ''}
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
                    </ScrollView>
                </Modal>

                {clientIsValide === 'true' &&
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
                }

                <Divider
                    style={{width: '100%', marginVertical: 10}}
                    color="#8AC997"
                    width={2}
                    orientation="horizontal"
                />

                {(tournee != null && clientIsValide === 'true') &&
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style={{flex: 1.5}}>Date</DataTable.Title>
                            <DataTable.Title style={{flex: 1}}>Collecteur</DataTable.Title>
                            <DataTable.Title>Numéro téléphone</DataTable.Title>
                        </DataTable.Header>

                        {tournee?.map((item, index) => (
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
                {tournee === null &&
                    <View style={styles.loader}>
                        <ActivityIndicator animating={true} color={"#8AC997"} size={75}/>
                    </View>
                }
                {clientIsValide === 'false' &&
                    <View>
                        <Text style={styles.errorIsValide}>Votre compte est en attente de validation.{'\n'}Lorque celui-ci sera validé vous aurez accès à l'ensemble de l'application.</Text>
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
    errorIsValide: {
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 17,
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
