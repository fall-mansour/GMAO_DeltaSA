import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccueilBackOffice from "./Pages/AccueilBackOffice";
import Rapports from "./Pages/Rapports";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccueilBackOffice />} />
        <Route path="/rapports" element={<Rapports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;