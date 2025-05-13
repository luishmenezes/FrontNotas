import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface Props {
  tipoUsuario?: string;
}

export default function CadastroScreen({ tipoUsuario = 'Desconhecido' }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [materia, setMateria] = useState('');
  const [codigo, setCodigo] = useState('');

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (tipoUsuario === 'Professor' && (!materia || !codigo)) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios para o Professor.');
      return;
    }

    Alert.alert('Sucesso', `Cadastro de ${tipoUsuario} realizado com sucesso!`);
    
    setNome('');
    setEmail('');
    setSenha('');
    setMateria('');
    setCodigo('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <Text style={styles.userType}>Cadastrando como: {tipoUsuario}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {tipoUsuario === 'Professor' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Matéria que leciona"
            value={materia}
            onChangeText={setMateria}
          />
          <TextInput
            style={styles.input}
            placeholder="Código de identificação"
            value={codigo}
            onChangeText={setCodigo}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userType: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
