import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import FooterLogout from '../app/FooterLogout';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
      setMensagem('Preencha todos os campos');
      return;
    }

    try {
      const existingUsersString = await AsyncStorage.getItem('@odontoGuard_users');
      const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

      // Verifica se o email já existe
      const emailJaExiste = existingUsers.some((user: any) => user.email === email);
      if (emailJaExiste) {
        setMensagem('Email já cadastrado');
        return;
      }

      const newUser = { username, email, password };
      const updatedUsers = [...existingUsers, newUser];
      await AsyncStorage.setItem('@odontoGuard_users', JSON.stringify(updatedUsers));

      setMensagem('Cadastro realizado com sucesso!');

      setTimeout(() => {
        router.replace('/');
      }, 2000);

    } catch (error) {
      setMensagem('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
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
      <Button title="Cadastrar" onPress={handleRegister} />
      {mensagem !== '' && (
        <Text style={mensagem.includes('sucesso') ? styles.sucesso : styles.erro}>
          {mensagem}
        </Text>
      )}
      <FooterLogout />
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
  sucesso: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  erro: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
});
