import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

export default function Input({ label, textInputConfig, style, invalid }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    color: '#374151', 
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F3F4F6', 
    paddingVertical: 10,
    paddingHorizontal: 14,
    margin:2,
    borderRadius: 10,
    fontSize: 16,

    color: '#111827', 
    borderWidth: 1,
    borderColor: '#E5E7EB', 
  },
  inputMultiline: {
    minHeight: 100,

    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: '#DC2626',
  },
  invalidInput: {
    borderColor: '#DC2626',
    backgroundColor: '#FEE2E2', 
  },
});
