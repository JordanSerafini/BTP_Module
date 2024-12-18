import TransportListCard from "../../components/Transport/TransportListCard";
import TransportDetailsPage from "./TransportDetail";

function TransportPage() {
  return (
    <div className="h-screen w-screen overflow-auto flex-col items-center justify-center pt-10">
      <div className="flex flex-wrap justify-evenly w-full gap-4">
      <TransportListCard
          title="Barcelona – Seville"
          datetime="15 Jun, 8:00 PM"
          available="100/400"
          shipmentNumber="S890324"
          truckModel="Iveco 80E18"
          
        />
        <TransportListCard
          title="Barcelona – Valencia"
          datetime="15 Jun, 2:00 PM"
          available="20/200"
          shipmentNumber="V435322"
          truckModel="Iveco 80E18"
          
        />
       
        <TransportListCard
          title="Barcelona – Cordoba"
          datetime="15 Jun, 10:00 PM"
          available="160/200"
          shipmentNumber="C998426"
          truckModel="Iveco 80E21"
          
        />
      </div>
      <div className="border-t-2 border-gray-800 w-full mt-10">
        <TransportDetailsPage />
      </div>
    </div>
  );
}

export default TransportPage;
