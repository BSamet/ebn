import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {EtapeCollecteur} from "../../screens/Dashbord_Collecteur/DashBordCollecteur";
import Geolocation from '@react-native-community/geolocation';
import {ActivityIndicator} from "react-native-paper";
import React, {useState} from "react";

const OpenMaps = ({steps}:EtapeCollecteur[]) => {
    let filteredAddress: any[];
    const [loadingMaps, setLoadingMaps] = useState(false);

    const filterAdresseByNotCollected = async () => {
        filteredAddress= []
        await steps.filter((notCollected) => !notCollected.isCollected).map((step) => {
            filteredAddress.push(step.client.adresse)
        })
    }

    const openMap = async () => {
        setLoadingMaps(true);
        await filterAdresseByNotCollected();
        await Geolocation.getCurrentPosition(
            async position => {
                JSON.stringify(position);
                let allWaypoint = Object.assign([], filteredAddress);
                allWaypoint.splice(-1,1);
                let allWaypointJoined = allWaypoint.join("|")
                let origin = position.coords.latitude + "%2C" + position.coords.longitude;
                let finalDestination = filteredAddress[filteredAddress.length -1]
                let waypoint = allWaypointJoined;
                const url = 'https://www.google.com/maps/dir/?api=1&origin=' + origin + '&destination=' + finalDestination + '&waypoints=' + waypoint + '&dir_action=navigate&travelmode=bicycling';
                await Linking.openURL(url).then(() => {
                    setLoadingMaps(false);
                });
            },
            error => console.log('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }

    return (
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
        width: '75%',
        marginVertical: 5,
    },
    textButton: {
        textAlign: 'center',
        fontSize: 17,
        color: '#ffffff',
        fontFamily: 'Confortaa-Regular',
    },
})

export default OpenMaps;
