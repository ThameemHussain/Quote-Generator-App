import {Box, Pressable, useColorModeValue, Center} from 'native-base';
import {
  Dimensions,
  StatusBar,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import * as React from 'react';
import Layout from './layout';
import BookMarksView from './BookMarksView';

const FirstRoute = ({user}) => (
  <Center flex={1} my="4">
    <Layout user={user} />
  </Center>
);

const SecondRoute = ({user}) => (
  <Center flex={1} my="4">
    <BookMarksView user={user} />
  </Center>
);

const initialLayout = {
  width: Dimensions.get('window').width,
};
// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
// });

export default function MyTabView({user}) {
  const [index, setIndex] = React.useState(0);
  // const [routes] = React.useState([
  //   {
  //     key: 'first',
  //     title: 'Quote',
  //   },
  //   {
  //     key: 'second',
  //     title: 'Bookmarks',
  //   },
  // ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute user={user} />;
      case 'second':
        return <SecondRoute user={user} />;
      default:
        return null;
    }
  };

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row" style={{width: '100%', marginTop: -16}}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });
          const color =
            index === i
              ? useColorModeValue('#387fa6', '#387fa6')
              : useColorModeValue('#1f2937', '#a1a1aa');
          const borderColor =
            index === i
              ? '#387fa6'
              : useColorModeValue('coolGray.200', 'gray.400');
          return (
            <Box
              borderBottomWidth="2"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="2"
              cursor="pointer">
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}>
                <Animated.Text
                  style={{
                    color,
                    fontFamily: 'Oswald-Medium',
                    fontSize: 17,
                    marginBottom: 3,
                  }}>
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index,
        routes: [
          {
            key: 'first',
            title: 'Quote',
          },
          {
            key: 'second',
            title: 'Bookmarks',
          },
        ],
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{
        marginTop: StatusBar.currentHeight,
        width: '100%',
      }}
    />
  );
}
