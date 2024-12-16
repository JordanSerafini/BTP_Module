import { useEffect, useState } from "react";

import ChantierListCard from "../../components/Chantier/ChantierListCard";
import ChantierDetail from "./ChantierDetail";

import { chantier } from "../../utils/functions/chantier.function";
import { Chantier } from "../../@types/interfaces/chantier.interface";

function ChantierMain() {
  const [chantiers, setChantiers] = useState<Chantier[]>([]);
  const [selectedChantierId, setSelectedChantierId] = useState<string | null>(
    null
  );


  // Récupération des chantiers
  const getAll = async () => {
    const response = await chantier.getAll();
    setChantiers(response);
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleCardClick = (id: string) => {
    setSelectedChantierId(id); 

  };

  return (
    <div className="w-10/10 h-10/10 text-gray-900 bg-white-perso2 p-4">
      {selectedChantierId ? (
        < ChantierDetail chantier_id={selectedChantierId} setSelectedChantierId={setSelectedChantierId} />
      ) : (
        <div className="w-full h-full flex flex-wrap items-start justify-evenly gap-1 gap-y-8 overflow-auto">
          {chantiers.map((chantier) => (
            <ChantierListCard
              key={chantier._id}
              chantier={chantier}
              onClick={() => handleCardClick(chantier._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ChantierMain;
