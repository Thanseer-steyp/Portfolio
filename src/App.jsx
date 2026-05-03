import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/home";
import Technical from "./pages/Technical";
import { Navbar } from "./components";
import Araray from "./pages/Array";
import PatternBoard from "./pages/Pattern-board";
import NotFound from "./pages/NotFound";

const Layout = () => {
  const location = useLocation();

  // ❗ hide navbar on this route
  const hideNavbar = location.pathname === "/technical/pattern-board" ;

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/technical" element={<Technical />} />
        <Route path="/technical/array" element={<Array />} />
        <Route path="/technical/pattern-board" element={<PatternBoard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
