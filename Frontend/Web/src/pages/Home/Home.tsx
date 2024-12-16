import React, { useContext } from "react";
import GlobalContext from "../../../context/GlobalContext";

import ChantierMain from "../Chantier/ChantierMain";

const Home: React.FC = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error("GlobalContext must be used within a GlobalProvider");
  }

  const { setToast, content, setContent } = globalContext;

  const handleShowToast = () => {
    setToast("Ceci est un toast personnalisé !", "info", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "font-bold italic",
      bodyClassName: "custom-toast-body",
    });  
  };

  const handleUpdateContent = () => {
    setContent("Chantier");
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center ">
      {content === "Home" && (
        <div className="w-full h-full justify-evenly flex">
          <button onClick={handleShowToast}>Afficher un Toast</button>
          <button onClick={handleUpdateContent}>
            Page Chantier
          </button>
        </div>
      )}
      {content === "Chantier" && <ChantierMain />}
    </div>
  );
};

export default Home;
