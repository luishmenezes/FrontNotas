import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectUserScreen from '../screens/SelectUserScreen';
import CadastroScreen from '../screens/Cadastro';

export type RootStackParamList = {
  SelectUser: undefined;
  Cadastro: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SelectUser">
      <Stack.Screen name="SelectUser" component={SelectUserScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
    </Stack.Navigator>
  );
}
