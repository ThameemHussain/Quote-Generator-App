import {Text, StyleSheet} from 'react-native';

//styles
const styles = StyleSheet.create({
  Text: {},
});
export default function Banner() {
  return (
    <Text style={{marginBottom: 8, fontFamily: 'Cinzel-Regular', fontSize: 12}}>
      Made with ❤ by Thameem
    </Text>
  );
}
