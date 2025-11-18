import { Routes, Route, Router } from "react-router-dom";
import CadastroProduto from "./pages/CadastroProduto/CadastroProduto";
import Lista from "./pages/Lista/Lista";
import Home from "./pages/Home/Home";

function App() {
  return (
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produto" element={<CadastroProduto />} />
      <Route path="/categoria" element={<CadastroProduto />} />
      <Route path="/lista" element={<Lista />} />
    </Routes>
  );
}

export default App;
