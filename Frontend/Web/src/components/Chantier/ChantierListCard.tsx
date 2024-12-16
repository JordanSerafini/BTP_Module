import { Chantier } from "../../@types/interfaces/chantier.interface";

interface ChantierListCardProps {
  chantier: Chantier;
  onClick: () => void;
}

function ChantierListCard({ chantier, onClick }: ChantierListCardProps) {
  return (
    <div
      className="cursor-pointer p-4 border border-gray-300 rounded-md"
      onClick={onClick} 
    >
      <h3 className="text-lg font-bold">{chantier.title}</h3>
      <p>Numéro : {chantier.numero}</p>
    </div>
  );
}

export default ChantierListCard;
