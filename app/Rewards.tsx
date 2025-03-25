import { View, Text, FlatList, StyleSheet } from 'react-native';

const rewards = [
  { id: '1', title: 'Recompensa 1', description: 'Ganhe 10% de desconto no dentista' },
  { id: '2', title: 'Recompensa 2', description: 'Uma limpeza gratuita após 5 tarefas' },
  { id: '3', title: 'Recompensa 3', description: 'Consultoria online com especialista' },
];

export default function RewardsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recompensas</Text>
      <FlatList
        data={rewards}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.reward}>
            <Text style={styles.rewardTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' },
  reward: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  rewardTitle: { fontSize: 18, fontWeight: '600' },
});
