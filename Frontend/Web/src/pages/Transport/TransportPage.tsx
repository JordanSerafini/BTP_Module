import TransportListCard from "../../components/Transport/TransportListCard"

function TransportPage() {
  return (
    <div style={{ 
      display: "flex", 
      flexWrap: "wrap", 
      gap: "20px", 
      padding: "20px", 
      backgroundColor: "#f9f9f9" 
    }}>
      <TransportListCard
        title="Barcelona – Valencia"
        datetime="15 Jun, 2:00 PM"
        available="20/200"
        shipmentNumber="V435322"
        truckModel="Iveco 80E18"
        initialPercentage={90}
      />
      <TransportListCard
        title="Barcelona – Seville"
        datetime="15 Jun, 8:00 PM"
        available="200/400"
        shipmentNumber="S890324"
        truckModel="Iveco 80E18"
        initialPercentage={60}
      />
      <TransportListCard
        title="Barcelona – Cordoba"
        datetime="15 Jun, 10:00 PM"
        available="160/200"
        shipmentNumber="C998426"
        truckModel="Iveco 80E21"
        initialPercentage={25}
      />
    </div>
  )
}

export default TransportPage
