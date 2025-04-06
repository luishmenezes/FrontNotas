import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
const SelectUserScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleUserSelect = () => {
    navigation.navigate('Cadastro'); // <- Aqui usamos o nome exato da rota
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar como:</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.card} onPress={() => handleUserSelect('aluno')}>
          <Image source={require('../assets/Aluno.png')} style={styles.img} />
          <Text style={styles.cardText}>Aluno</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => handleUserSelect('professor')}>
          <Image source={require('../assets/Professor.png')} style={styles.img} />
          <Text style={styles.cardText}>Professor</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.card} onPress={() => handleUserSelect('pais')}>
        <Image source={require('../assets/Pais.png')} style={styles.img} />
        <Text style={styles.cardText}>Pais</Text>
      </TouchableOpacity>

      <Text style={styles.altText}>Formas de Criar</Text>
      <View style={styles.altLoginBox}>
        <TouchableOpacity style={styles.altLoginBtn}><Text style={styles.altLoginText}>Google</Text></TouchableOpacity>
        <TouchableOpacity style={styles.altLoginBtn}><Text style={styles.altLoginText}>Microsoft</Text></TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectUserScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0070c9', alignItems: 'center', paddingTop: 60 },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  card: { alignItems: 'center', margin: 10, padding: 10, backgroundColor: '#005bb5', borderRadius: 10, borderWidth: 1, borderColor: '#fff' },
  img: { width: 90, height: 90, resizeMode: 'contain', borderRadius: 10 },
  cardText: { color: '#fff', fontWeight: 'bold', marginTop: 5 },
  altText: { color: '#fff', fontSize: 18, marginTop: 30 },
  altLoginBox: { backgroundColor: '#fff', padding: 15, borderRadius: 10, width: '70%', marginTop: 10 },
  altLoginBtn: { backgroundColor: '#004aad', marginVertical: 5, padding: 10, borderRadius: 10 },
  altLoginText: { color: '#fff', textAlign: 'center' },
});
