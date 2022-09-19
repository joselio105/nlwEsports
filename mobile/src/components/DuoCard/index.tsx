import { View, TouchableOpacity, Text } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { GameController } from 'phosphor-react-native';

import { styles } from './styles';

export interface DuoCardProps {
    id: string;
    hourStart: string;
    hourEnd: string;
    weekDays: string[];
    yearsPlaing: number;
    useVoiceChanel: boolean;
    name: string;
}

interface Props {
    data: DuoCardProps;
    onConect: () => void;
}

export function DuoCard( { data, onConect }: Props) {
  return (
    <View style={styles.container}>
        <DuoInfo label='Nome' value={data.name} />
        <DuoInfo label='Tempo de jogo' value={`${data.yearsPlaing} anos`} />
        <DuoInfo label='Disponibilidade' value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`} />
        <DuoInfo 
            label='Chamada de audio' 
            value={data.useVoiceChanel ? 'Sim' : 'Não'} 
            colorValue={data.useVoiceChanel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
        />
        <TouchableOpacity style={styles.button} onPress={onConect}>
            <GameController color={THEME.COLORS.TEXT} size={20} />
            <Text style={styles.buttonTitle}>Conectar</Text>
        </TouchableOpacity>
    </View>
  );
}