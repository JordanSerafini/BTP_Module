import { Chantier } from "../../../@types/interfaces/chantier.interface";

import { FaPhone } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";

interface ChantierProps {
  chantier: Chantier;
}

function Part_1({ chantier }: ChantierProps) {
  const formatDate = (isoDate: Date): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-white p-2 h-10/10 rounded-xl w-10/10 md:w-1/2 justify-start items-center flex flex-col gap-4 text-xs sm:text-sm md:text-base">
      <div className="flex flex-col md:flex-row gap-4 w-full justify-evenly items-center ">
        <div className="flex gap-2 items-center">
          <IoMdPerson className="text-blue-800 " />
          <p>{chantier.client}</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <div className="flex gap-2 items-center">
            <FaPhone className="text-blue-800 " />
            <p>0627080856</p>
          </div>
          <div className="flex gap-2 items-center">
            <MdOutlineAlternateEmail className="text-blue-800 " />
            <p>antoine.d@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 ">
        <p>{chantier.adresse}</p>
        <p>{chantier.code_postal}</p>
        <p>{chantier.ville} </p>
      </div>
      <div className="flex gap-2">
        <p>Du: {formatDate(chantier.debut_prevu)}</p>
        <p>Au: {formatDate(chantier.fin_prevu)}</p>
      </div>
    </div>
  );
}

export default Part_1;
