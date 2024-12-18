import { useContext, useEffect, useState } from "react";
import { personnels } from "../../../utils/functions/multiservice.function";
import { chantier as chantierFunction } from "../../../utils/functions/chantier.function";
import { ChantierDetails } from "../../../@types/interfaces/chantier.interface";
import { Personnel } from "../../../@types/interfaces/personnel.interface";
import GlobalContext from "../../../../context/GlobalContext";

import { IoPersonSharp } from "react-icons/io5";
import { IoMdAdd, IoMdClose } from "react-icons/io";

interface PartProps {
  chantier: ChantierDetails;
  refreshChantier: () => void;
}

function Part_Staff({ chantier, refreshChantier }: PartProps) {
  const [personnelAvailable, setPersonnelAvailable] = useState<Personnel[]>([]);
  const [assignedPersonnel, setAssignedPersonnel] = useState<Personnel[]>(
    chantier.personnels_details || []
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    throw new Error("GlobalContext n'a pas été fourni");
  }
  const { setToast, openModal, closeModal } = globalContext;

  // Charger les personnels disponibles
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

  // Supprimer un personnel de la liste assignée
  const handleRemovePersonnel = (personnel: Personnel) => {
    setAssignedPersonnel(
      assignedPersonnel.filter((staff) => staff._id !== personnel._id)
    );
  };

  // Mettre à jour le chantier
  const updateChantier = async () => {
    const personnelsIds = assignedPersonnel.map((staff) => staff._id);
    const updatedChantier = {
      ...chantier,
      personnels: personnelsIds,
    };

    try {
      setIsUpdating(true);
      await chantierFunction.update(chantier._id, updatedChantier);
      setToast("Chantier mis à jour avec succès", "success", {
        autoClose: 2000,
        closeOnClick: true,
        position: "top-center",
      });
      refreshChantier();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setToast("Erreur lors de la mise à jour du chantier", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const PersonnelSelection = () => {
    const [localSelected, setLocalSelected] = useState<Personnel[]>([]);

    const toggleSelectPersonnel = (personnel: Personnel) => {
      setLocalSelected((prevSelected) =>
        prevSelected.some((p) => p._id === personnel._id)
          ? prevSelected.filter((p) => p._id !== personnel._id)
          : [...prevSelected, personnel]
      );
    };

    const handleAddSelectedPersonnel = () => {
      setAssignedPersonnel([...assignedPersonnel, ...localSelected]);
      closeModal(); 
    };

    return (
      <div>
        <ul className="pl-4">
          {personnelAvailable.map((personnel) => {
            const isSelected = localSelected.some((p) => p._id === personnel._id);
            return (
              <li
                key={personnel._id}
                className={`cursor-pointer hover:bg-gray-200 p-2 rounded ${isSelected ? "bg-blue-100" : ""}`}
                onClick={() => toggleSelectPersonnel(personnel)}
              >
                {personnel.name} - {personnel.role}
              </li>
            );
          })}
        </ul>
        <div className="flex justify-between mt-4">
          
          <button
            onClick={handleAddSelectedPersonnel}
            disabled={localSelected.length === 0}
            className={`px-4 py-2 rounded w-full ${
              localSelected.length === 0
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Ajouter
          </button>
        </div>
      </div>
    );
  };

  const openPersonnelModal = () => {
    openModal({
      title: "Ajouter du personnel",
      content: <PersonnelSelection />, // On rend le composant, qui a son propre état
      actions: null, // Les actions sont gérées directement dans PersonnelSelection
    });
  };

  return (
    <div className="p-4 rounded-lg border flex flex-col w-full items-center gap-8 overflow-auto">
      {/* Liste des personnels */}
      <div className="flex flex-wrap sm:flex-row gap-3 items-center justify-center w-full">
        {assignedPersonnel.map((staff) => (
          <div
            key={staff._id}
            className="flex items-center gap-2 border rounded-lg p-2 shadow w-full sm:w-4.5/10 md:w-56 h-20 overflow-auto"
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

        {/* Bouton Ajouter */}
        <div
          className="flex items-center justify-center cursor-pointer bg-blue-200 text-blue-800 rounded-full w-10 h-10 hover:bg-blue-300 transition"
          onClick={openPersonnelModal}
        >
          <IoMdAdd className="text-2xl" />
        </div>
      </div>

      {/* Bouton Valider en bas */}
      <div className="w-full">
        <button
          onClick={updateChantier}
          disabled={isUpdating}
          className={`px-4 py-2 rounded transition w-full ${
            isUpdating
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isUpdating ? "Mise à jour..." : "Valider"}
        </button>
      </div>
    </div>
  );
}

export default Part_Staff;
