import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function FooterLogout() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // 🔙 Volta para a tela anterior
  };

  return (
    <View style={styles.footer}>
      <View style={styles.buttonWrapper}>
        <Button title="Voltar" color="#F44336" onPress={handleBack} />
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
