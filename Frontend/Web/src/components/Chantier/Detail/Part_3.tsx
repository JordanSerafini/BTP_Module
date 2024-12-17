import { Chantier } from "../../../@types/interfaces/chantier.interface";


interface ChantierProps {
    chantier: Chantier;
    }

function Part_3({chantier}: ChantierProps) {


  return (
    <div className="flex flex-col items-center gap-2 md:flex-row justify-evenly border-b border-gray-800 pb-6 mb-2 text-xs sm:text-sm md:text-base">
        <div className="flex gap-2 max-w-1/2 overflow-auto">
          <h3 className="font-bold">Description:</h3>
          <p>{chantier.description || "Pas de description"}</p>
        </div>
        <div className="flex gap-2 max-w-1/2 overflow-auto">
          <h3 className="font-bold">commentaires:</h3>
          <ul className="list-disc list-inside">
            {chantier.commentaires.map((commentaire, index) => (
              <li key={index}>{commentaire}</li>
            ))}
          </ul>
        </div>
      </div>
  )
}

export default Part_3