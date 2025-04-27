import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, CheckBox } from 'react-native';
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
  const [aceitoPoliticas, setAceitoPoliticas] = useState(false);  
  const navigation = useNavigation();

  useEffect(() => {
    const verificarToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          console.log('Usuário já está logado');
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

    if (!aceitoPoliticas) {
      Alert.alert('Você precisa aceitar as políticas de privacidade.');
      return;
    }

    const aluno = {
      nome,
      email,
      senha,
      notas: [], 
      professorId: null, 
    };

    try {
      await axios.post('http://localhost:8080/alunos', aluno);

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
      setAceitoPoliticas(false);  

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
      <View style={styles.form}>
        <Text style={styles.title}>Cadastro de Aluno</Text>

        <CustomInput placeholder="Nome" value={nome} onChangeText={setNome} />

        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />

        <CustomInput placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />

        <CustomInput placeholder="Confirmar Senha" secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={aceitoPoliticas}
            onValueChange={setAceitoPoliticas}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Aceito as políticas de privacidade</Text>
        </View>

      </View>

      <CustomButton
        title="Confirmar"
        onPress={handleCadastroAluno}
      />
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
    backgroundColor: '#0455BF',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#fff', 
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    color: '#fff', 
  },
});
