import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { router } from 'expo-router';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/Login.png')} />
      <View style={styles.box}>
        <Text style={styles.title}>Login</Text>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
        <Text style={styles.forgot}>Esqueceu a senha ?</Text>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Criar Conta"
        onPress={() => router.push('/SelectUserScreen')}
      />
      <Text style={styles.altText}>Outros Logins</Text>
      <View style={styles.altLoginBox}>
        <TouchableOpacity style={styles.altLoginBtn}><Text style={styles.altLoginText}>Google</Text></TouchableOpacity>
        <TouchableOpacity style={styles.altLoginBtn}><Text style={styles.altLoginText}>Microsoft</Text></TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0070c9', alignItems: 'center' },
  image: { marginTop: 60, width: 180, height: 130, resizeMode: 'contain', borderRadius: 20 },
  box: { backgroundColor: '#005bb5', padding: 20, marginTop: 20, borderRadius: 10, width: '90%', borderWidth: 1, borderColor: 'white' },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  input: { backgroundColor: '#ccc', marginVertical: 10, borderRadius: 20, padding: 10 },
  forgot: { color: '#fff', fontSize: 12, marginBottom: 10 },
  confirmButton: { backgroundColor: '#00cc00', borderRadius: 20, padding: 10 },
  confirmText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  createButton: { marginTop: 20, backgroundColor: '#004aad', padding: 12, borderRadius: 10 },
  createText: { color: '#fff', fontWeight: 'bold' },
  altText: { color: '#fff', fontSize: 18, marginVertical: 15 },
  altLoginBox: { backgroundColor: '#fff', padding: 15, borderRadius: 10, width: '70%' },
  altLoginBtn: { backgroundColor: '#004aad', marginVertical: 5, padding: 10, borderRadius: 10 },
  altLoginText: { color: '#fff', textAlign: 'center' },
});
