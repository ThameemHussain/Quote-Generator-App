import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Input} from 'native-base';

const styles = StyleSheet.create({
  container: {},
});

const LoginScreen = ({navigation, setOnChangeNumber}) => {
  return (
    <View>
      <Input
        onChangeText={e => {
          setOnChangeNumber(e);
        }}></Input>
      <Button
        title="Send Code"
        onPress={() => {
          navigation.navigate('Authentication');
        }}></Button>
    </View>
  );
};

export {LoginScreen};
