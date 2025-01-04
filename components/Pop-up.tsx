import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, Pressable } from 'react-native';

// Props for customization
interface MovableSquareProps {
  size?: number; // Size of the square
  color?: string; // Background color
  text?: string; // Text to display inside the square
  onRemove?: () => void; // Callback to remove the square
}

const MovableSquare: React.FC<MovableSquareProps> = ({
  size = 150,
  color = '#FFFFFF',
  text = 'Drag Me!',
  onRemove,
}) => {
  const pan = useRef(new Animated.ValueXY()).current; // Position for the square

  // PanResponder to handle drag gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }]
      ),
      onPanResponderRelease: () => {
        pan.extractOffset(); // Maintain the position when dragging stops
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers} // Attach gesture handlers
      style={[
        styles.square,
        {
          width: size,
          height: size,
          backgroundColor: color,
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        },
      ]}
    >
      {/* Pressable overlay for removing the square */}
      <Pressable
        style={styles.removeArea}
        onPress={(e) => {
          e.stopPropagation(); // Prevent the press event from propagating
          if (onRemove) {
        onRemove();
          }
        }} // Call the remove callback when pressed
      >
        <Text style={styles.removeText}>X</Text>
      </Pressable>

      {/* Content of the square */}
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
    ...StyleSheet.absoluteFillObject, // Fill the parent
  },
  removeArea: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    backgroundColor: 'red',
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure it's on top
  },
  removeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MovableSquare;
