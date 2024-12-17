import { useEffect, useState } from "react";
import { chantier } from "../../utils/functions/chantier.function";
import { Chantier } from "../../@types/interfaces/chantier.interface";

interface ChantierDetailProps {
  chantier_id: string;
  setSelectedChantierId: (id: string | null) => void;
}

function ChantierDetail({ chantier_id, setSelectedChantierId }: ChantierDetailProps) {
  const [selectedChantier, setSelectedChantier] = useState<Chantier | null>(
    null
  );

  console.log(selectedChantier);

  useEffect(() => {
    const fetchChantier = async () => {
      try {
        const response = await chantier.getOne(chantier_id); 
        setSelectedChantier(response);
      } catch (error) {
        console.error("Erreur lors de la récupération du chantier :", error);
      }
    };

    fetchChantier();
  }, [chantier_id]);

  console.log(selectedChantier);


  if (!selectedChantier) {
    return <div>Chargement des détails...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">{selectedChantier.title}</h2>
      <p>Numéro : {selectedChantier.numero}</p>
      <p>Description : {selectedChantier.description || "Pas de description"}</p>
      <button
        onClick={() => setSelectedChantierId(null)}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Retour
      </button>      
    </div>
  );
}

export default ChantierDetail;
