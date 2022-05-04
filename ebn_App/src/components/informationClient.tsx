import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import informationClientStyle from '../styles/informationClientStyle';
import axios from 'axios';
import {HOST_BACK} from '../../environment/environment';

interface infoClientInterface {
  nomCommercial: string;
  adresse: string;
  utilisateur: {
    telephone: string;
  };
  typeDechet: [
    {
      typeDechets: string;
    },
  ];
}

const informationClient = () => {
  const [client, setClient] = useState<infoClientInterface>();
  const [errorGet, setErrorGet] = useState(false);

  useEffect(() => {
    axios
      .get(HOST_BACK + '/client/1')
      .then(res => {
        setClient(res.data);
      })
      .catch(function (error) {
        setErrorGet(true);
      });
  }, [client]);

  return (
    <View style={informationClientStyle.div}>
      <Text style={informationClientStyle.text}>Information sur le client</Text>
      <Text> {client?.nomCommercial}</Text>
      <Text> {client?.adresse}</Text>
      <Text> {client?.utilisateur?.telephone}</Text>
      {/*TODO mettre des icones a coté du test*/}
      <Text>
        {' '}
        Type de dechet:{' '}
        {client?.typeDechet.map(dechets => (
          <Text>{dechets.typeDechets}</Text>
        ))}{' '}
      </Text>
      {errorGet ? (
        <Text style={informationClientStyle.error}>
          Il 'a eu une erreur lors de la récupération des informations{' '}
        </Text>
      ) : null}
    </View>
  );
};
export default informationClient;
