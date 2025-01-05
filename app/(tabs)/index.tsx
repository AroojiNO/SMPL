import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Index({ } ) {
  return (
    <View style={styles.container}>
    {/*Block 1*/}
    <View style = {[ styles.block, styles.topLeft ] } >
      <Text style={styles.text}>Recipe 1:</Text>
    </View >

    {/*Block 2*/} 
    <View style = {[ styles.block, styles.topRight ] } >
      <Text style={styles.text}>Recipe 2</Text> 
    </View >

    {/*Block 3*/}
    <View style = {[ styles.block, styles.bottomLeft ] } >
      <Text style={styles.text}>Recipe 3</Text>
    </View >

    {/*Block 4*/}
    <View style = {[ styles.block, styles.bottomRight ] } >
      <Text style={styles.text}>Recipe 4</Text>
    </View >
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#25292e',
      justifyContent: 'center',
      alignItems: 'center',
  },
  text: {
      color: '#fff',
      userSelect: 'none',
  },
  block: {              // Each block expands equally
    position: "absolute",
    backgroundColor: "#DDD3C2",
    padding: 10,
    borderRadius: 8,
    maxWidth: '46%',
  },
  topLeft: { 
    top: 10,
    left: 10,
  },  
  topRight: { 
    top: 10,
    left: '50%',
  },
  bottomLeft: { 
    top: '50%',
    left: 10,
  },
  bottomRight: { 
    top: '50%',
    left: '50%',
  },         
});

