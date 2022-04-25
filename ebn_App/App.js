import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {} from 'react-native/Libraries/NewAppScreen';
import Signinscreen from './src/screens/SignInScreen/SignInScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Signinscreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#8AC997'},
});

export default App;
