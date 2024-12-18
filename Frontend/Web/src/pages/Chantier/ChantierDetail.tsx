import { useEffect, useState } from "react";

import { chantier } from "../../utils/functions/chantier.function";
import { ChantierDetails } from "../../@types/interfaces/chantier.interface";

import Title from "../../components/Chantier/Detail/Title";
import Part_1 from "../../components/Chantier/Detail/Part_1";
import Part_2 from "../../components/Chantier/Detail/Part_2";
//import Part_3 from "../../components/Chantier/Detail/Part_3";
import Part_Staff from "../../components/Chantier/Detail/Part_Staff";

interface ChantierDetailProps {
  chantier_id: string;
  setSelectedChantierId: (id: string | null) => void;
}

function ChantierDetail({ chantier_id, setSelectedChantierId }: ChantierDetailProps) {
  const [selectedChantier, setSelectedChantier] = useState<ChantierDetails | null>(null);
  const [fullAdress, setFullAdress] = useState<string | null>(null);

  const fetchChantier = async () => {
    try {
      const response = await chantier.getOne(chantier_id);
      setSelectedChantier(response);
      const adress = `${response.adresse} ${response.code_postal} ${response.ville}`;
      setFullAdress(adress);
    } catch (error) {
      console.error("Erreur lors de la récupération du chantier :", error);
    }
  };

  const refreshChantier = () => {
    fetchChantier();
  };

  useEffect(() => {
    fetchChantier();
  }, [chantier_id]);

  if (!selectedChantier) {
    return <div>Chargement des détails...</div>;
  }

  return (
    <div className="h-full w-full flex flex-col gap-4 bg-white">
      <Title chantier={selectedChantier} />
      <div className="border-b border-gray-800 pb-8 sm:pb-6 mb-4 flex flex-col md:flex-row overflow-auto justify-between items-center gap-4 text-xs md:text-base lg:text-lg min-h-96">
        <Part_1 chantier={selectedChantier} />
        <Part_2 chantier={selectedChantier} fullAdress={fullAdress} />
      </div>
      {/* <Part_3 chantier={selectedChantier} /> */}
      <Part_Staff chantier={selectedChantier} refreshChantier={refreshChantier} />
      <button
        onClick={() => setSelectedChantierId(null)}
        className="mt-4 p-2 bg-gray-800 text-white rounded"
      >
        Retour
      </button>
    </div>
  );
}


export default ChantierDetail;
