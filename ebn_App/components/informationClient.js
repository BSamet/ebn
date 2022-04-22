import React from 'react';
import {Text, View} from 'react-native';
import informationClientStyle from '../styles/informationClientStyle';

const informationClient = () => {
  return (
    <View style={informationClientStyle.div}>
      <Text style={informationClientStyle.text}>Information sur le client</Text>
      <Text>Client</Text>
      <Text>0690033900</Text>
      <Text>Type de dechet:</Text>
    </View>
  );
};
export default informationClient;
