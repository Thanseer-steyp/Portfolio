import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <>
      <section className={`relative w-full h-[120px] md:h-[280px] mx-auto`}>
        <div
          className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
        >
          <div className="flex flex-col justify-center items-center mt-7 md:mt-28 lg:2">
            <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div>

          <div className="mt-7 md:mt-28 lg:0">
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hello, I'm <span className="text-[#915EFF]">Thanseer</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              Full Stack Developer & Tech Enthusiast
            </p>
          </div>
        </div>
      </section>
      <section className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
  <ComputersCanvas />
</section>
    </>
  );
};

export default Hero;
