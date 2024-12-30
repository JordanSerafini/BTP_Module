import { Chantier, ChantierDetails } from "../@types/interfaces/chantier.interface";
import { chantier } from "../utils/functions/chantier.function";
import useGlobalContext from "../../context/useGlobalContext"


export function useChantier() {
  const { setToast } = useGlobalContext();

  const getAll = async (): Promise<ChantierDetails[]> => {
    try {
      const data = await chantier.getAll();
      setToast("Chantiers chargés avec succès", "success", { autoClose: 2000 });
      return data;
    } catch (error) {
      setToast("Erreur lors du chargement des chantiers", "error");
      throw error;
    }
  };

  const getOne = async (id: string): Promise<ChantierDetails> => {
    try {
      const data = await chantier.getOne(id);
      setToast("Chantier chargé avec succès", "success", { autoClose: 2000 });
      return data;
    } catch (error) {
      setToast("Erreur lors du chargement du chantier", "error");
      throw error;
    }
  };

  const create = async (newChantier: Chantier): Promise<ChantierDetails> => {
    try {
      const data = await chantier.create(newChantier);
      setToast("Chantier créé avec succès", "success", { autoClose: 2000 });
      return data;
    } catch (error) {
      setToast("Erreur lors de la création du chantier", "error");
      throw error;
    }
  };

  const update = async (id: string, updatedData: Chantier): Promise<ChantierDetails> => {
    try {
      const data = await chantier.update(id, updatedData);
      setToast("Chantier mis à jour avec succès", "success", { autoClose: 2000 });
      return data;
    } catch (error) {
      setToast("Erreur lors de la mise à jour du chantier", "error");
      throw error;
    }
  };

  const remove = async (id: string): Promise<void> => {
    try {
      await chantier.delete(id);
      setToast("Chantier supprimé avec succès", "success", { autoClose: 2000 });
    } catch (error) {
      setToast("Erreur lors de la suppression du chantier", "error");
      throw error;
    }
  };

  const getEverStartedChantiers = (chantiers: ChantierDetails[]): ChantierDetails[] => {
    return chantiers.filter((chantier) => new Date(chantier.debut_prevu) < new Date());
  };

  const getNextWeekChantiers = (chantiers: ChantierDetails[]): ChantierDetails[] => {
    const now = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);

    return chantiers.filter((chantier) => {
      const debutPrevu = new Date(chantier.debut_prevu);
      return debutPrevu > now && debutPrevu <= nextWeek;
    });
  };

  const getFutureChantiers = (chantiers: ChantierDetails[]): ChantierDetails[] => {
    const now = new Date();
    return chantiers.filter((chantier) => new Date(chantier.debut_prevu) > now);
  }; 

  const getWeeklyChantiers = (chantiers: ChantierDetails[]): ChantierDetails[] => {
    const now = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);

    return chantiers.filter((chantier) => {
      const debutPrevu = new Date(chantier.debut_prevu);
      return debutPrevu > now && debutPrevu <= nextWeek;
    });
  }

  return {
    getAll,
    getOne,
    create,
    update,
    remove,
    getEverStartedChantiers,
    getNextWeekChantiers,
    getFutureChantiers,
    getWeeklyChantiers,
  };
}


