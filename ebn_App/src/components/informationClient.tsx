import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import informationClientStyle from '../styles/informationClientStyle';
import axios from 'axios';
import {URL_API} from '@env';

const informationClient = () => {
  const [client, setClient] = useState([]);
  const [errorGet, setErrorGet] = useState(false);
  useEffect(() => {
    axios
      .get(URL_API + 'client/1')
      .then(res => {
        setClient(res.data);
        console.log(res + 'format json');
      })
      .catch(function (error) {
        setErrorGet(true);
      });
  }, []);

  return (
    <View style={informationClientStyle.div}>
      <Text style={informationClientStyle.text}>Information sur le client</Text>
      <Text>client {console.log('affichage ' + client)}</Text>
      <Text>0690033900</Text>
      <Text>Type de dechet:</Text>
      {errorGet ? (
        <Text style={informationClientStyle.error}>
          Il 'a eu une erreur lors de la récupération des informations{' '}
        </Text>
      ) : null}
    </View>
  );
};
export default informationClient;
