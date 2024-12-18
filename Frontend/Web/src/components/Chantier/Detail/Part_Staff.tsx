import { useEffect, useState } from "react";
import { personnels } from "../../../utils/functions/multiservice.function";
import { chantier as chantierFunction } from "../../../utils/functions/chantier.function";
import { ChantierDetails } from "../../../@types/interfaces/chantier.interface";
import { Personnel } from "../../../@types/interfaces/personnel.interface";

import { IoPersonSharp } from "react-icons/io5";
import { IoMdAdd, IoMdClose } from "react-icons/io";

interface PartProps {
  chantier: ChantierDetails; // Chantier avec détails des personnels
}

function Part_Staff({ chantier }: PartProps) {
  const [personnelAvailable, setPersonnelAvailable] = useState<Personnel[]>([]);
  const [assignedPersonnel, setAssignedPersonnel] = useState<Personnel[]>(
    chantier.personnels_details || []
  );
  const [showList, setShowList] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Récupérer les personnels disponibles
  const getPersonnelAvailable = async () => {
    try {
      const allPersonnel = await personnels.getAll();
      const filteredPersonnel = allPersonnel.filter((personnel: Personnel) => {
        return !assignedPersonnel.some((staff) => staff._id === personnel._id);
      });
      setPersonnelAvailable(filteredPersonnel);
    } catch (error) {
      console.error("Erreur lors de la récupération des personnels :", error);
    }
  };

  useEffect(() => {
    getPersonnelAvailable();
  }, [assignedPersonnel]);

  const handleAddPersonnel = (personnel: Personnel) => {
    setAssignedPersonnel([...assignedPersonnel, personnel]);
    setShowList(false);
  };

  const handleRemovePersonnel = (personnel: Personnel) => {
    setAssignedPersonnel(
      assignedPersonnel.filter((staff) => staff._id !== personnel._id)
    );
  };

  const updateChantier = async () => {
    const personnelsIds = assignedPersonnel.map((staff) => staff._id);

    const updatedChantier = {
      ...chantier,
      personnels: personnelsIds,
    };

    try {
      setIsUpdating(true);
      await chantierFunction.update(chantier._id, updatedChantier);
      alert("Chantier mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur lors de la mise à jour du chantier.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <div className="flex gap-2 items-center mb-4">
        <h3 className="font-bold text-lg">Personnel actuellement attribué :</h3>
        <button
          onClick={updateChantier}
          disabled={isUpdating}
          className={`ml-auto px-4 py-1 rounded transition ${
            isUpdating
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isUpdating ? "Mise à jour..." : "Valider"}
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {assignedPersonnel.map((staff) => (
          <div
            key={staff._id}
            className="flex items-center gap-2 bg-white border rounded-lg p-2 shadow"
          >
            <IoPersonSharp className="text-xl text-blue-800" />
            <div>
              <p className="font-medium">{staff.name}</p>
              <p className="text-sm text-gray-500">{staff.role}</p>
            </div>
            <IoMdClose
              className="text-red-600 text-lg cursor-pointer ml-auto hover:text-red-800"
              onClick={() => handleRemovePersonnel(staff)}
            />
          </div>
        ))}

        <div
          className="flex items-center justify-center cursor-pointer bg-blue-200 text-blue-800 rounded-lg w-10 h-10 hover:bg-blue-300 transition"
          onClick={() => setShowList(!showList)}
        >
          <IoMdAdd className="text-2xl" />
        </div>
      </div>

      {showList && (
        <div className="bg-gray-100 p-4 rounded-xl mt-4 border border-gray-800">
          <h4 className="mb-2 font-bold">Ajouter du personnel :</h4>
          <ul className="pl-4">
            {personnelAvailable.map((personnel) => (
              <li
                key={personnel._id}
                className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                onClick={() => handleAddPersonnel(personnel)}
              >
                {personnel.name} - {personnel.role}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Part_Staff;
