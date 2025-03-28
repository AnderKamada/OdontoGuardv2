import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import FooterLogout from '../app/FooterLogout';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Principal</Text>

      <View style={styles.menu}>
        <View style={styles.buttonWrapper}>
          <Button title="Tarefas" onPress={() => router.push('/Tasks')} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Recompensas" onPress={() => router.push('/Rewards')} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Feedback" onPress={() => router.push('/Feedback')} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Upload de Imagem" onPress={() => router.push('/Upload')} />
        </View>
      </View>

      <FooterLogout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  menu: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    marginTop: 170,
  },
  buttonWrapper: {
    width: '70%',
  },
});
