import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Inicial</Text>
      <Button title="Ver Tarefas" onPress={() => router.push('/Tasks')} />
      <Button title="Recompensas" onPress={() => router.push('/Rewards')} />
      <Button title="Upload de Imagem" onPress={() => router.push('/Upload')} />
      <Button title="Cadastrar Usuário" onPress={() => router.push('/Register')} />
      <Button title="Enviar Feedback" onPress={() => router.push('/Feedback')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' }
});
