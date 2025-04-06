import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, color = '#0066cc' }) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { padding: 14, borderRadius: 8, marginVertical: 10 },
  text: { color: '#fff', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
});
