import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const storedUser = await AsyncStorage.getItem('@odontoGuard_user');
    if (storedUser) {
      router.replace('/Home');
    }
  };

  const handleLogin = async () => {
    if (username.trim() === '') {
      Alert.alert('Erro', 'Por favor, digite seu nome.');
      return;
    }
    await AsyncStorage.setItem('@odontoGuard_user', username);
    router.replace('/Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <TextInput
        placeholder="Digite seu nome"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});
