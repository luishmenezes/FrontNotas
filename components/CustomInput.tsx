import { TextInput, StyleSheet } from 'react-native';

export default function CustomInput({ placeholder, secureTextEntry = false }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#999"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1, borderColor: '#ccc',
    borderRadius: 8, padding: 12, marginVertical: 6,
  },
});
