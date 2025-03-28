import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, FlatList, Alert, StyleSheet, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterLogout from '../app/FooterLogout';

interface FeedbackItem {
  id: string;
  text: string;
  date: string;
}

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState('');
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    const stored = await AsyncStorage.getItem('feedbacks');
    setFeedbacks(stored ? JSON.parse(stored) : []);
  };

  const saveFeedbacks = async (items: FeedbackItem[]) => {
    await AsyncStorage.setItem('feedbacks', JSON.stringify(items));
    setFeedbacks(items);
  };

  const handleSend = async () => {
    if (!feedback.trim()) return;

    if (editMode && editId) {
      const updated = feedbacks.map(item =>
        item.id === editId ? { ...item, text: feedback } : item
      );
      await saveFeedbacks(updated);
      setEditMode(false);
      setEditId(null);
      Alert.alert('Feedback atualizado!');
    } else {
      const newItem = {
        id: Date.now().toString(),
        text: feedback,
        date: new Date().toISOString().split('T')[0],
      };
      await saveFeedbacks([...feedbacks, newItem]);
      Alert.alert('Feedback enviado!');
    }

    setFeedback('');
  };

  const handleDelete = async (id: string) => {
    const updated = feedbacks.filter(item => item.id !== id);
    await saveFeedbacks(updated);
  };

  const handleEdit = (item: FeedbackItem) => {
    setFeedback(item.text);
    setEditId(item.id);
    setEditMode(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>

      <TextInput
        style={styles.input}
        placeholder="Deixe seu feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <View style={styles.buttonRow}>
        <Button title={editMode ? 'Salvar' : 'Enviar'} onPress={handleSend} />
        {editMode && (
          <Button title="Cancelar" onPress={() => {
            setEditMode(false);
            setEditId(null);
            setFeedback('');
          }} color="#999" />
        )}
      </View>

      <FlatList
        data={feedbacks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.feedbackItem}>
            <Text>{item.text}</Text>
            <Text style={styles.date}>Data: {item.date}</Text>
            <View style={styles.buttonRow}>
              <Button title="Editar" onPress={() => handleEdit(item)} />
              <Button title="Excluir" onPress={() => handleDelete(item.id)} color="#F44336" />
            </View>
          </View>
        )}
      />

      <FooterLogout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  feedbackItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
});
