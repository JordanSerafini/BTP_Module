import { useState } from "react";
import DynamicTruck from "../../components/Transport/DynamicTruck";

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

function TransportDetailsPage() {
  const [selectedPackages, setSelectedPackages] = useState<Package[]>([]);

  const togglePackage = (pkg: Package) => {
    setSelectedPackages((prev) =>
      prev.some((item) => item.id === pkg.id)
        ? prev.filter((item) => item.id !== pkg.id)
        : [...prev, pkg]
    );
  };

  const totalWeight = selectedPackages.reduce((sum, pkg) => sum + pkg.weight, 0);
  const percentage = Math.min((totalWeight / 4), 100); // totalWeight / 4 = pourcentage, max 100%

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Section Gauche */}
      <div style={{ flex: "1", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
        <h2>Truck load</h2>
        <div style={{ color: "red", fontSize: "24px", fontWeight: "bold" }}>{percentage}%</div>
        <DynamicTruck percentage={percentage} />
        <p>Available, kg: <strong>{totalWeight} / 400</strong></p>

        <div style={{ marginTop: "20px" }}>
          <h3>Upper tier</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "50px", height: "50px", backgroundColor: "green" }}></div>
            <div style={{ width: "50px", height: "50px", backgroundColor: "lightgray" }}></div>
          </div>

          <h3>Middle tier</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "50px", height: "50px", backgroundColor: "purple" }}></div>
            <div style={{ width: "50px", height: "50px", backgroundColor: "lightgray" }}></div>
          </div>
        </div>
      </div>

      {/* Section Droite */}
      <div style={{ flex: "2", backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
        <h2>Available packages</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Parcel number</th>
              <th>Weight, kg</th>
              <th>Admission date</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {packagesData.map((pkg) => (
              <tr key={pkg.id}>
                <td>{pkg.id}</td>
                <td>{pkg.weight}</td>
                <td>{pkg.date}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPackages.some((item) => item.id === pkg.id)}
                    onChange={() => togglePackage(pkg)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Selected:</strong> {selectedPackages.length} package(s),{" "}
            <strong>Weight:</strong> {totalWeight} kg
          </p>
        </div>
      </div>
    </div>
  );
}

export default TransportDetailsPage;
