import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      setMensagem('Preencha todos os campos');
      return;
    }

    const usersString = await AsyncStorage.getItem('@odontoGuard_users');
    const users = usersString ? JSON.parse(usersString) : [];

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      await AsyncStorage.setItem('@odontoGuard_logged_user', JSON.stringify(user));
      router.replace('/Home');
    } else {
      setMensagem('Senha incorreta ou usuário não encontrado');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Entrar" onPress={handleLogin} />
      {mensagem !== '' && (
        <Text style={styles.erro}>{mensagem}</Text>
      )}

      {/* Botão Voltar */}
      <TouchableOpacity style={styles.voltarButton} onPress={() => router.back()}>
        <Text style={styles.voltarText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 16,
  },
  erro: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  voltarButton: {
    marginTop: 80,
    backgroundColor: '#e53935',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  voltarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
