import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AllEventsScreen } from './src/screens';
import './global.css';

export default function App() {
  return (
    <>
      <AllEventsScreen />
      <StatusBar style="light" />
    </>
  );
}
