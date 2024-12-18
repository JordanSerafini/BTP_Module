import DynamicTruck from "./DynamicTruck";

interface TransportListCardProps {
    title: string;
    datetime: string;
    available: string;
    shipmentNumber: string;
    truckModel: string;
    initialPercentage: number;
    }

function TransportListCard({ title, datetime, available, shipmentNumber, truckModel, initialPercentage }: TransportListCardProps) {
  return (
    <div style={{
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      width: "350px",
      padding: "20px",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-start",
        marginBottom: "10px"
      }}>
        <div style={{ fontWeight: "600", fontSize: "16px" }}>{title}</div>
        <div style={{ fontSize: "14px", color: "#888" }}>{datetime}</div>
      </div>

      <div style={{ 
        fontSize: "14px", 
        color: "#555", 
        display: "flex", 
        flexDirection: "column", 
        gap: "4px" 
      }}>
        <div>Available, kg <span style={{ fontWeight: "600" }}>{available}</span></div>
        <div>Shipment number <span style={{ color: "#333" }}>{shipmentNumber}</span></div>
        <div>Truck <span style={{ color: "#333" }}>{truckModel}</span></div>
      </div>

      <DynamicTruck initialPercentage={initialPercentage} />
    </div>
  )
}

export default TransportListCard;
