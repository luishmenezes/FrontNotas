import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, FlatList } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

interface Escola {
  id: string;
  nome: string;
}

export default function CadastroProfessor() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [escolaSelecionada, setEscolaSelecionada] = useState('');
  const [escolas, setEscolas] = useState<Escola[]>([]);
  const [escolasFiltradas, setEscolasFiltradas] = useState<Escola[]>([]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [carregandoEscolas, setCarregandoEscolas] = useState(false);

  useEffect(() => {
    carregarEscolas();
  }, []);

  const carregarEscolas = async () => {
    try {
      setCarregandoEscolas(true);
      const response = await axios.get('https://backnotas.onrender.com/escolas');
      setEscolas(response.data);
      setEscolasFiltradas(response.data);
    } catch (error) {
      console.error('Erro ao carregar escolas:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de escolas');
    } finally {
      setCarregandoEscolas(false);
    }
  };

  const filtrarEscolas = (texto: string) => {
    setEscolaSelecionada(texto);
    if (texto.length > 0) {
      const filtradas = escolas.filter(escola =>
        escola.nome.toLowerCase().includes(texto.toLowerCase())
      );
      setEscolasFiltradas(filtradas);
    } else {
      setEscolasFiltradas(escolas);
    }
  };

  const selecionarEscola = (escola: Escola) => {
    setEscolaSelecionada(escola.nome);
    setMostrarDropdown(false);
  };

  const toggleDropdown = () => {
    setMostrarDropdown(!mostrarDropdown);
    if (!mostrarDropdown) {
      setEscolasFiltradas(escolas);
    }
  };

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !escolaSelecionada) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      await axios.post('https://backnotas.onrender.com/professores', {
        nome,
        email,
        senha,
        escolaNome: escolaSelecionada,
      });

      Alert.alert('Sucesso', 'Professor cadastrado com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
      setEscolaSelecionada('');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível cadastrar o professor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Professor</Text>
      
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      
      <View style={styles.escolaContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite o nome da escola ou selecione"
            style={styles.inputCombinado}
            value={escolaSelecionada}
            onChangeText={filtrarEscolas}
            onFocus={() => setMostrarDropdown(true)}
          />
          <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
            <MaterialIcons 
              name={mostrarDropdown ? 'arrow-drop-up' : 'arrow-drop-down'} 
              size={24} 
              color="#555" 
            />
          </TouchableOpacity>
        </View>

        {carregandoEscolas && (
          <ActivityIndicator size="small" style={styles.carregando} />
        )}

        {mostrarDropdown && (
          <View style={styles.dropdown}>
            <FlatList
              data={escolasFiltradas}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemDropdown}
                  onPress={() => selecionarEscola(item)}
                >
                  <Text>{item.nome}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="always"
              style={styles.listaDropdown}
            />
          </View>
        )}
      </View>
      
      <TouchableOpacity
        onPress={handleCadastro}
        style={[styles.button, loading && styles.buttonLoading]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  escolaContainer: {
    marginBottom: 20,
    zIndex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    overflow: 'hidden',
  },
  inputCombinado: {
    flex: 1,
    padding: 10,
  },
  dropdownButton: {
    padding: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#aaa',
  },
  dropdown: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  listaDropdown: {
    paddingHorizontal: 10,
  },
  itemDropdown: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  carregando: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonLoading: {
    backgroundColor: '#0056b3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});