import { Button, Text, View } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Text>Tela Login</Text>

      <Button
        title="Ir para cadastro"
        onPress={() => navigation.navigate('Cadastro')}
      />
    </View>
  );
}