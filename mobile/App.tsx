import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  title: String
}

const Button = (props:ButtonProps) => {
  return (
    <TouchableOpacity>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello React Native</Text>
      <Button title="Enviar"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#909000',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
