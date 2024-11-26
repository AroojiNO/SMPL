import {View, StyleSheet} from 'react-native';
import { Link, Stack } from 'expo-router';

/*This is the redirect page in case the wrong address is put in on web */
export default function NotFoundScreen() {
    return(
        <>
         <Stack.Screen options={{ title:'Page Not Found'}} />
         <View style ={styles.container}>
          <Link href="/" style={styles.button}>
            Back to Home!
          </Link>
         </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      justifyContent: 'center',
      alignItems: 'center',
    },

    button: {
      fontSize: 48,
      textDecorationLine: 'underline',
      color: '#fff',
    },
}); 