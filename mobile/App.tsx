import { Background } from './src/components/Background';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

export default function App() {
  const [ fontesLoaded ] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  return (
    <Background>
      <StatusBar 
        backgroundColor='transparent'
        barStyle='light-content'
        translucent
      />
      { fontesLoaded ? <Routes /> : <Loading /> }
    </Background>
  );
}
