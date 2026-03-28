import React, { useEffect, useRef } from "react";
import { Tilt } from "react-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {  } from "../styles";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;

    // ScrollTrigger for animating project cards with stagger
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 100, // Start off-screen
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: el,
          start: "top bottom", // Trigger when the top of the element hits the bottom of the viewport
          end: "top center", // End when the top reaches the center of the viewport
          scrub: true, // Smoothly sync scroll and animation
          markers: false, // Set to `true` to see debug markers
        },
      },
    );
  }, []);

  return (
    <div ref={cardRef}>
      <div

        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full hover:scale-105 hover:duration-500"
      >
        <a className="relative w-full h-[200px] " href={source_code_link} target="blank">
          <div className="flex justify-center bg-white rounded-2xl">
            {/* <div
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            > */}
              <img
                src={image}
                alt="logo"
                className="w-1/2 h-[180px] object-contain"
              />
            {/* </div> */}
          </div>
        </a>

        <div className="mt-2">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  useEffect(() => {
    // Stagger effect for project cards
    gsap.fromTo(
      ".project-card", // Select all project cards
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1, // Stagger delay of 0.3 seconds between each card
        scrollTrigger: {
          trigger: ".works-container",
          start: "top bottom", // Trigger when the top of the container reaches the bottom
          end: "top center",
          scrub: true,
          markers: false, // Set to true to see debug markers
        },
      },
    );
  }, []);

  return (
    <>
      <div>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </div>

      <div className="w-full flex">
        <p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          Following projects highlight my skills through real-world applications.
          Each project can be accessed with a click and demonstrates my ability
          to build websites, work with various technologies, and manage projects
          efficiently.
        </p>
      </div>

      <div className="works-container mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5">
        {projects.map((project, index) => (
          <div key={`project-${index}`} className="project-card">
            <ProjectCard index={index} {...project} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
