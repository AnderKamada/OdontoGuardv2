import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../src/services/firebaseConfig';
import FooterLogout from '../app/FooterLogout';

export default function UploadScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos acessar sua galeria!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setMessage('');
    }
  };

  const uploadImageToFirebase = async () => {
    if (!imageUri) return;

    try {
      setUploading(true);
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const filename = `odonto_${Date.now()}.jpg`;
      const imageRef = ref(storage, `images/${filename}`);

      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);

      const msg = 'Upload concluído com sucesso';
      if (Platform.OS === 'web') {
        setMessage(msg);
      } else {
        Alert.alert('Imagem enviada com sucesso!', `URL: ${downloadURL}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao enviar imagem para o Firebase.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload de Imagem</Text>
      <Text style={styles.description}>Escolha uma imagem da sua galeria:</Text>

      {Platform.OS === 'web' && message !== '' && (
        <Text style={styles.webMessage}>{message}</Text>
      )}

      <View style={styles.buttonWrapper}>
        <Button title="Escolher Imagem" onPress={escolherImagem} />
      </View>

      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={styles.preview} />
          <View style={styles.buttonWrapper}>
            <Button
              title={uploading ? 'Enviando...' : 'Enviar para o dentista'}
              onPress={uploadImageToFirebase}
              disabled={uploading}
              color="#4CAF50"
            />
          </View>
          {uploading && <ActivityIndicator size="large" color="#4CAF50" />}
        </>
      )}

      <FooterLogout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonWrapper: {
    width: '70%',
    marginVertical: 10,
  },
  preview: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginTop: 20,
    resizeMode: 'cover',
  },
  webMessage: {
    color: '#007BFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});