import { Text, View, Button, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const PlaceholderImage = require("@/assets/images/background-image.png");

/* Function to be able to handle the Image Picker button
    if no photo is selected, then it will use the default image*/
export default function photo_upload() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setTextAnnotations] = useState<any[]>([]);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setSelectedImage(asset.uri);
      setError(null);
      setTextAnnotations([]);
    } else {
      alert('You did not select any image.');
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      alert('Please select an image first!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      const filename = selectedImage.split('/').pop() || '';
      const imageResponse = await fetch(selectedImage);
      const blob = await imageResponse.blob();

      formData.append('image', blob, filename);

      const backendURL = process.env.MONGO_URI; // Ensure this is set correctly
      const response = await axios.post(`${backendURL}/api/vision/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setTextAnnotations(response.data.recipe.ingredients);
      } else {
        setError('Failed to process the image.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload and analyze image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Pick an Image" onPress={pickImageAsync} />
      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <Button title="Upload and Analyze" onPress={uploadImage} />
        </>
      )}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {text.length > 0 && (
        <View style={styles.annotations}>
          <Text style={styles.title}>Detected Ingredients:</Text>
          {text.map((ingredient, index) => (
            <Text key={index} style={styles.text}>{ingredient}</Text>
          ))}
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  annotations: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 14,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    marginTop: 20,
    color: 'red',
  },
});