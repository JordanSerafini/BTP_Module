import { useEffect, useState } from "react";

import { personnels } from "../../../utils/functions/multiservice.function";
import { chantiers } from "../../../utils/functions/multiservice.function";
import { Chantier } from "../../../@types/interfaces/chantier.interface";

import { IoPersonSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Personnel } from "../../../@types/interfaces/personnel.interface";

interface PartProps {
  chantier: Chantier;
}

function Part_Staff({ chantier }: PartProps) {
  const [personnelAvailable, setPersonnelAvailable] = useState<Personnel[]>([]);
  const [assignedPersonnel, setAssignedPersonnel] = useState<Personnel[]>(
    chantier.personnels_details
  );
  const [showList, setShowList] = useState(false); // Gérer l'affichage de la liste

  // Récupère la liste du personnel disponible
  const getPersonnelAvailable = async () => {
    const allPersonnel = await personnels.getAll();
    const filteredPersonnel = allPersonnel.filter((personnel: Personnel) => {
      return !assignedPersonnel.some((staff) => staff._id === personnel._id);
    });
    setPersonnelAvailable(filteredPersonnel);
  };

  useEffect(() => {
    getPersonnelAvailable();
  }, [assignedPersonnel]);

  // Ajouter un personnel
  const handleAddPersonnel = (personnel: Personnel) => {
    setAssignedPersonnel([...assignedPersonnel, personnel]);
    setShowList(false);
  };

  const handleRemovePersonnel = (personnel: Personnel) => {
    setAssignedPersonnel(
      assignedPersonnel.filter((staff) => staff._id !== personnel._id)
    );
  }

  const updateChantier = async () => {
    const updatedChantier = {
      ...chantier,
      personnels_details: assignedPersonnel,
    };
    await chantiers.update(updatedChantier);
  }

  return (
    <div className="">
      <div className="flex gap-2">
        <h3>Personnel actuellement attribué:</h3>
        <div className="flex flex-wrap gap-8">
          {assignedPersonnel.map((staff, index) => (
            <div
              key={index}
              className="flex-col flex items-center justify-center gap-2"
            >
              <IoPersonSharp className="text-xl text-blue-800" />
              <div className="flex-col flex items-center justify-center italic">
                <p>{staff.name}</p>
                <p>{staff.role}</p>
              </div>
            </div>
          ))}
          <div
            className="cursor-pointer"
            onClick={() => setShowList(!showList)} 
          >
            <IoMdAdd className="text-xl text-blue-800" />
          </div>
        </div>
      </div>

      {/* Affichage de la liste des personnels disponibles */}
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
