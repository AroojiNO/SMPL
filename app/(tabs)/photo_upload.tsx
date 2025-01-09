import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import React, { useState } from 'react';

import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';

import * as ImagePicker from 'expo-image-picker';

const PlaceholderImage = require("@/assets/images/background-image.png");
const GOOGLE_VISION_API_KEY = process.env.Vision_API_Key

interface Square {
  id: number; // Unique identifier
  size: number;
  color: string;
  text: string;
}

/* Function to be able to handle the Image Picker button
    if no photo is selected, then it will use the default image*/
export default function photo_upload() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setSelectedImage(asset.uri);

    } else {
      alert('You did not select any image.');
    }

  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    userSelect: 'none',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
    userSelect: 'none',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    userSelect: 'none',
  },
});