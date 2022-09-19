import "./styles/main.css";

import logo from "./assets/Logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Input } from "./components/Input";

function App() {
  interface Game {
    id: string,
    title: string,
    bannerUrl: string,
    _count: {
      ads: number
    }
  }

  const [ games, setGames ] = useState<Game[]>([]);

  useEffect( () => {
    fetch('http://localhost:3333/games')
    .then( response => response.json())
    .then(data => {
      setGames(data)
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logo} alt="logo" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient text-transparent bg-clip-text">duo</span> está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {
          games.map(game => (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          ))
        }
        
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed">
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
              <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
              <form className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">Qual o Game?</label>
                  <Input id="game" placeholder="selecione o game que deseja jogar" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
                  <Input id="name" placeholder="Como te chamam dentro do game?" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaing" className="font-semibold">Joga a quantos anos?</label>
                    <Input id="yearsPlaing" type="number" placeholder="Tudo bem ser ZERO" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord" className="font-semibold">Qual o seu Discord?</label>
                    <Input id="discord" placeholder="Usuário#0000" />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button 
                        title="Domingo"
                        className="w-8 h-8 bg-zinc-900 rounded"
                      >D</button>
                      <button 
                        title="Segunda Feira"
                        className="w-8 h-8 bg-zinc-900 rounded"
                      >S</button>
                      <button 
                        title="Terça Feira"
                        className="w-8 h-8 bg-zinc-900 rounded"
                      >T</button>
                      <button 
                        title="Quarta Feira"
                        className="w-8 h-8 bg-zinc-900 rounded"
                      >Q</button>
                      <button 
                        title="Quinta Feira"
                        className="w-8 h-8 bg-zinc-900 rounded"
                      >Q</button>
                      <button 
                        title="Sexta Feira"
                        className="w-8 h-8 bg-zinc-900 rounded"
                      >S</button>
                      <button 
                        title="Sábedo"
                        className="w-8 h-8 bg-zinc-900 rounded"
                      >S</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart" className="font-semibold">Qual horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="time" placeholder="De" id="hourStart" />
                      <Input type="time" placeholder="Até" id="hourEnd" />
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex gap-2 text-sm">
                  <input type="checkbox" id="voiceChanel" />
                  Costumo me conectar ao chat de voz
                </div>
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
      </Dialog.Root>
      
    </div>
   
  )
}

export default App
