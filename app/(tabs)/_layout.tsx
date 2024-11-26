import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Tablayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
    headerStyle: {
      backgroundColor: '#25292e',
    },
    headerShadowVisible: false,
    headerTintColor: '#fff',
    tabBarStyle: {
    backgroundColor: '#25292e',
    },
      }}
    >
      <Tabs.Screen
       name="index"
       options={{
        title: 'Home',
        tabBarIcon: ({ color, focused}) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        ),
       }}
       />
       <Tabs.Screen
        name="photo_upload"
        options={{
          title: 'Photo Upload',
          tabBarIcon: ({ color, focused}) => (
            <MaterialCommunityIcons name={focused ? 'file-upload' : 'file-upload-outline'} color={color} size={24} />
          ),
        }}
        />
    </Tabs>
  );
}

