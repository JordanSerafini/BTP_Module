import { Chantier } from "../../../@types/interfaces/chantier.interface";
import LeafletMap from "../../Map";


interface ChantierProps {
    chantier: Chantier;
    fullAdress: string | null;
    }

function Part_2({chantier, fullAdress}: ChantierProps) {


  return (
    <div className="md:w-1/2 w-9/10 h-full">
          <LeafletMap
            lon={chantier.localisation.lon}
            lat={chantier.localisation.lat}
            addresse={fullAdress}
          />
        </div>
  )
}

export default Part_2