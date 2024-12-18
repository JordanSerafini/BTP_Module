import { useState, useRef, useEffect } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaCircleInfo } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { Chantier } from "../../@types/interfaces/chantier.interface";

interface ChantierListCardProps {
  chantier: Chantier;
  onClick: () => void;
}

function ChantierListCard({ chantier, onClick }: ChantierListCardProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState<"top" | "bottom">("top");
  const iconRef = useRef<HTMLDivElement>(null);

  const formatDate = (isoDate: Date): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (showPopup && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;

      if (spaceAbove < 120 && spaceBelow > 120) {
        setPopupPosition("bottom");
      } else {
        setPopupPosition("top");
      }
    }
  }, [showPopup]);

  return (
    <div className="bg-white w-9.5/10 md:w-1/3 lg:w-1/4 shadow-xl min-h-42 max-h-42 text-xs xl:text-sm rounded-xl">
      <div className="p-4">
        <div className="flex w-full justify-between items-start border-b-2 border-gray-200 mb-4 pb-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-start gap-2">
              <p className="font-bold">{chantier.numero}</p>
              <h3 className="">{chantier.title}</h3>
            </div>
            <div className="flex gap-2 w-full justify-between">
              <div className="flex items-center gap-2">
                <IoMdPerson className="text-xl text-blue-900 md:text-sm xl:text-xl" />
                <p>{chantier.client}</p>
              </div>

              <div ref={iconRef} className="relative flex items-center gap-1">
                <FaMapMarkerAlt
                  className="text-xl text-blue-900 md:text-sm xl:text-xl cursor-pointer"
                  onClick={() => setShowPopup(!showPopup)}
                />
                <p>{chantier.ville}</p>

                {showPopup && (
                  <div
                    className={`
                      absolute 
                      ${
                        popupPosition === "top"
                          ? "bottom-full mb-2"
                          : "top-full mt-2"
                      }
                      left-0 bg-white p-2 shadow-lg border rounded-md z-50
                      w-56 flex flex-col items-center
                    `}
                  >
                    <IoMdClose onClick={() => setShowPopup(false)} className="text-red-700 self-end text-base"/>
                    <p>{chantier.adresse}</p>
                    <p>
                      {chantier.code_postal} - {chantier.ville}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 self-start">
            <CiCalendarDate className="text-2xl text-green-900 hidden 2xl:flex" />
            <div className="italic xl:text-sm">
              <p>{formatDate(chantier.debut_prevu)}</p>
              <p>{formatDate(chantier.fin_prevu)}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 text-xs xl:text-sm">
            <div className="flex items-center gap-2">
              <FaCircleInfo className="text-xl text-green-900" />
              <p>{chantier.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-gray-800 w-full text-white text-center tracking-widest p-2 cursor-pointer font-bold rounded-b-xl"
        onClick={onClick}
      >
        Accéder fiche chantier
      </div>
    </div>
  );
}

export default ChantierListCard;
