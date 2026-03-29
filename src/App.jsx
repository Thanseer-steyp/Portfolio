import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./pages/home";
import Others from "./pages/others";
import { Navbar } from "./components";

const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/others" element={<Others />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;