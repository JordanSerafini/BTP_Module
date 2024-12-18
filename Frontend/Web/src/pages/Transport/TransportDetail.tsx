import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DynamicTruck from "../../components/Transport/DynamicTruck";

// Données des colis
const packagesData = [
  { id: "CN12537221M", weight: 52, date: "10 Jun, 8:00 AM" },
  { id: "CN12534331S", weight: 20, date: "11 Jun, 10:00 AM" },
  { id: "CN12564431M", weight: 54, date: "11 Jun, 12:30 PM" },
  { id: "CN12566721M", weight: 50, date: "11 Jun, 2:30 PM" },
  { id: "CN12537641B", weight: 100, date: "11 Jun, 6:30 PM" },
  { id: "CN22237221S", weight: 44, date: "11 Jun, 8:44 PM" },
];

type Package = {
  id: string;
  weight: number;
  date: string;
};

// Composant pour chaque package draggable
function DraggablePackage({ pkg }: { pkg: Package }) {
  const [, dragRef] = useDrag({
    type: "PACKAGE",
    item: { ...pkg },
  });

  return (
    <div
      ref={dragRef}
      style={{
        padding: "8px",
        margin: "5px 0",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "move",
      }}
    >
      {pkg.id} - {pkg.weight} kg
    </div>
  );
}

// Composant pour chaque zone du camion
function DropZone({
  title,
  onDrop,
  packages,
  maxCapacity,
}: {
  title: string;
  onDrop: (pkg: Package) => void;
  packages: Package[];
  maxCapacity: number;
}) {
  const totalWeight = packages.reduce((sum: number, pkg: Package) => sum + pkg.weight, 0);

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: "PACKAGE",
    drop: (item: Package) => {
      if (totalWeight + item.weight <= maxCapacity) {
        onDrop(item);
      }
    },
    canDrop: (item: Package) => totalWeight + item.weight <= maxCapacity,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={dropRef}
      style={{
        backgroundColor: isOver && canDrop ? "#d4edda" : "#e9e9e9",
        border: "2px dashed #ccc",
        borderRadius: "8px",
        minHeight: "150px",
        padding: "10px",
        opacity: canDrop ? 1 : 0.6, // Rend la zone moins opaque si le drop n'est pas possible
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>
        {title} - {totalWeight} / {maxCapacity} kg
      </h3>
      {packages.map((pkg: Package) => (
        <div
          key={pkg.id}
          style={{
            padding: "5px",
            backgroundColor: "#d4edda",
            border: "1px solid #ccc",
            margin: "5px 0",
            borderRadius: "4px",
          }}
        >
          {pkg.id} - {pkg.weight} kg
        </div>
      ))}
    </div>
  );
}

function TransportDetailsPage() {
  const MAX_CAPACITY = 400; 
  const ZONE_CAPACITY = 133; 

  const [upperTier, setUpperTier] = useState<Package[]>([]);
  const [middleTier, setMiddleTier] = useState<Package[]>([]);
  const [lowerTier, setLowerTier] = useState<Package[]>([]);

  const totalWeight = [...upperTier, ...middleTier, ...lowerTier].reduce(
    (sum, pkg) => sum + pkg.weight,
    0
  );
  const percentage = Math.min((totalWeight / MAX_CAPACITY) * 100, 100);

  const handleDrop = (zoneSetter: React.Dispatch<React.SetStateAction<Package[]>>, pkg: Package) => {
    zoneSetter((prev) => [...prev, pkg]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Section Gauche */}
        <div style={{ flex: "1", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
          <h2>Truck load</h2>
          <DynamicTruck percentage={percentage} />
          <p>
            Total Weight: <strong>{totalWeight} / {MAX_CAPACITY} kg</strong>
          </p>

          {/* Zones du camion */}
          <DropZone
            title="Upper tier"
            onDrop={(pkg: Package) => handleDrop(setUpperTier, pkg)}
            packages={upperTier}
            maxCapacity={ZONE_CAPACITY}
          />
          <DropZone
            title="Middle tier"
            onDrop={(pkg: Package) => handleDrop(setMiddleTier, pkg)}
            packages={middleTier}
            maxCapacity={ZONE_CAPACITY}
          />
          <DropZone
            title="Lower tier"
            onDrop={(pkg: Package) => handleDrop(setLowerTier, pkg)}
            packages={lowerTier}
            maxCapacity={ZONE_CAPACITY}
          />
        </div>

        {/* Section Droite */}
        <div style={{ flex: "2", backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
          <h2>Available packages</h2>
          {packagesData.map((pkg) => (
            <DraggablePackage key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default TransportDetailsPage;
