import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';

export default function CriarEvento() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [notaMaxima, setNotaMaxima] = useState('');
  const [data, setData] = useState('');
  const [disciplinaId, setDisciplinaId] = useState('');
  const [arquivos, setArquivos] = useState<any[]>([]);

  const selecionarArquivo = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (resultado.assets && resultado.assets.length > 0) {
        setArquivos((prev) => [...prev, resultado.assets[0]]);
      }
    } catch (err) {
      console.log('Erro ao selecionar arquivo:', err);
    }
  };

  const visualizarArquivo = async (uri: string) => {
    try {
      await WebBrowser.openBrowserAsync(uri);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível abrir o arquivo');
    }
  };

  const removerArquivo = (index: number) => {
    const novaLista = [...arquivos];
    novaLista.splice(index, 1);
    setArquivos(novaLista);
  };

  const criarEvento = async () => {
    if (!titulo || !descricao || !notaMaxima || !data || !disciplinaId) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const evento = {
      titulo,
      descricao,
      notaMaxima,
      data,
      arquivos: arquivos.map((arq) => arq.name),
      disciplinaId,
    };

    try {
      await axios.post('https://backnotas.onrender.com/eventos', evento);
      Alert.alert('Sucesso', 'Evento criado com sucesso!');
      setTitulo('');
      setDescricao('');
      setNotaMaxima('');
      setData('');
      setDisciplinaId('');
      setArquivos([]);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      Alert.alert('Erro', 'Falha ao criar evento');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Criar Evento</Text>

        <Text style={styles.label}>Título</Text>
        <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

        <Text style={styles.label}>Descrição</Text>
        <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />

        <Text style={styles.label}>Nota Máxima</Text>
        <TextInput
          style={styles.input}
          value={notaMaxima}
          onChangeText={setNotaMaxima}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Data</Text>
        <TextInput
          style={styles.input}
          value={data}
          onChangeText={setData}
          placeholder="DD-MM-YYYY"
        />

        <Text style={styles.label}>Anexar Arquivo</Text>
        <TouchableOpacity onPress={selecionarArquivo} style={styles.anexoButton}>
          <Text style={styles.anexoButtonText}>Selecionar Arquivo</Text>
        </TouchableOpacity>

        {arquivos.length > 0 && (
          <View style={styles.listaArquivos}>
            {arquivos.map((arquivo, index) => (
              <View key={index} style={styles.arquivoItem}>
                <TouchableOpacity onPress={() => visualizarArquivo(arquivo.uri)}>
                  <Text style={styles.arquivoNome}>• {arquivo.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removerArquivo(index)}>
                  <Text style={styles.removerBotao}>❌</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={criarEvento}>
          <Text style={styles.buttonText}>Criar Evento</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#003D80',
  },
  container: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  anexoButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  anexoButtonText: {
    color: '#003D80',
    fontWeight: 'bold',
  },
  listaArquivos: {
    marginBottom: 20,
  },
  arquivoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#004a99',
    padding: 10,
    borderRadius: 6,
  },
  arquivoNome: {
    color: '#fff',
    flex: 1,
  },
  removerBotao: {
    color: '#ff5c5c',
    fontSize: 18,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#003D80',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
