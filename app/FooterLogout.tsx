import { View, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function FooterLogout() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('@odontoGuard_user');
            router.push('/');
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível sair.');
            console.error(error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.footer}>
      <View style={styles.buttonWrapper}>
        <Button title="Sair" color="#F44336" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '70%',
  },
});
