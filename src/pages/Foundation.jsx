import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const routes = [
    {
      name: "Basics of Patterns",
      path: "/foundation/basics-of-patterns",
      lesson: "01",
      icon: "⬡",
      desc: "Learn the foundational concepts behind pattern logic and structure in C programs.",
      meta: "FOUNDATION · INTRO",
      color: "purple",
    },
    {
      name: "Pattern Board",
      path: "/foundation/pattern-board",
      lesson: "02",
      icon: "▦",
      desc: "Visualize and practice building patterns interactively on the board.",
      meta: "FOUNDATION · PRACTICE",
      color: "teal",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Animated grid canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let scanY = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = "rgba(83,74,183,0.07)";
      ctx.lineWidth = 1;
      const step = 32;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Scanline
      const grad = ctx.createLinearGradient(0, scanY - 2, canvas.width, scanY + 2);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, "rgba(83,74,183,0.35)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 2, canvas.width, 4);

      scanY += 1.2;
      if (scanY > canvas.height) scanY = 0;

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const colorMap = {
    purple: {
      badge: "bg-[#EEEDFE] text-[#534AB7]",
      icon: "bg-[#EEEDFE] text-[#534AB7]",
      glow: "radial-gradient(ellipse at 30% 30%, rgba(83,74,183,0.10), transparent 70%)",
      arrow: "group-hover:text-[#534AB7]",
      dot: "bg-[#534AB7]",
      border: "group-hover:border-[#AFA9EC]",
    },
    teal: {
      badge: "bg-[#E1F5EE] text-[#0F6E56]",
      icon: "bg-[#E1F5EE] text-[#0F6E56]",
      glow: "radial-gradient(ellipse at 70% 30%, rgba(13,158,117,0.10), transparent 70%)",
      arrow: "group-hover:text-[#0F6E56]",
      dot: "bg-[#1D9E75]",
      border: "group-hover:border-[#5DCAA5]",
    },
  };

  return (
    <div className="relative min-h-screen bg-hero-pattern overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <p
            className="text-xs font-mono tracking-[3px] uppercase text-gray-400 mb-2"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            foundation module
          </p>
          <h1
            className="text-4xl font-extrabold tracking-tight text--white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            C Program Basics
          </h1>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="inline-block w-8 h-[1px] bg-gray-300" />
            <span
              className="text-[11px] font-mono text-gray-400 tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              select a module
            </span>
            <span className="inline-block w-8 h-[1px] bg-gray-300" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-2 max-w-3xl w-full">
          {routes.map((route, index) => {
            const c = colorMap[route.color];
            const isHovered = hoveredIndex === index;

            return (
              <Link
                key={index}
                to={route.path}
                className={`group relative bg-white rounded-2xl border border-gray-200 p-6 overflow-hidden transition-all duration-300 ${c.border}
                  hover:-translate-y-1 hover:shadow-xl
                  `}
                style={{
                  animationDelay: `${index * 0.12}s`,
                  animation: "cardIn 0.5s ease both",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glow overlay */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                  style={{
                    background: route.color === "purple"
                      ? "radial-gradient(ellipse at 30% 30%, rgba(83,74,183,0.09), transparent 70%)"
                      : "radial-gradient(ellipse at 70% 30%, rgba(13,158,117,0.09), transparent 70%)",
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* Corner accent dots */}
                <span
                  className={`absolute top-2 left-2 w-[5px] h-[5px] rounded-full ${c.dot} transition-opacity duration-200`}
                  style={{ opacity: isHovered ? 1 : 0 }}
                />
                <span
                  className={`absolute bottom-2 right-2 w-[5px] h-[5px] rounded-full ${c.dot} transition-opacity duration-200`}
                  style={{ opacity: isHovered ? 1 : 0 }}
                />

                {/* Card header */}
                <div className="flex items-start justify-between mb-4 relative">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${c.icon} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    {route.icon}
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide ${c.badge}`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    LESSON {route.lesson}
                  </span>
                </div>

                {/* Text */}
                <h2
                  className="text-base font-bold text-gray-900 mb-1 relative"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {route.name}
                </h2>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed relative">
                  {route.desc}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3 relative">
                  <span
                    className="text-[10px] text-gray-400 tracking-wide"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {route.meta}
                  </span>
                  <span
                    className={`text-sm text-gray-400 transition-all duration-200 group-hover:translate-x-1 ${c.arrow}`}
                  >
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Status bar */}
        <div className="mt-8 flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full bg-emerald-500 animate-pulse" />
          <span
            className="text-[11px] text-gray-400 tracking-widest uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            2 modules ready
          </span>
        </div>
      </div>

      {/* Keyframe styles injected via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Syne:wght@400;700;800&display=swap');

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease both;
        }
      `}</style>
    </div>
  );
}