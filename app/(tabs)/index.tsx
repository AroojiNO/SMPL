import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the SMPL app</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#25292e',
      justifyContent: 'center',
      alignItems: 'center',
  },
  text: {
      color: '#fff',
  },
  button: {
    fontSize: 48,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});

