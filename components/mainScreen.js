import MyTabView from './TabView';
import Banner from './bannerLove';
import {View, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function MainScreen({setUser, user}) {
  const signOut = async () => {
    auth().signOut();
    console.log('user', user);
    setUser(null);
    console.log('user', user);

    return () => userReference();
  };
  return (
    <View
      backgroundColor="rgba(77, 189, 243, 0.17)"
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <MyTabView user={user} />
      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
        style={{
          alignItems: 'center',
          borderRadius: 7,
          borderColor: '#387fa6',
          borderWidth: 1,
          marginBottom: 6,
        }}>
        <Text
          style={{
            fontSize: 10,
            fontFamily: 'Cinzel-SemiBold',
            margin: 4,
            padding: 2,
          }}>
          Sign Out
        </Text>
      </TouchableOpacity>
      <Banner />
    </View>
  );
}
