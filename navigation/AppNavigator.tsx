import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SelectUserScreen from '../screens/SelectUserScreen';
import CadastroScreen from '../screens/Cadastro';
import CadastroProfessor from '../screens/professor/CadastroProfessor';
import LoginScreen from '../screens/LoginScreen';

export type RootStackParamList = {
  SelectUser: undefined;
  Cadastro: { tipo: string };
  CadastroProfessor: undefined;
  LoginScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectUser">
        <Stack.Screen name="SelectUser" component={SelectUserScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="CadastroProfessor" component={CadastroProfessor} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
