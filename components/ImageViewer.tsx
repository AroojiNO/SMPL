import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

type Props ={
    imgSource: string;
    selectedImage?: string;
};

/* This is the class that deals with the image showing in the photo_upload page*/
export default function ImageViewer({ imgSource, selectedImage }: Props) {
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

    return <Image source={imageSource} style ={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});