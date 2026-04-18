"use client";

import { useState, useEffect } from "react";

const PatternBasics = () => {
  const text1 = "Thank you for visiting";
  const text2 = "We will update soon";

  const [displayText1, setDisplayText1] = useState("");
  const [displayText2, setDisplayText2] = useState("");
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

  // First line typing
  useEffect(() => {
    if (index1 < text1.length) {
      const timeout = setTimeout(() => {
        setDisplayText1((prev) => prev + text1[index1]);
        setIndex1(index1 + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [index1]);

  // Second line typing (starts after first finishes)
  useEffect(() => {
    if (index1 === text1.length && index2 < text2.length) {
      const timeout = setTimeout(() => {
        setDisplayText2((prev) => prev + text2[index2]);
        setIndex2(index2 + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [index1, index2]);

  return (
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <div className="text-white min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold uppercase text-center">
            {displayText1}
          </h1>
          <h2 className="text-2xl font-bold uppercase text-center mt-2">
            {displayText2}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PatternBasics;