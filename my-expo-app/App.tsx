import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import './global.css';

export default function App() {
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#374151' }}>
          Eco-Tourism App
        </Text>
        <Text style={{ fontSize: 16, color: '#6b7280', marginTop: 8 }}>
          UI Components Ready for Integration
        </Text>
      </View>
      <StatusBar style="auto" />
    </>
  );
}
