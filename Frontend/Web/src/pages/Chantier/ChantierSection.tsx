import { ChantierDetails } from "../../@types/interfaces/chantier.interface";
import ChantierListCard from "../../components/Chantier/ChantierListCard";

interface ChantierSectionProps {
  title: string;
  chantiers: ChantierDetails[];
  handleCardClick: (id: string) => void;
}

function ChantierSection({ title, chantiers, handleCardClick }: ChantierSectionProps) {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <h4 className="text-lg font-bold">{title} :</h4>
      {chantiers.length > 0 ? (
        <div className=" w-full flex items-center justify-start gap-4">
          {chantiers.map((chantier) => (
            <ChantierListCard
              key={chantier._id}
              chantier={chantier}
              onClick={() => handleCardClick(chantier._id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aucun chantier disponible.</p>
      )}
    </div>
  );
}

export default ChantierSection;
