import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  const handleLogin = async () => {
    await AsyncStorage.setItem('@odontoGuard_user', 'true');
    router.push('/Home');
  };

  const handleRegister = () => {
    router.push('/Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao OdontoGuard</Text>
      <View style={styles.button}>
        <Button title="Entrar" onPress={handleLogin} />
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
    marginBottom: 40,
  },
  button: {
    width: '70%',
    marginVertical: 10,
  },
});
