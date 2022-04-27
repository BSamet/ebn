import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {} from 'react-native/Libraries/NewAppScreen';
import RouteNavigator from './src/Navigation/RouteNavigator';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <RouteNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#8AC997'},
});

export default App;
