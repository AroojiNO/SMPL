import React, {useState} from 'react';
import {View, Button, Image, Text} from 'react-native';

import * as FileSystem from 'expo-file-system';
import axios from 'axios';

/*Not used yet, just a place holder to be able to deal with the vision calls in the future */
const GOOGLE_VISION_API_KEY = '';

const [image, setImage] = useState(null);
const [labels, setLabels] = useState([]);

const analyzeImage = async (base64: any) => {
    try {
        const response = await axios.post(
            'https://vision.googleapis.com/v1/images:annotate?key+$P{GOOGLE_VISION_API_KEY}',
            {
                requests: [
                    {
                        image: {
                            content: base64,
                        },
                        feautures: [
                            { type: 'LABEL_DETECTION', maxResults: 5 },
                        ],
                    },
                ],
            }
        );

        const labelAnnotations = response.data.responses[0].labelAnnotations;
        setLabels(labelAnnotations.map((label: { description: any; }) => label.description));
    } catch (error) {
        console.error("Error analyzing image:", error);
    }
};
