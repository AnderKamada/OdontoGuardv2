import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import api from '../src/services/api';
import { router } from 'expo-router';

type Task = {
  id: string;
  title: string;
  done: boolean;
};

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const loadTasks = async () => {
    const response = await api.get('/tasks');
    setTasks(response.data as Task[]);
  };

  const addTask = async () => {
    if (newTask.trim() === '') return;
    const response = await api.post('/tasks', {
      title: newTask,
      done: false,
    });
    setTasks([...tasks, response.data as Task]);
    setNewTask('');
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text>{item.title}</Text>
          </View>
        )}
      />

      <TextInput
        placeholder="Nova tarefa"
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
      />
      <Button title="Adicionar" onPress={addTask} />

      {/* ⬇️ Coloque AQUI o botão para navegar para as recompensas */}
      <Button title="Ver Recompensas" onPress={() => router.push('/Rewards')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, marginTop: 10, padding: 8, borderRadius: 4 },
  task: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
  },
});
