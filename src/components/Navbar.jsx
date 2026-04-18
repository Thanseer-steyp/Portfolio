import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [toggle]);
  useEffect(() => {
    const sections = navLinks
      .filter((nav) => nav.type !== "route") // only section links
      .map((nav) => document.getElementById(nav.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;

            const matched = navLinks.find((nav) => nav.id === id);
            if (matched) {
              setActive(matched.title);
            }
          }
        });
      },
      {
        threshold: 0.6, // how much visible to trigger
      },
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "backdrop-blur-md" : "bg-transparent"
        //bg-primary
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-14 h-14 object-contain" />
          {/* <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Thanseer &nbsp;
          </p> */}
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) =>
            nav.type === "route" ? (
              <Link
                key={nav.id}
                to={nav.path}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                {nav.title}
              </Link>
            ) : (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                <a
                  href={`#${nav.id}`}
                  onClick={(e) => {
                    e.preventDefault();

                    if (location.pathname !== "/") {
                      // Go to home first
                      navigate("/");

                      // Wait for page render then scroll
                      setTimeout(() => {
                        const section = document.getElementById(nav.id);
                        if (section) {
                          section.scrollIntoView({ behavior: "smooth" });
                        }
                      }, 100);
                    } else {
                      // Already on home → just scroll
                      const section = document.getElementById(nav.id);
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }

                    setActive(nav.title);
                  }}
                >
                  {nav.title}
                </a>
              </li>
            ),
          )}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain z-40"
            onClick={() => setToggle(!toggle)}
          />

          {/* 🔥 Overlay */}
          {toggle && (
            <div
              className="fixed inset-0 bg-black/30 z-20"
              onClick={() => setToggle(false)}
            />
          )}

          {/* 🔥 Drawer */}
          <div
            className={`fixed top-0 right-0 h-screen w-[70%] z-30 transform transition-transform duration-300 ${
              toggle ? "translate-x-0" : "translate-x-full"
            } backdrop-blur-md bg-white/10 border-l border-white/20`}
          >
            <div className="p-6 flex flex-col gap-6 mt-16">
              {navLinks.map((nav) =>
                nav.type === "route" ? (
                  <Link
                    key={nav.id}
                    to={nav.path}
                    className={`text-[16px] font-medium rounded-lg text-center p-1.5 backdrop-blur-sm transform transition-all duration-300 ${
                      active === nav.title
                        ? "text-white -translate-x-3"
                        : "text-gray-400"
                    } hover:scale-105`}
                    onClick={() => {
                      setToggle(false);
                      setActive(nav.title);
                    }}
                  >
                    {nav.title}
                  </Link>
                ) : (
                  <a
                    key={nav.id}
                    href={`#${nav.id}`}
                    className={`text-[16px] font-medium rounded-lg text-center p-1.5 backdrop-blur-sm transform transition-all duration-300 ${
                      active === nav.title
                        ? "text-white -translate-x-3"
                        : "text-gray-400"
                    } hover:scale-105`}
                    onClick={(e) => {
                      e.preventDefault(); // 🔥 important

                      const section = document.getElementById(nav.id);
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }

                      setToggle(false);
                      setActive(nav.title);
                    }}
                  >
                    {nav.title}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
