import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from "phosphor-react";
import { Input } from "./Input";
import { useEffect, useState, FormEvent } from "react";


export const CreateAdModal = ()=> {
    interface Game {
      id: string,
      title: string,
      bannerUrl: string,
      _count: {
        ads: number
      }
    }
  
    const [ games, setGames ] = useState<Game[]>([]);
    const [ weekDays, setWeekDays ] = useState<string[]>([]);
    const [ useVoiceChannel, setUseVoiceChannel ] = useState<boolean>(false);
  
    useEffect( () => {
      axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if(!data.name){
            alert('É necessário informar o nome')
            return
        }

        const host = `http://localhost:3333/games/${data.game}/ads`;
        const dataRequest = {
                    name: data.name,
                    yearsPlaing: Number(data.yearsPlaing),
                    discord: data.discord,
                    weekDays: weekDays.map(Number),
                    hourStart: data.hourStart,
                    hourEnd: data.hourEnd,
                    voiceChanel: useVoiceChannel
                }
        
        console.log(host, dataRequest)
        try {
            await axios.post(host, dataRequest);
            
            alert("Anúncio criado com sucesso!");
        } catch (error) {
            console.log(error)
            alert("Erro ao criar anúncio!");
        }
        
        
    }

    return (
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed">
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
              <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">Qual o Game?</label>
                  <select
                    id="game"
                    name="game"
                    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none" 
                    defaultValue=""
                  >
                    <option disabled>Selecione o game que deseja jogar</option>
                    { games.map( game => {
                        return <option key={game.id} value={game.id}>{game.title}</option>
                    })}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
                  <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaing" className="font-semibold">Joga a quantos anos?</label>
                    <Input name="yearsPlaing" id="yearsPlaing" type="number" placeholder="Tudo bem ser ZERO" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord" className="font-semibold">Qual o seu Discord?</label>
                    <Input name="discord" id="discord" placeholder="Usuário#0000" />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>
                    <ToggleGroup.Root 
                        type="multiple" 
                        className="grid grid-cols-4 gap-2"
                        value={weekDays}
                        onValueChange={setWeekDays}
                    >
                          <ToggleGroup.Item 
                              value="0"
                              title="Domingo"
                              className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >D</ToggleGroup.Item>
                          <ToggleGroup.Item 
                              value="1"
                              title="Segunda Feira"
                              className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >S</ToggleGroup.Item>
                          <ToggleGroup.Item 
                              value="2"
                              title="Terça Feira"
                              className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >T</ToggleGroup.Item>
                          <ToggleGroup.Item 
                              value="3"
                              title="Quarta Feira"
                              className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >Q</ToggleGroup.Item>
                          <ToggleGroup.Item 
                              value="4"
                              title="Quinta Feira"
                              className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >Q</ToggleGroup.Item>
                          <ToggleGroup.Item 
                              value="5"
                              title="Sexta Feira"
                              className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >S</ToggleGroup.Item>
                          <ToggleGroup.Item
                              value="6" 
                              title="Sábedo"
                              className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >S</ToggleGroup.Item>
                    </ToggleGroup.Root>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart" className="font-semibold">Qual horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input name="hourStart" type="time" placeholder="De" id="hourStart" />
                      <Input name="hourEnd" type="time" placeholder="Até" id="hourStart" />
                    </div>
                  </div>
                </div>
                <label className="mt-2 flex items-center gap-2 text-sm">
                  <Checkbox.Root 
                    checked={useVoiceChannel}
                    onCheckedChange={checked=> {
                        if(checked === true){
                            setUseVoiceChannel(true);
                        }else{
                            setUseVoiceChannel(false);
                        }
                    }} 
                    className="w-6 h-6 rounded pbg-zinc-900-1">
                    <Checkbox.Indicator>
                        <Check className="w-4 h-4 text-emerald-400" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costumo me conectar ao chat de voz
                </label>
                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                  <button 
                    type="submit"
                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                  >
                    <GameController size={24} />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
    )
}