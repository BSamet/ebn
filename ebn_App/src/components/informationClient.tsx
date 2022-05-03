import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import informationClientStyle from '../styles/informationClientStyle';
import axios from 'axios';
import {URL_API} from '@env';

const InformationClient = () => {
  const [client, setClient] = useState([]);
  const state = URL_API;

  useEffect(() => {
    axios
      .get(URL_API + 'client/1')
      .then(res => {
        console.log(res.data);
        setClient(res.data);
        console.log(client);
      })
      .catch(function (error) {
        console.log(error + ' sur get');
      });
    console.log(state);
  }, []);

  return (
    <View style={informationClientStyle.div}>
      <Text style={informationClientStyle.text}>Information sur le client</Text>
      <Text>client</Text>
      <Text>0690033900</Text>
      <Text>Type de dechet:</Text>
    </View>
  );
};
export default InformationClient;
