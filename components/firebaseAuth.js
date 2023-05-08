import React, {useState, useEffect} from 'react';
import * as Progress from 'react-native-progress';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MainScreen from './mainScreen';

const FirebaseAuth = ({navigation, setUser, user}) => {
  const [mobile, setMobile] = useState(null);

  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  const [progress, setProgress] = useState(false);

  const [codeConfirmed, setCodeConfirmed] = useState(false);

  const onAuthStateChanged = async userAuth => {
    if (!userAuth) {
      return;
    }
    if (userAuth) {
      console.log(userAuth);
      await setUser(userAuth);
      console.log('hey hey here', user);
    }

    return () => userReference();
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      subscriber;
    };
  }, []);

  // const signInWithMobileNumber = async () => {
  //   const confirmation = await auth().signInWithPhoneNumber(mobile);
  //   setConfirm(confirmation);
  //   console.log('confirm: ', confirm);
  // };
  const signInWithMobileNumber = async () => {
    setProgress(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(mobile);
      console.log('confirmation: ', confirmation);

      setConfirm(confirmation);
      console.log('confirm: ', confirm);
      setProgress(false);
    } catch (error) {
      console.log('Error signing in with mobile number:', error);
    }
  };
  useEffect(() => {
    console.log('confirmveliya: ', confirm);
  }, [confirm]);

  const confirmCode = async () => {
    setProgress(true);
    console.log('code inside confirmCode:', code);
    try {
      await confirm.confirm(code);
      setCodeConfirmed(true);
      setProgress(false);
    } catch (error) {
      console.log('Invalid code.', error);
    }
  };
  useEffect(() => {
    if (codeConfirmed) {
      console.log('user.uid', user.uid);
      // firestore()
      //   .collection('DataBase')
      //   .doc(user.uid)
      //   .set({}, {merge: true})
      //   .then(() => {
      //     console.log('Collection created successfully!');
      //   })
      //   .catch(error => {
      //     console.log('Error creating collection:', error);
      //   });
    }
  }, []);
  console.log('code', code);
  return (
    <SafeAreaView
      style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      <View>
        {user === null && (
          <View>
            <Text
              style={{
                fontFamily: 'SourceSansPro-Black',
                fontSize: 40,
                alignSelf: 'center',
                color: '#387fa6',
              }}>
              Welcome!
            </Text>
            <Text
              style={{
                fontFamily: 'SourceSansPro-Light',
                fontSize: 20,
                alignSelf: 'center',
                color: '#387fa6',
                marginBottom: 15,
              }}>
              SignIn with Phone number
            </Text>
            {progress && (
              <Progress.Bar
                progress={0.3}
                width={200}
                indeterminate={true}
                color={'#a148a3'}
                height={4}
                style={{alignSelf: 'center'}}
              />
            )}
            <TextInput
              value={mobile}
              onChangeText={e => setMobile(e)}
              placeholder="Phone"
              style={{
                borderWidth: 1,
                margin: 10,
                padding: 10,
                width: 200,
                borderColor: '#a148a3',
                fontFamily: 'SourceSansPro-Regular',
                fontSize: 15,
              }}></TextInput>
            {!confirm ? (
              <>
                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                    borderWidth: 1,
                    margin: 10,
                    padding: 10,
                    alignItems: 'center',
                    borderColor: '#a148a3',
                  }}
                  onPress={() => signInWithMobileNumber()}>
                  <Text
                    style={{
                      fontFamily: 'SourceSansPro-Regular',
                      fontSize: 15,
                      color: '#387fa6',
                    }}>
                    Get Code
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  value={code}
                  onChangeText={e => setCode(e)}
                  placeholder="Code"
                  style={{
                    borderWidth: 1,
                    margin: 10,
                    padding: 10,
                    width: 200,
                    borderColor: '#a148a3',
                  }}></TextInput>
                <TouchableOpacity
                  style={{
                    borderRadius: 8,
                    borderWidth: 1,
                    margin: 10,
                    padding: 10,
                    alignItems: 'center',
                    borderColor: '#a148a3',
                  }}
                  onPress={() => confirmCode()}>
                  <Text
                    style={{
                      fontFamily: 'SourceSansPro-Regular',
                      fontSize: 15,
                      color: '#387fa6',
                    }}>
                    Confirm Code
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>
      {user !== null && <MainScreen setUser={setUser} user={user} />}
    </SafeAreaView>
  );
};

export default FirebaseAuth;
