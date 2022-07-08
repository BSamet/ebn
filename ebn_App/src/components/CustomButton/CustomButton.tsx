import {Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {ActivityIndicator} from "react-native-paper";

interface CustomButtontprops {
  text: string;
  onPress(): void;
  logIsLoading: boolean;
}

const CustomButton = ({onPress, text, logIsLoading}: CustomButtontprops) => {
  return (
    <Pressable onPress={onPress} style={[styles.container]}>
      <Text style={styles.text}>{text}</Text>
      {logIsLoading &&
          <ActivityIndicator style={styles.loaderLog} animating={true} color={"#ffffff"} size={25}/>
      }
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0096f0',
    width: '75%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#0096f0',
    borderWidth: 1,
  },
  loaderLog: {
    position: "absolute",
    right: 15,
    top: "60%"
  },
  text: {
    textAlign: "center",
    width: '90%',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CustomButton;
