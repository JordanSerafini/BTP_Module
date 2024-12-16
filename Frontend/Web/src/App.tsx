import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "./utils/middlewares/PrivateRoute";
import Home from "./pages/Home/Home";
import Page404 from "./pages/404/Page404";

import GlobalProvider from "../context/GlobalProvider";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="w-screen h-screen">
          <Routes>
            {/*<Route path="/login" element={<Login />} />*/}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
