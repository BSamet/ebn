import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import informationClientStyle from '../styles/informationClientStyle';
import axios from "axios";

const informationClient = () => {
  const [client, setClient] = useState([]);
  const url = 'http://localhost:5454/client/';

  useEffect(() => {
      getInfoClient();
      fetch(url + 1)
          .then((response) => response.json())
          .then((json) => setClient(json)
              .cat ch}, []);

    const getInfoClient =() => {
        axios.get(url + 1)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
    }

  return (
    <View style={informationClientStyle.div}>
      <Text style={informationClientStyle.text}>Information sur le client</Text>
      <Text>{client}</Text>
      <Text>0690033900</Text>
      <Text>Type de dechet:</Text>
    </View>
  );
};
export default informationClient;
