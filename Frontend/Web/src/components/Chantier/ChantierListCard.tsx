import { CiCalendarDate } from "react-icons/ci";
import { BiDetail } from "react-icons/bi";
import { FaCircleInfo } from "react-icons/fa6";
import { FaSearchPlus } from "react-icons/fa";

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
    <div className="bg-white p-2 w-1/4 rounded-2xl shadow-xl overflow-x-hidden overflow-y-auto">
      <div className="flex w-full justify-between items-start border-b-2 border-gray-200 p-2 mb-4">
        <div className="flex items-center justify-start gap-2 ">
          <p className="font-bold">{chantier.numero}</p>
          <h3 className="text-lg">{chantier.title}</h3>
        </div>

        <div className="flex items-center gap-2">
          <CiCalendarDate className="text-3xl text-green-800" />
          <div className="italic text-sm">
            <p>{formatDate(chantier.debut_prevu)}</p>
            <p>{formatDate(chantier.fin_prevu)}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mr-8">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center gap-2">
            <BiDetail className="text-xl text-blue-800" />
            <p>{chantier.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaCircleInfo className="text-xl text-blue-800" />
            <p>{chantier.notes}</p>
          </div>
        </div>
        <FaSearchPlus className="text-2xl text-green-800 cursor-pointer"  onClick={onClick}/>
      </div>
    </div>
  );
}

export default ChantierListCard;
