import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router'; 
export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/LogoNoteasy.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.loginBox}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmText}>Confirmar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.createBtn} onPress={() => router.push('/SelectUserScreen')}>
        <Text style={styles.socialText}>Criar Conta</Text>
      </TouchableOpacity>

      <Text style={styles.otherLogins}>Outros Logins</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialBtn}>
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
          <Text style={styles.socialText}>Microsoft</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Não tem conta? <Text style={styles.registerLink} onPress={() => router.push('/cadastro')}>Cadastre-se</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0072CE',
    alignItems: 'center',
    paddingVertical: 30,
  },
  image: {
    width: 200,
    height: 140,
    marginBottom: 10,
  },
  loginBox: {
    backgroundColor: '#0066CC',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#e1e1e1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  forgotPassword: {
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'right',
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: 'linear-gradient(0deg, #006EFF 0%, #001684 80%)', 
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  createBtn: {
    backgroundColor: '#0455BF',
    width: '90%',
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  socialText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  otherLogins: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  socialButtons: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    gap: 8,
  },
  socialBtn: {
    backgroundColor: '#004BFF',
    width: '90%',
    paddingVertical: 10,
    borderRadius: 20,
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
  },
  registerLink: {
    color: '#00CC33', 
    fontWeight: 'bold',
  },
});
