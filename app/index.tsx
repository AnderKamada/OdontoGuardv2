import React, { useCallback, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const checkLogin = async () => {
        try {
          const user = await AsyncStorage.getItem('@odontoGuard_user');
          if (user && isActive) {
            router.replace('/Home');
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.error('Erro ao verificar login:', error);
        }

        return () => {
          isActive = false;
        };
      };

      checkLogin();
    }, [router])
  );

  const handleLogin = async () => {
    await AsyncStorage.setItem('@odontoGuard_user', 'true');
    router.replace('/Home');
  };

  const handleRegister = () => {
    router.push('/Register');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

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
