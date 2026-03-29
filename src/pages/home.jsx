

import {
  About,
  Contact,
  Experience,
  //  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "../components";
import Footer from "../components/Footer";

const App = () => {
  return (
    <>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />

        </div>
                  <About />
        <Experience />
        <Tech />
        <Works />
        {/* <Feedbacks /> */}
        <div className="relative z-0">
          <Contact />

          <StarsCanvas />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
