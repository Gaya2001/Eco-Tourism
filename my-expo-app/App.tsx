import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppFlow from './src/navigation/AppFlow';
import './global.css';
import DemoNavigator from '~/navigation/DemoNavigator';

export default function App() {
  return (
    <>
      <AppFlow />
      {/* <DemoNavigator /> */}
      <StatusBar style="light" />
    </>
  );
}
