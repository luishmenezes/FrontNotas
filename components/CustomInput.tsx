import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

type CustomInputProps = TextInputProps & {
  placeholder: string;
};

export default function CustomInput({ 
  placeholder, 
  secureTextEntry = false, 
  value, 
  onChangeText, 
  ...rest 
}: CustomInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
});
