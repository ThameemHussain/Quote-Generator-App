import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
  },
  item: {
    fontSize: 18,
    color: '#363434',
    marginBottom: 20,
    marginStart: 10,
    marginEnd: 10,
    fontFamily: 'SourceSansPro-Regular',
    borderColor: '#6599b5',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
});

const BookMarksView = ({user}) => {
  const [quote, setQuote] = useState([]);

  useEffect(() => {
    console.log('bookmarks user uid', user.uid);
    firestore()
      .collection('DataBase')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        console.log('doc exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log('doc data: ', documentSnapshot.data());
          setQuote(documentSnapshot.data().Quote);
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={quote}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
};

export default BookMarksView;
