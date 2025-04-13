import React from 'react';
import AppNavigator from './navigation/AppNavigator'; // Caminho correto até seu Navigator

export default function App() {
  return <AppNavigator />; // NavigationContainer está DENTRO do AppNavigator
}
