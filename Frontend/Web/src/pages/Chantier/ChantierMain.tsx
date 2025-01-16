import React, { useEffect, useState, useContext, useCallback } from "react";
import ChantierDetail from "./ChantierDetail";
import { ChantierDetails } from "../../@types/interfaces/chantier.interface";
import { useChantier } from "../../Hooks/useChantier";
import ChantierSection from "./ChantierSection";
import ButtonsCat from "../../components/Chantier/UI/ButtonsCat";
import GlobalContext, {
  GlobalContextType,
} from "../../../context/GlobalContext";

const ChantierMain: React.FC = () => {
  const { getAll } = useChantier();
  const globalContext = useContext(GlobalContext) as GlobalContextType;
  const refresh = globalContext.refresh;
  const [completedChantiers, setCompletedChantiers] = useState<ChantierDetails[]>([]);
  const [inProgressChantiers, setInProgressChantiers] = useState<ChantierDetails[]>([]);
  const [upcomingChantiers, setUpcomingChantiers] = useState<ChantierDetails[]>([]);
  const [selectedChantierId, setSelectedChantierId] = useState<string | null>(null);
  const [selectedChantier, setSelectedChantier] = useState<string>("En cours");
  const [isFetching, setIsFetching] = useState(false);

  const fetchChantiers = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const data = await getAll();
      setCompletedChantiers(
        data.filter((chantier) => chantier.status === "Terminé")
      );
      setInProgressChantiers(
        data.filter((chantier) => chantier.status === "En cours")
      );
      setUpcomingChantiers(
        data.filter((chantier) => chantier.status === "À venir")
      );
      globalContext.setToast("Chantiers chargés avec succès", "success");
    } catch (error) {
      console.error("Erreur lors du fetch des chantiers", error);
      globalContext.setToast(
        "Erreur lors du chargement des chantiers",
        "error"
      );
    } finally {
      setIsFetching(false);
    }
  }, [refresh]);

  useEffect(() => {
    fetchChantiers();
  }, [fetchChantiers]);

  useEffect(() => {
    if (globalContext.refreshState) {
      fetchChantiers();
    }
  }, [globalContext.refreshState, fetchChantiers]);

  const handleCardClick = useCallback((id: string) => {
    setSelectedChantierId(id);
  }, []);

  return (
    <div className="w-full h-full text-gray-900 bg-white p-4">
      {selectedChantierId ? (
        <ChantierDetail
          chantier_id={selectedChantierId}
          setSelectedChantierId={setSelectedChantierId}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-start justify-start gap-8 overflow-auto">
          <div className="flex justify-evenly w-full h-10">
            <ButtonsCat
              title="Terminé"
              content="Terminé"
              setSelectedChantier={setSelectedChantier}
              selectedChantier={selectedChantier}
            />
            <ButtonsCat
              title="En cours"
              content="En cours"
              setSelectedChantier={setSelectedChantier}
              selectedChantier={selectedChantier}
            />
            <ButtonsCat
              title="À venir"
              content="À venir"
              setSelectedChantier={setSelectedChantier}
              selectedChantier={selectedChantier}
            />
          </div>

          {selectedChantier === "En cours" && (
            <ChantierSection
              title="Chantiers en cours"
              chantiers={inProgressChantiers}
              handleCardClick={handleCardClick}
            />
          )}
          {selectedChantier === "Terminé" && (
            <ChantierSection
              title="Chantiers terminés"
              chantiers={completedChantiers}
              handleCardClick={handleCardClick}
            />
          )}
          {selectedChantier === "À venir" && (
            <ChantierSection
              title="Chantiers à venir"
              chantiers={upcomingChantiers}
              handleCardClick={handleCardClick}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ChantierMain;
