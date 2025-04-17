import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SelectUserScreen from '../screens/SelectUserScreen';
import CadastroScreen from '../screens/Cadastro';
import CadastroProfessor from '../screens/professor/CadastroProfessor';
import LoginScreen from '../screens/LoginScreen';
import CadastroAluno from '../screens/aluno/CadastroAluno'


export type RootStackParamList = {
  SelectUser: undefined;
  Cadastro: { tipo: string };
  CadastroProfessor: undefined;
  LoginScreen: undefined;
  CadastroAluno: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectUser">
        <Stack.Screen name="SelectUser" component={SelectUserScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="CadastroProfessor" component={CadastroProfessor} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CadastroAluno" component={CadastroAluno} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
