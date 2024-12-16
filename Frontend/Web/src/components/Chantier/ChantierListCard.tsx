import { CiCalendarDate } from "react-icons/ci";
import { BiDetail } from "react-icons/bi";
import { FaCircleInfo } from "react-icons/fa6";

import { Chantier } from "../../@types/interfaces/chantier.interface";

interface ChantierListCardProps {
  chantier: Chantier;
  onClick: () => void;
}

function ChantierListCard({ chantier, onClick }: ChantierListCardProps) {
  const formatDate = (isoDate: Date): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-white w-9.5/10 md:w-1/3 lg:w-1/4 rounded-2xl shadow-xl overflow-x-hidden overflow-y-auto min-h-42 max-h-42 text-xs xl:text-sm">
      <div className="p-4">
        <div className="
        flex flex-col xl:flex-row 
        w-full justify-between items-start border-b-2 border-gray-200 mb-4 pb-4
        ">
          <div className="flex items-center justify-start gap-2 ">
            <p className="font-bold">{chantier.numero}</p>
            <h3 className="">{chantier.title}</h3>
          </div>

          <div className="flex items-center gap-2 self-end">
            <CiCalendarDate className="text-3xl text-green-900 hidden 2xl:flex" />
            <div className="italic xl:text-sm">
              <p>{formatDate(chantier.debut_prevu)}</p>
              <p>{formatDate(chantier.fin_prevu)}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 p-2">
            <div className="flex items-center gap-2">
              <FaCircleInfo className="text-xl text-blue-900" />
              <p>{chantier.description}</p>
            </div>
            <div className="items-center gap-2 hidden xl:flex">
              <BiDetail className="text-xl text-blue-900" />
              <p>{chantier.notes}</p>
            </div>
          </div>

          
        </div>
      </div>
      <div
        className="bg-gray-800 w-full text-white text-center tracking-widest p-2 cursor-pointer font-bold"
        onClick={onClick}
      >
        Accéder fiche chantier
      </div>
    </div>
  );
}

export default ChantierListCard;
