import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, FlatList, Alert, StyleSheet, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterLogout from '../app/FooterLogout';

interface FeedbackItem {
  id: string;
  note: string;
  comment: string;
  date: string;
}

export default function FeedbackScreen() {
  const [note, setNote] = useState('');
  const [comment, setComment] = useState('');
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

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
    if (!note.trim() || !comment.trim()) {
      const msg = 'Preencha os campos para enviar um feedback!';
      if (Platform.OS === 'web') {
        setMessage(msg);
      } else {
        Alert.alert(msg);
      }
      return;
    }

    if (editMode && editId) {
      const updated = feedbacks.map(item =>
        item.id === editId ? { ...item, note, comment } : item
      );
      await saveFeedbacks(updated);
      setEditMode(false);
      setEditId(null);
      const msg = 'Feedback atualizado com sucesso!';
      if (Platform.OS === 'web') {
        setMessage(msg);
      } else {
        Alert.alert(msg);
      }
    } else {
      const newItem = {
        id: Date.now().toString(),
        note,
        comment,
        date: new Date().toISOString().split('T')[0],
      };
      await saveFeedbacks([...feedbacks, newItem]);
      const msg = 'Feedback enviado com sucesso!';
      if (Platform.OS === 'web') {
        setMessage(msg);
      } else {
        Alert.alert(msg);
      }
    }

    setNote('');
    setComment('');
  };

  const handleDelete = async (id: string) => {
    const updated = feedbacks.filter(item => item.id !== id);
    await saveFeedbacks(updated);
  };

  const handleEdit = (item: FeedbackItem) => {
    setNote(item.note);
    setComment(item.comment);
    setEditId(item.id);
    setEditMode(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>

      {Platform.OS === 'web' && message !== '' && (
        <Text style={styles.webMessage}>{message}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Nota (somente números)"
        value={note}
        onChangeText={(text) => setNote(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Comentário"
        value={comment}
        onChangeText={setComment}
        multiline
      />

      <View style={styles.buttonRow}>
        <Button title={editMode ? 'Salvar' : 'Enviar'} onPress={handleSend} />
        {editMode && (
          <Button title="Cancelar" onPress={() => {
            setEditMode(false);
            setEditId(null);
            setNote('');
            setComment('');
            setMessage('');
          }} color="#999" />
        )}
      </View>

      <FlatList
        data={feedbacks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.feedbackItem}>
            <Text>Nota: {item.note}</Text>
            <Text>Comentário: {item.comment}</Text>
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
    minHeight: 50,
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
  webMessage: {
    color: '#007BFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
