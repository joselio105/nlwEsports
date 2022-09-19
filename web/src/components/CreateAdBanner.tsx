import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export const CreateAdBanner = () => {
    return (
        <div className="pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden">
        <div className="px-8 py-6 bg-[#2A2634] flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
            <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
          </div>
          <Dialog.Trigger>
            <a className="px-3 py-4 text-white bg-violet-500 hover:bg-violet-600 rounded flex justify-between items-center gap-3">
                <MagnifyingGlassPlus size={24} />
                Publicar anúncio
          </a>
          </Dialog.Trigger>
          
        </div>
      </div>
    )
}