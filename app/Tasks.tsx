import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import api from '../src/services/api';
import { useRouter } from 'expo-router';
import FooterLogout from '../app/FooterLogout';

interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  done: boolean;
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await api.get<Task[]>('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      router.push('/erro');
    }
  };

  const addOrUpdateTask = async () => {
    if (newTask.trim() === '') return;
    try {
      if (editMode && editTaskId) {
        await api.put(`/tasks/${editTaskId}`, {
          title: newTask,
          description,
        });
        const updatedTasks = tasks.map((task) =>
          task.id === editTaskId ? { ...task, title: newTask, description } : task
        );
        setTasks(updatedTasks);
        setEditMode(false);
        setEditTaskId(null);
        Alert.alert('Sucesso', 'Tarefa editada com sucesso!');
      } else {
        const dataAtual = new Date().toISOString().split('T')[0];
        const response = await api.post<Task>('/tasks', {
          title: newTask,
          description,
          done: false,
          createdAt: dataAtual,
        });
        setTasks([...tasks, response.data]);
      }
      setNewTask('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      router.push('/erro');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      router.push('/erro');
    }
  };

  const startEditTask = (task: Task) => {
    setNewTask(task.title);
    setDescription(task.description);
    setEditTaskId(task.id);
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditTaskId(null);
    setNewTask('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a tarefa"
        value={newTask}
        onChangeText={setNewTask}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a descrição"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.buttonRow}>
        <Button title={editMode ? 'Salvar Edição' : 'Adicionar'} onPress={addOrUpdateTask} />
        {editMode && (
          <Button title="Cancelar Edição" onPress={cancelEdit} color="#999" />
        )}
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.taskText}>Título: {item.title}</Text>
              <Text>Descrição: {item.description}</Text>
              <Text style={{ fontSize: 12, color: 'gray' }}>Data: {item.createdAt}</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => startEditTask(item)}
              >
                <Text style={styles.buttonText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.buttonText}>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/*  Botão de Sair no rodapé */}
      <FooterLogout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 80, 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  taskItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  taskText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    marginLeft: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
