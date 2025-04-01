import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/Login'); // agora redireciona corretamente para a tela de login
  };

  const handleRegister = () => {
    router.push('/Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao OdontoGuard</Text>
      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.button}>
        <Button title="Cadastrar" onPress={handleRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    marginBottom: 10,
  },
});
