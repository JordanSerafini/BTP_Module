interface DynamicTruckProps {
  percentage: number;
}

function DynamicTruck({ percentage }: DynamicTruckProps) {
  let fillColor;
  if (percentage < 25) {
    fillColor = "green";
  } else if (percentage < 80) {
    fillColor = "orange";
  } else {
    fillColor = "red";
  }

  return (
    <div style={{ width: "300px", position: "relative", marginTop: "10px" }}>
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "0",
          fontSize: "24px",
          fontWeight: "bold",
          color: fillColor,
          zIndex: 5,
        }}
      >
        {Math.round(percentage)}%
      </div>

      <div style={{ width: "100%", maxWidth: "300px", marginBottom: "10px", position: "relative" }}>
        <img
          src="/camion.png"
          alt="Camion"
          style={{ width: "100%", height: "auto", display: "block" }}
        />

        <div
          style={{
            position: "absolute",
            top: "21px",
            left: "26.8%",
            width: "67.4%",
            height: "95px",
            overflow: "hidden",
          }}
        >
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
    </div>
  );
}

export default DynamicTruck;
