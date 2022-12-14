import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Header } from '../../components/Header';
import { useNavigation } from "@react-navigation/native";

import { styles } from './styles';

export function Home() {
    const [ games, setGames ] = useState<GameCardProps[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetch('http://150.162.53.58:3333/games')
        .then(response => response.json())
        .then(data => setGames(data))
    }, []);

    const handleOpenGame = ({id, title, bannerUrl}: GameCardProps) => {
        navigation.navigate('game', { id, title, bannerUrl });
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
            <Image 
                source={logoImg} 
                style={ styles.logo}
            />
            <Header title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar" />
            <FlatList
                contentContainerStyle={styles.contentList}
                data={games}
                keyExtractor= { item => item.id }
                renderItem={
                    ({item}) => (
                        <GameCard data={item} onPress={() => {handleOpenGame(item)}} />
                    )
                }
                horizontal
                showsVerticalScrollIndicator={false}
            />
            
        </SafeAreaView>
        </Background>
        
    );
}