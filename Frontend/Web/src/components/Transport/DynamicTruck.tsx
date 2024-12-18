import { useState } from "react";

function DynamicTruck() {
  const [percentage, setPercentage] = useState(50); // Valeur par défaut 50%

  // Détermination de la couleur en fonction du pourcentage
  let fillColor;
  if (percentage < 40) {
    fillColor = "green";
  } else if (percentage < 80) {
    fillColor = "orange";
  } else {
    fillColor = "red";
  }

  return (
    <div style={{ width: "300px", position: "relative" }}>
      {/* Image du camion */}
      <img
        src="/camion.png"
        alt="Camion"
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      {/* Conteneur du coffre du camion */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "27%",
          width: "67%",      // Largeur du coffre, ajustée selon l'image
          height: "96px",    // Hauteur du coffre, ajustée selon l'image
          overflow: "hidden" // Pour ne pas dépasser la zone du coffre
        }}
      >
        {/* Zone de remplissage */}
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: fillColor,
            opacity: 0.7,
            transition: "width 0.5s ease",
          }}
        ></div>
      </div>

      {/* Texte du pourcentage */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          color: fillColor,
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {percentage}%
      </div>

      {/* Contrôle pour ajuster le pourcentage */}
      <input
        type="range"
        min="0"
        max="100"
        value={percentage}
        onChange={(e) => setPercentage(parseInt(e.target.value))}
        style={{ width: "100%", marginTop: "10px" }}
      />
    </div>
  );
}

export default DynamicTruck;
