import {React, useState, useEffect} from 'react';
import {
  Button,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {
  Container,
  Center,
  Box,
  AspectRatio,
  Stack,
  Heading,
  Text,
  HStack,
  Image,
  extendTheme,
  IconButton,
} from 'native-base';
import Tts from 'react-native-tts';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';

// import {StyleSheet} from 'react-native/Libraries/StyleSheet/StyleSheet';

Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
Tts.setDefaultRate(0.4);
Tts.setDefaultPitch(1.2).catch(err => console.log('tts catch', err));
function Layout({user}) {
  const [Quote, setQuote] = useState('Loading...');
  const [Author, setAuthor] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [counter, setCounter] = useState(0);
  const [image, setImage] = useState(
    'https://source.unsplash.com/collection/928423/480x480',
  );

  // SpeakerStyle
  const styles = StyleSheet.create({
    Speaking: {
      borderWidth: 0.6,
      backgroundColor: '#71c7f5',
      borderRadius: 50,
      padding: 15,
      borderColor: '#387fa6',
    },
    notSpeaking: {
      borderWidth: 1,
      borderColor: '#2db2fc',
      borderRadius: 50,
      padding: 15,
    },
    boxbc: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bc: {
      backgroundColor: 'rgba(244, 135, 191, 0.43)',
      margin: 8,
      borderWidth: 1,
      borderColor: '#2db2fc',
      borderRadius: 50,
    },
  });
  const randomQuote = () => {
    setIsBookmarked(false);
    setCounter(counter + 1);
    setImage(
      `https://source.unsplash.com/collection/928423/480x${480 + counter}`,
    );
    setIsLoading(true);
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(result => {
        // console.log(result.content);
        setQuote(result.content);
        setAuthor(result.author);
        setIsLoading(false);
        console.log(counter);
      });

    console.log(counter);
  };
  useEffect(() => {
    randomQuote();
  }, []);

  const speakNow = () => {
    Snackbar.show({
      text: 'Playing...',
      duration: Snackbar.LENGTH_SHORT,
    });
    Tts.stop();
    Tts.speak(Quote + ' by ' + Author);
    Tts.addEventListener('tts-start', event => setIsSpeaking(true));
    Tts.addEventListener('tts-finish', event => setIsSpeaking(false));
  };

  const copyToClipboard = () => {
    Clipboard.setString(Quote);
    Snackbar.show({
      text: 'Quote copied!',
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  const tweetNow = () => {
    const url = 'https://twitter.com/intent/tweet?text=' + Quote;
    Linking.openURL(url).catch(err => console.log('An error!! ', err));
  };
  const bookmark = () => {
    setIsBookmarked(true);
    firestore()
      .collection('DataBase')
      .doc(user.uid)
      .set(
        {
          Quote: firestore.FieldValue.arrayUnion({
            key: '"' + Quote + '"' + '\n' + '        - ' + Author,
          }),
        },
        {merge: true},
      )
      .then(() => {
        console.log('Updated!');
        Snackbar.show({
          text: 'Bookmark Added!',
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  return (
    // <Box
    //   alignItems="center"
    //   bg={{
    //     linearGradient: {
    //       colors: ['lightBlue.300', 'violet.800'],
    //       start: [0, 0],
    //       end: [1, 0],
    //     },
    //   }}>
    <Box
      maxW="80"
      overflow="hidden"
      shadow={9}
      borderRadius={22}
      bg={{
        linearGradient: {
          colors: ['#93C6E7', '#FEDEFF'],
          start: [0, 0],
          end: [1, 0],
        },
      }}
      // _dark={{
      //   borderColor: 'coolGray.600',
      //   backgroundColor: 'gray.700',
      // }}
      // _web={{
      //   shadow: 2,
      //   borderWidth: 0,
      // }}
      // _light={{
      //   backgroundColor: 'gray.50',
      // }}
    >
      <Box style={styles.boxbc}>
        <AspectRatio w="100%">
          <Image
            style={{height: '100%', width: '100%'}}
            source={{
              // uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
              uri: image,
            }}
            alt="image"
            blurRadius={3}
          />
        </AspectRatio>
        <View position="absolute" style={{left: '90%', top: '5%'}}>
          <TouchableOpacity
            onPress={() => {
              bookmark();
            }}>
            {isBookmarked ? (
              <FontAwesome name="bookmark" size={22} color="#a148a3" />
            ) : (
              <FontAwesome name="bookmark-o" size={22} color="#a148a3" />
            )}
          </TouchableOpacity>
        </View>
        <Center
          _text={{
            color: '#0e2936',
            fontSize: 'md',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 10,
            padding: 5,
            fontFamily: 'Lobster-Regular',
          }}
          position="absolute"
          style={styles.bc}
          px="3"
          py="1.5">
          {isLoading
            ? 'Loading...'
            : '"' + Quote + '"' + '\n' + '        - ' + Author}
        </Center>
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          {/* <Button title="New Quote" color="#CBEDD5" fore/> */}
          <TouchableOpacity
            onPress={() => {
              randomQuote();
            }}
            style={{
              backgroundColor: '#65c6fc',
              alignItems: 'center',
              margin: '2%',
              borderRadius: 7,
            }}>
            <Text style={{padding: '3%', color: '#a148a3', fontSize: 14}}>
              {isLoading ? 'Loading...' : 'New Quote'}
            </Text>
          </TouchableOpacity>
          {/* <Text
              fontSize="xs"
              _light={{
                color: 'violet.500',
              }}
              _dark={{
                color: 'violet.400',
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              The Silicon Valley of India.
            </Text> */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                speakNow();
              }}
              style={isSpeaking ? styles.Speaking : styles.notSpeaking}>
              <FontAwesome name="volume-up" size={22} color="#a148a3" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                copyToClipboard();
              }}
              style={{
                borderWidth: 1,
                borderColor: '#2db2fc',
                borderRadius: 50,
                padding: 15,
              }}>
              <FontAwesome name="copy" size={22} color="#a148a3" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                tweetNow();
              }}
              style={{
                borderWidth: 1,
                borderColor: '#2db2fc',
                borderRadius: 50,
                padding: 15,
              }}>
              <FontAwesome name="twitter" size={22} color="#a148a3" />
            </TouchableOpacity>
          </View>
        </Stack>

        {/* <Text fontWeight="400">
          Bengaluru (also called Bangalore) is the center of India's high-tech
          industry. The city is also known for its parks and nightlife.
        </Text>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="400">
              6 mins ago
            </Text>
          </HStack>
        </HStack> */}
      </Stack>
    </Box>
  );
}

export default Layout;
