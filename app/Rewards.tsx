import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FooterLogout from '../app/FooterLogout';

export default function RewardsScreen() {
  const rewards = [
    {
      icon: '🪥',
      title: 'Primeira Limpeza',
      description: 'Você concluiu sua primeira tarefa!',
    },
    {
      icon: '📤',
      title: 'Protetor dos Dentes',
      description: 'Você enviou uma imagem da sua rotina!',
    },
    {
      icon: '💬',
      title: 'Paciente Consciente',
      description: 'Você enviou seu primeiro feedback!',
    },
    {
      icon: '🧼',
      title: 'Comprometido com a Saúde',
      description: 'Você completou 5 tarefas no app!',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎁 Suas Recompensas</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        {rewards.map((reward, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.emoji}>{reward.icon}</Text>
            <Text style={styles.cardTitle}>{reward.title}</Text>
            <Text style={styles.cardDesc}>{reward.description}</Text>
          </View>
        ))}
      </ScrollView>

      <FooterLogout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scroll: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  emoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});
