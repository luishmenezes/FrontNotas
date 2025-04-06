import React, { useState } from 'react';
import { View, Text, StyleSheet, CheckBox } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function CadastroScreen() {
  const route = useRoute();
  const { tipoUsuario } = route.params || { tipoUsuario: 'Desconhecido' };
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.profileCircle} />
      <Text style={styles.userType}>Cadastrando como: {tipoUsuario}</Text>

      <View style={styles.form}>
        <Text style={styles.title}>Cadastro</Text>

        <CustomInput placeholder="Nome" />
        <CustomInput placeholder="Email" />
        <CustomInput placeholder="Localização" />
        <CustomInput placeholder="Instituição" />
        <CustomInput placeholder="Senha" secureTextEntry />
        <CustomInput placeholder="Confirmar Senha" secureTextEntry />

        <View style={styles.checkboxContainer}>
          <CheckBox value={checked} onValueChange={setChecked} />
          <Text style={styles.checkboxLabel}>Aceito as políticas de privacidade</Text>
        </View>

        <CustomButton title="Confirmar" onPress={() => {}} color="#00cc44" />
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
  userType: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
});
