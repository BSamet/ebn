
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Connection from "./pages/Connection";
import Inscription from "./pages/Inscription";


function App() {
 

  
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/Connection" element={<Connection />} />
        <Route path="/" element={<Accueil/>} />
        <Route path="/Inscription" element={<Inscription/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
