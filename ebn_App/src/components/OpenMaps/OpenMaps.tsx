import React from 'react';
import {Linking, Platform, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from "react-native-elements";

export interface OpenMapsProps {
    address: string,
}

const OpenMaps = ({address}:OpenMapsProps) => {

    const openMap = async () => {
        let origin = "35 Av. de Colmar, 68200 Mulhouse"
        let finalDestination = "Place de la victoire, 68100 Mulhouse"
        let waypoint = "21 Bd du Président Roosevelt, 68200 Mulhouse|2A Bd du Président Roosevelt, 68200 Mulhouse|46 Rue des Franciscains, 68100 Mulhouse"
        const url ='https://www.google.com/maps/dir/?api=1&origin='+origin+'&destination='+finalDestination+'&waypoints='+waypoint+'&dir_action=navigate&travelmode=bicycling';
        await Linking.openURL(url);
    }

    return (
        <View>
            <TouchableOpacity
                onPress={() => openMap() }>
                <Icon name="md-navigate" style={{fontSize: 24}} tvParallaxProperties={undefined} />
                <Text
                    style={{ fontSize: 13, fontWeight: "700", lineHeight: 14 }}
                ></Text>
            </TouchableOpacity>
        </View>
    )
};

export default OpenMaps;
