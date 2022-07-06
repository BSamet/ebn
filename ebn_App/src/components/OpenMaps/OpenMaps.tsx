import {Linking, PermissionsAndroid, Pressable, StyleSheet, Text, View} from 'react-native';
import {EtapeCollecteur} from "../../screens/Dashbord_Collecteur/DashBordCollecteur";
import Geolocation from '@react-native-community/geolocation';
import {ActivityIndicator} from "react-native-paper";
import React, {useState} from "react";

const OpenMaps = ({steps}:EtapeCollecteur[]) => {
    let filteredAddress: any[];
    const [loadingMaps, setLoadingMaps] = useState(false);
    const [askedLocationPermission, setAskedLocationPermission] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const [errorLocation, setErrorLocation] = useState('');

    const filterAdresseByNotCollected = async () => {
        filteredAddress = []

        await steps.filter((notCollected) => !notCollected.isCollected).map((step) => {
            filteredAddress.push(step.client.adresse)
        })
    }

    const requestAccessLocationPermission = async () => {
        try {
            const checkLocation = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS. ACCESS_FINE_LOCATION
            )
            if (!checkLocation && !askedLocationPermission) {
                setAskedLocationPermission(true)
                setErrorLocation("Veuillez autoriser la localisation !")
            } else if (!checkLocation && askedLocationPermission) {
                setErrorLocation("")
                setOpenSettings(true)
            } else {
                setErrorLocation("Veuillez activé la localisation !")
                setOpenSettings(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const openSettingsApp = async () => {
        await Linking.openSettings()
    }

    const openMap = async () => {
        setLoadingMaps(true);
        // On filtre les adresses pour avoir que ceux qui ne sont pas collecté
        await filterAdresseByNotCollected();
        Geolocation.getCurrentPosition(
            async (position) => {
                setErrorLocation('');
                setOpenSettings(false);
                JSON.stringify(position);
                // On met les adresses filtrer dans un nouveau tableau
                let allWaypoint = Object.assign([], filteredAddress);
                // On enlever la dernière
                allWaypoint.splice(-1, 1);
                // On fait une jointure avec | pour l'api google
                let allWaypointJoined = allWaypoint.join("|");
                // On paramètre la position actuelle
                let origin = position.coords.latitude + "%2C" + position.coords.longitude;
                // On paramètre la destination final
                let finalDestination = filteredAddress[filteredAddress.length - 1];
                // On crée notre url
                const url = 'https://www.google.com/maps/dir/?api=1&origin=' + origin + '&destination=' + finalDestination + '&waypoints=' + allWaypointJoined + '&dir_action=navigate&travelmode=bicycling';
                // On ouvre notre maps
                await Linking.openURL(url).then(() => {
                    setLoadingMaps(false);
                });
            },
            () => {
                requestAccessLocationPermission();
                setLoadingMaps(false);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    return (
        <View>
            <View>
                <Pressable
                    style={styles.openMapsButton}
                    onPress={() => openMap() }>
                    {!loadingMaps ?
                        <Text style={styles.textButton}>Commencer la collecte</Text>
                        :
                        <View style={styles.loader}>
                            <ActivityIndicator animating={true} color={"#ffffff"} size={25}/>
                        </View>
                    }
                </Pressable>
            </View>
            <View>
                {errorLocation != '' &&
                    <Text style={styles.errorText}>{errorLocation}</Text>
                }
            </View>
            <View>
                {openSettings &&
                    <Pressable onPress={() => openSettingsApp()}>
                    <Text style={styles.errorText}>
                        Veuillez autoriser la localisation{" :\n"}
                        <Text style={styles.errorSettings}>Ouvrir les paramètres.</Text>
                    </Text>
                    </Pressable>
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    openMapsButton: {
        borderRadius: 30,
        padding: 10,
        backgroundColor: '#8AC997',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
        borderColor: 'white',
        borderWidth: 1,
        width: 250,
        marginVertical: 5,
    },
    textButton: {
        textAlign: 'center',
        fontSize: 17,
        color: '#ffffff',
        fontFamily: 'Confortaa-Regular',
    },
    errorText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#ff0000',
    },
    errorSettings: {
        fontSize: 15,
        fontWeight: 'bold',
        textDecorationLine: "underline",
        marginBottom: 10,
        textAlign: 'center',
        color: '#0096f0',
    }
})

export default OpenMaps;
