
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // ajuste se necessário

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  // Navegação automática após 2 segundos
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 2000);

    return () => clearTimeout(timeout); // limpa timeout se o usuário sair da tela
  }, []);

  const handlePress = () => {
    navigation.replace('LoginScreen');
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo à Home!</Text>
        <Text style={styles.subtitle}>Toque para continuar ou aguarde...</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginTop: 12, color: '#666' },
});
