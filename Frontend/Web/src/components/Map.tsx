import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import houseLogo from "../assets/markerLogo2.png";
import AdressNotFound from "../assets/addressNotFound.jpg";

interface LeafletMapProps {
  lon: string | number | null;
  lat: string | number | null;
  addresse?: string | null;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  lon,
  lat,
  addresse,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Détruire l'ancienne carte si elle existe
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    if (lon && lat && mapContainerRef.current) {
      const latNum = parseFloat(String(lat));
      const lonNum = parseFloat(String(lon));


      // Vérification de la validité des coordonnées
      if (!isNaN(latNum) && !isNaN(lonNum)) {
        mapRef.current = L.map(mapContainerRef.current).setView(
          [latNum, lonNum],
          18
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 17,
          attribution: "© OpenStreetMap contributors",
        }).addTo(mapRef.current);

        L.marker([latNum, lonNum], {
          icon: L.icon({
            iconUrl: houseLogo,
            iconSize: [28, 35],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          }),
        })
          .addTo(mapRef.current)
          .bindPopup(addresse || "Adresse inconnue")
          .openPopup();
      } else {
        console.error("Coordonnées invalides :", lon, lat);
      }
    }
  }, [lon, lat, addresse]);

  return (
    <div className="h-full w-full">
      {lon && lat ? (
        <div
          ref={mapContainerRef}
          className="h-[360px] w-10/10 z-50 rounded-3xl "        
          ></div>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center text-red-600 font-bold">
          <div className="overflow-hidden flex justify-center items-center w-8/10 h-9/10">
            <img
              src={AdressNotFound}
              alt="Adresse non trouvée"
              className="object-contain max-h-9/10 rounded-full"
            />
          </div>
          <p>Adresse non valide ou coordonnées manquantes.</p>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
