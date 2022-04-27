import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Connection from "./pages/Connection";
import Inscription from "./pages/Inscription";
import DashboardAdmin from "./pages/DashboardAdmin";
import AdminQRcodeGen from "./pages/AdminQRcodeGen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Connection" element={<Connection />} />
        <Route path="/" element={<Accueil />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Admin" element={<DashboardAdmin />} />
        <Route path="/QRcodeGen" element={<AdminQRcodeGen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
