import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppFlow from './src/navigation/AppFlow';
import './global.css';

export default function App() {
  return (
    <>
      <AppFlow />
      <StatusBar style="light" />
    </>
  );
}
