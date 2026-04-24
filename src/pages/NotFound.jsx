import { useEffect, useState, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

.p404-root {
  width: 100vw;
  height: 100vh;
  background: #020510;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
  position: relative;
}

.p404-root::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
}
.blob-1 {
  width: 420px; height: 420px;
  background: rgba(100,50,200,0.18);
  top: -100px; right: -80px;
  animation: d1 14s ease-in-out infinite alternate;
}
.blob-2 {
  width: 300px; height: 300px;
  background: rgba(30,100,220,0.15);
  bottom: -80px; left: -60px;
  animation: d2 18s ease-in-out infinite alternate;
}
.blob-3 {
  width: 220px; height: 220px;
  background: rgba(200,80,50,0.1);
  bottom: 18%; right: 8%;
  animation: d1 12s ease-in-out 4s infinite alternate;
}
@keyframes d1 {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(30px,40px) scale(1.06); }
}
@keyframes d2 {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(-20px,-30px) scale(1.08); }
}

.card {
  position: relative;
  border-radius: 24px;
  padding: 56px 64px 52px;
  max-width: 520px;
  width: calc(100% - 2rem);
  text-align: center;
  animation: cin 0.7s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes cin {
  from { opacity:0; transform:translateY(28px) scale(0.97); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}

.illus {
  width: 120px; height: 132px;
  margin: 0 auto 16px;
  padding-top: 16px;
  position: relative;
}
.illus-circle {
  width: 120px; height: 120px;
  border-radius: 50%;
  background: rgba(127,119,221,0.15);
  border: 1px solid rgba(127,119,221,0.25);
  display: flex; align-items: center; justify-content: center;
  animation: bob 4s ease-in-out infinite;
}
@keyframes bob {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-9px); }
}
.illus-shadow {
  position: absolute;
  bottom: -15px; left: 50%;
  transform: translateX(-50%);
  width: 65px; height: 9px;
  border-radius: 50%;
  background: rgba(127,119,221,0.2);
  animation: sp 4s ease-in-out infinite;
}
@keyframes sp {
  0%,100% { width:65px; opacity:0.6; }
  50%      { width:44px; opacity:0.15; }
}

.num {
  font-family: 'DM Serif Display', serif;
  font-size: 96px;
  line-height: 1;
  color: #ffffff;
  letter-spacing: -4px;
  margin-bottom: 8px;
  animation: fu 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both;
}
.divider {
  width: 40px; height: 2px;
  background: rgba(127,119,221,0.6);
  border-radius: 2px;
  margin: 0 auto 20px;
  animation: fu 0.6s ease 0.3s both;
}
.headline {
  font-size: 21px; font-weight: 500;
  color: #ffffff;
  margin-bottom: 10px;
  animation: fu 0.6s ease 0.35s both;
}
.subline {
  font-size: 15px;
  color: rgba(180,210,255,0.55);
  line-height: 1.65; margin-bottom: 36px;
  font-weight: 300;
  animation: fu 0.6s ease 0.4s both;
}
@keyframes fu {
  from { opacity:0; transform:translateY(10px); }
  to   { opacity:1; transform:translateY(0); }
}

.btn-row {
  display: flex; gap: 12px;
  justify-content: center; flex-wrap: wrap;
  animation: fu 0.6s ease 0.5s both;
}
.btn-primary {
  background: rgba(127,119,221,0.9);
  color: #fff;
  border: none; border-radius: 10px;
  padding: 12px 28px; font-size: 14px;
  font-family: 'DM Sans', sans-serif; font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  letter-spacing: 0.2px;
}
.btn-primary:hover { background: rgba(127,119,221,1); transform: translateY(-1px); }
.btn-primary:active { transform: scale(0.97); }

.btn-ghost {
  background: transparent;
  color: rgba(180,210,255,0.7);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 10px;
  padding: 12px 28px; font-size: 14px;
  font-family: 'DM Sans', sans-serif; font-weight: 400;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, transform 0.15s;
  letter-spacing: 0.2px;
}
.btn-ghost:hover { border-color: rgba(255,255,255,0.35); color: #fff; transform: translateY(-1px); }
.btn-ghost:active { transform: scale(0.97); }

.badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(226,75,74,0.15);
  color: #f09595;
  font-size: 11px; font-weight: 500;
  padding: 3px 10px; border-radius: 20px;
  margin-bottom: 24px; letter-spacing: 0.5px;
  border: 1px solid rgba(226,75,74,0.25);
  animation: fu 0.5s ease 0.2s both;
}
.badge-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: #e24b4a;
  animation: bl 1.4s ease-in-out infinite;
}
@keyframes bl {
  0%,100% { opacity:1; }
  50%      { opacity:0.2; }
}
`;

const BrokenLinkIcon = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 32L32 20" stroke="#7F77DD" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M16 28l-4 4a8 8 0 0 0 11.31 11.31l4-4" stroke="#7F77DD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36 24l4-4A8 8 0 0 0 28.69 8.69l-4 4" stroke="#AFA9EC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 14v-4M14 24h-4M38 38v4M28 38h4" stroke="#AFA9EC" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

export default function NotFound404() {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let n = 0;
    const target = 404;
    const step = Math.ceil(target / 28);
    ref.current = setInterval(() => {
      n += step;
      if (n >= target) { setCount(target); clearInterval(ref.current); }
      else setCount(n);
    }, 28);
    return () => clearInterval(ref.current);
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="p404-root">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="card">
          <div className="illus">
            <div className="illus-circle">
              <BrokenLinkIcon />
            </div>
            <div className="illus-shadow" />
          </div>
          <div className="num">{count}</div>
          <div className="divider" />
          <p className="headline">Oops, this page doesn't exist</p>
          <p className="subline">
            The page you're looking for may have been moved,<br />
            deleted, or never existed in the first place.
          </p>
          <div className="btn-row">
            <button className="btn-primary" onClick={() => window.location.href = '/'}>Go home</button>
            <button className="btn-ghost" onClick={() => window.history.back()}>Go back</button>
          </div>
        </div>
      </div>
    </>
  );
}