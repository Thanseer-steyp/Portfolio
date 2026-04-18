import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/home";
import Foundation from "./pages/foundation";
import { Navbar } from "./components";
import Basics from "./pages/pattern-basics";
import PatternBoard from "./pages/pattern-board";

const Layout = () => {
  const location = useLocation();

  // ❗ hide navbar on this route
  const hideNavbar = location.pathname === "/foundation/pattern-board";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foundation" element={<Foundation />} />
        <Route path="foundation/basics-of-patterns" element={<Basics />} />
        <Route path="foundation/pattern-board" element={<PatternBoard />} />
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

// import { BrowserRouter, Routes, Route } from "react-router-dom";


// import Home from "./pages/Home";
// import Foundation from "./pages/Foundation";
// import { Navbar } from "./components";
// import Basics from "./pages/Pattern-basics";
// import PatternBoard from "./pages/Pattern-board";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/foundation" element={<Foundation />} />
//         <Route path="foundation/basics-of-patterns" element={<Basics />} />
//         <Route path="foundation/pattern-board" element={<PatternBoard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;