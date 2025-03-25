import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState('');

  const handleSendFeedback = async () => {
    if (!feedback.trim()) {
      Alert.alert('Erro', 'Digite seu feedback antes de enviar.');
      return;
    }

    try {
      const existing = await AsyncStorage.getItem('feedbacks');
      const feedbacks = existing ? JSON.parse(existing) : [];
      feedbacks.push({ text: feedback, date: new Date().toISOString() });

      await AsyncStorage.setItem('feedbacks', JSON.stringify(feedbacks));
      Alert.alert('Obrigado!', 'Seu feedback foi enviado com sucesso.');
      setFeedback('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o feedback.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enviar Feedback</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Escreva aqui sua sugestão ou comentário..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={5}
      />
      <Button title="Enviar" onPress={handleSendFeedback} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  textArea: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
    padding: 10, marginBottom: 20, height: 120, textAlignVertical: 'top'
  }
});
