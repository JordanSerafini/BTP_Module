import { Chantier } from "../../../@types/interfaces/chantier.interface";


interface ChantierProps {
    chantier: Chantier;
    }

function Title({chantier}: ChantierProps) {


  return (
    <div className="flex items-center justify-center w-full gap-1 sm:gap-4 text-sm md:text-xl lg:text-2xl border-b-2 border-gray-800 pb-4 mb-2">
        <p>{chantier.numero}</p>
        <h2 className="font-bold">{chantier.title}</h2>
      </div>
  )
}

export default Title