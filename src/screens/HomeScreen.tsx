import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuário autenticado</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DetalhesAluno')}
      >
        <Text style={styles.buttonText}>
          Abrir Detalhes do Aluno
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});