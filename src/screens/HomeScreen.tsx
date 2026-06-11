import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuario autenticado</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('UploadDocumentos')}>
        <Text style={styles.btnText}>Upload de Documentos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  title: { fontSize: 18 },
  btn: { backgroundColor: '#2563eb', borderRadius: 8, padding: 14, paddingHorizontal: 24 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
