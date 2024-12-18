import { useState } from "react";

function DynamicTruck({ initialPercentage = 50 }) {
  const [percentage, setPercentage] = useState(initialPercentage);

  let fillColor;
  if (percentage < 25) {
    fillColor = "green";
  } else if (percentage < 80) {
    fillColor = "orange";
  } else {
    fillColor = "red";
  }

  return (
    <div style={{ width: "100%", position: "relative", marginTop: "10px" }}>
      <div style={{ position: "absolute", top: "-15px", right: "0", fontSize: "24px", fontWeight: "bold", color: fillColor }}>
        {percentage}%
      </div>

      {/* Image du camion */}
      <div style={{ width: "100%", maxWidth: "300px", marginBottom: "10px" }}>
        <img
          src="/camion.png"
          alt="Camion"
          style={{ width: "100%", height: "auto", display: "block" }}
        />

        {/* Conteneur du coffre du camion */}
        <div
          style={{
            position: "absolute",
            top: "21px", 
            left: "26%",
            width: "65%",
            height: "96px", 
            overflow: "hidden"
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
      </div>

      {/* Contrôle pour ajuster le pourcentage (optionnel) */}
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
