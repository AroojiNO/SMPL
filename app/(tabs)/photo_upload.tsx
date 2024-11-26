import {Text, View, StyleSheet, Image} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';

import * as ImagePicker from 'expo-image-picker';

const GOOGLE_VISION_API_KEY = 'AIzaSyAkgJ_wEoRSkBLdEPY4Yq0eLFId3Mn20i8'; //not actually used yet

const PlaceholderImage = require("@/assets/images/background-image.png");

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
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }

    };
    
    return (

        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
            </View>
            <Text style={styles.text}> Please Upload JPG, PNG, or JPEG Files here </Text>
            <View style={styles.footerContainer}>
                <Button theme="primary" label="Upload a Photo Here" onPress={pickImageAsync} />
                <Button label="Process Recipe into Macros" />
            </View>
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
    imageContainer: {
        flex: 1,
        paddingTop: 28,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
});