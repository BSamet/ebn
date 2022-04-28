import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import informationClientStyle from '../styles/informationClientStyle';
import axios from 'axios';

const informationClient = () => {
  const [client, setClient] = useState([]);
  const state = {
    infoClient: {},
  };

  useEffect(() => {
    axios
      .get('http://10.3.0.138:5454/client/1')
      .then(res => {
        console.log(res.data);
        setClient(res.data);
        console.log(client);
        setState({infoClient: res.data});
      })
      .catch(function (error) {
        console.log(error + ' sur get');
      });
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
export default informationClient;
