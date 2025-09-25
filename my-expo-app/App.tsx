import React from 'react';
import { StatusBar } from 'expo-status-bar';
import DemoNavigator from './src/navigation/DemoNavigator';
import './global.css';

export default function App() {
  return (
    <>
      <DemoNavigator />
      <StatusBar style="auto" />
    </>
  );
}
