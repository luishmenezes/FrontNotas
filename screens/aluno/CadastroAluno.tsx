import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function FormAluno() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const verificarToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          console.log('Usuário já está logado');
         // navigation.navigate('Home'); // Redireciona para a tela inicial se já estiver logado
        }
      } catch (err) {
        console.error('Erro ao verificar token:', err);
      }
    };

    verificarToken();
  }, []);

  const handleCadastroAluno = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('As senhas não coincidem!');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Formato de e-mail inválido!');
      return;
    }

    const aluno = {
      nome,
      email,
      senha,
      notas: [], // Lista de notas vazia conforme o DTO
      professorId: null, // Opcional
    };

    try {
      // Cadastro
      await axios.post('http://localhost:8080/alunos', aluno);

      // Login
      const loginResponse = await axios.post('http://localhost:8080/auth/login', {
        email,
        senha,
      });

      const token = loginResponse.data.token || loginResponse.data.accessToken;
      await AsyncStorage.setItem('token', token);

      Alert.alert('Cadastro e login realizados com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');

    //  navigation.navigate('Home'); // Redireciona para a tela inicial após o login
    } catch (err: any) {
      console.error('Erro:', err);

      if (err.response) {
        Alert.alert('Erro ao cadastrar', err.response.data.message || 'Tente novamente.');
      } else {
        Alert.alert('Erro de conexão com o servidor.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCircle} />

      <View style={styles.form}>
        <Text style={styles.title}>Cadastro de Aluno</Text>

        <CustomInput placeholder="Nome" value={nome} onChangeText={setNome} />
        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
        <CustomInput placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
        <CustomInput placeholder="Confirmar Senha" secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />

        <CustomButton title="Confirmar" onPress={handleCadastroAluno} color="#00cc44" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007bdb',
    paddingTop: 60,
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
    alignSelf: 'center',
    marginBottom: 10,
  },
  form: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
});
