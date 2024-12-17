import { useEffect, useState } from "react";

import { FaPhone } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";
import LeafletMap from "../../components/Map";

import { chantier } from "../../utils/functions/chantier.function";
import { Chantier } from "../../@types/interfaces/chantier.interface";

interface ChantierDetailProps {
  chantier_id: string;
  setSelectedChantierId: (id: string | null) => void;
}

function ChantierDetail({
  chantier_id,
  setSelectedChantierId,
}: ChantierDetailProps) {
  const [selectedChantier, setSelectedChantier] = useState<Chantier | null>(
    null
  );

  const [fullAdress, setFullAdress] = useState<string | null>(null);

  //console.log(selectedChantier?.localisation);

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

  useEffect(() => {
    fetchChantier();
  }, [chantier_id]);

  //console.log(selectedChantier);

  if (!selectedChantier) {
    return <div>Chargement des détails...</div>;
  }

  return (
    <div className=" h-full w-full flex flex-col gap-4 ">
      <div className="flex items-center justify-center w-full gap-1 sm:gap-4 text-sm md:text-xl lg:text-2xl border-b-2 border-gray-800 pb-4 mb-2">
        <p>{selectedChantier.numero}</p>
        <h2 className="font-bold">{selectedChantier.title}</h2>
      </div>

      <div className="border-b border-gray-800 pb-6 mb-4 flex flex-col md:flex-row overflow-hidden justify-between items-center gap-4 text-xs md:text-base lg:text-lg">
        {/*-------------------------------------------------------------- Partie Gauche ---------------------------------------------------------------------------- */}
        <div className=" w-10/10 md:w-1/2 justify- items-center flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full justify-evenly items-center">
            <div className="flex gap-2 items-center">
              <IoMdPerson className="text-blue-800 text-lg" />
              <p>{selectedChantier.client}</p>
            </div>
            <div className="flex gap-2 items-center">
              <FaPhone className="text-blue-800 text-lg" />
              <p>0627080856</p>
            </div>
            <div className="flex gap-2 items-center">
              <MdOutlineAlternateEmail className="text-blue-800 text-lg" />
              <p>antoine.d@gmail.com</p>
            </div>
          </div>
          <div className="flex gap-2">
            <p>{selectedChantier.adresse}</p>
            <p>{selectedChantier.code_postal}</p>
            <p>{selectedChantier.ville} </p>
          </div>
        </div>
        {/*-------------------------------------------------------------- Partie Droites > MAP ---------------------------------------------------------------------------- */}
        <div className="md:w-1/2 w-9/10"> 
        <LeafletMap lon={selectedChantier.localisation.lon} lat={selectedChantier.localisation.lat} addresse={fullAdress} />
        </div>
      </div>

      <div className="flex justify-evenly border-b border-gray-800 pb-6 mb-2">
        <div className="flex gap-2">
          <h3 className="font-bold">Description : </h3>
          <p>{selectedChantier.description || "Pas de description"}</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-bold">commentaires:</h3>
          <ul className="list-disc list-inside">
            {selectedChantier.commentaires.map((commentaire, index) => (
              <li key={index}>{commentaire}</li>
            ))}
          </ul>
        </div>
      </div>

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
