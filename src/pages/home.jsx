import {
  About,
  Contact,
  Experience,
  //  Feedbacks,
  Hero,
  Tech,
  Works,
  StarsCanvas,
} from "../components";
import Footer from "../components/Footer";

const App = () => {
  return (
    <>
      <div className="relative z-0 bg-primary">
        <Hero />
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
