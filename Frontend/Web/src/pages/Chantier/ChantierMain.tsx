import { useEffect, useState } from "react";
import ChantierDetail from "./ChantierDetail";
import { ChantierDetails } from "../../@types/interfaces/chantier.interface";
import { useChantier } from "../../Hooks/useChantier";
import ChantierSection from "./ChantierSection";
import ButtonsCat from "../../components/Chantier/UI/ButtonsCat";

function ChantierMain() {
  const { getAll, getEverStartedChantiers, getNextWeekChantiers, getFutureChantiers, getWeeklyChantiers } = useChantier();

  const [chantiers, setChantiers] = useState<ChantierDetails[]>([]);
  const [weeklyChantiers, setWeeklyChantiers] = useState<ChantierDetails[]>([]);
  const [everStartedChantiers, setEverStartedChantiers] = useState<ChantierDetails[]>([]);
  const [nextWeekChantiers, setNextWeekChantiers] = useState<ChantierDetails[]>([]);
  const [futureChantiers, setFutureChantiers] = useState<ChantierDetails[]>([]);
  const [selectedChantierId, setSelectedChantierId] = useState<string | null>(null);
  const [selectedChantier, setSelectedChantier] = useState<string>("currentWeek");

  useEffect(() => {
    const fetchChantiers = async () => {
      try {
        const data = await getAll();
        setChantiers(data);

        setWeeklyChantiers(getWeeklyChantiers(data));
        setEverStartedChantiers(getEverStartedChantiers(data));
        setNextWeekChantiers(getNextWeekChantiers(data));
        setFutureChantiers(getFutureChantiers(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchChantiers();
  }, []);

  const handleCardClick = (id: string) => {
    setSelectedChantierId(id);
  };

  return (
    <div className="w-10/10 h-10/10 text-gray-900 bg-white-perso2 p-4">
      {selectedChantierId ? (
        <ChantierDetail
          chantier_id={selectedChantierId}
          setSelectedChantierId={setSelectedChantierId}
        />
      ) : (
        
        <div className="w-full h-full flex flex-col items-start justify-start gap-8 overflow-auto">
          <div className="flex justify-evenly w-full h-10">
          < ButtonsCat title="En cours" content="En cours" setSelectedChantier={setSelectedChantier} selectedChantier={selectedChantier} />
          < ButtonsCat title="currentWeek" content="currentWeek" setSelectedChantier={setSelectedChantier} selectedChantier={selectedChantier} />
          < ButtonsCat title="nextWeek" content="nextWeek" setSelectedChantier={setSelectedChantier} selectedChantier={selectedChantier} />
          < ButtonsCat title="futur" content="futur" setSelectedChantier={setSelectedChantier} selectedChantier={selectedChantier} />
          </div>
          
          {selectedChantier === "En cours" && (
          <ChantierSection
            title="En cours"
            chantiers={everStartedChantiers}
            handleCardClick={handleCardClick}
          />
          )}
          {selectedChantier === "currentWeek" && (
          <ChantierSection
            title="currentWeek"
            chantiers={weeklyChantiers}
            handleCardClick={handleCardClick}
          />
          )}
          {selectedChantier === "nexttWeek" && (
          <ChantierSection
            title="nexttWeek"
            chantiers={nextWeekChantiers}
            handleCardClick={handleCardClick}
          />
          )}
          {selectedChantier === "futur" && (
          <ChantierSection
            title="futur"
            chantiers={futureChantiers}
            handleCardClick={handleCardClick}
          />
          )}
        </div>
      )}
    </div>
  );
}

export default ChantierMain;
