import {Text, View, StyleSheet, Image} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import MovableSquare from '@/components/Pop-up';
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
export default function photo_upload( ) {

    const [squares, setSquares] = useState<Square[]>([]);
    const [nextId, setNextId] = useState(1);

    const createSquare =  () => {
        if (squares.length < 5) { // Set the max number of squares to 5
            setSquares([
            ...squares,
            {
                id: nextId,
                size: 150,
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                text: `Square ${nextId}`,
            },
            ]);
            setNextId(nextId + 1);
        } else {
            alert('Maximum number of squares reached.');
        }
        setNextId(nextId + 1);
    };

    const removeSquare = (id: number) => {
        setSquares(squares.filter((square) => square.id !== id));
    };

    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [extractedText, setExtractedText] = useState('');

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            const asset =result.assets[0];
            setSelectedImage(asset.uri);
            
            if (asset.base64) {
                const visionResult = await callVisionAPI(asset.base64);
                handleVisionResponse(visionResult);
              }
        } else {
            alert('You did not select any image.');
        }

    };

    const callVisionAPI = async (base64Image: string) => {
        // You can replace TEXT_DETECTION with other features, like LABEL_DETECTION, FACE_DETECTION, etc.
        const requestBody = {
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: 'TEXT_DETECTION',
                },
              ],
            },
          ],
        };
    
        try {
          const response = await fetch(
            `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestBody),
            }
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.log('Error calling Vision API:', error);
          return null;
        }
      };
    
      // This extracts the text portion from the Vision API response
      const handleVisionResponse = (visionResult: { responses: { fullTextAnnotation: { text: React.SetStateAction<string>; }; }[]; }) => {
        // Usually, you'll find text in visionResult.responses[0].fullTextAnnotation.text
        if (
          visionResult &&
          visionResult.responses &&
          visionResult.responses[0] &&
          visionResult.responses[0].fullTextAnnotation
        ) {
            const text = visionResult.responses[0].fullTextAnnotation.text;
            setExtractedText(text);

        } else {
          setExtractedText('No text found');
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
                <Button label="Process Recipe into Macros" onPress={createSquare} />
            </View>
            {squares.map((square) => (
                <MovableSquare
                    key={square.id}
                    size={square.size}
                    color={square.color}
                    text={square.text}
                    onRemove={() => removeSquare(square.id)}
                />
            ))}
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