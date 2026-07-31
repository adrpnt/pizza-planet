import { useState } from "react";

interface Star {
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

const STAR_COUNT = 100;

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() < 0.15 ? 2.4 : 1.2,
    delay: Math.random() * 6,
    duration: 3 + Math.random() * 4,
  }));
}

export function IllustratedLoginPanel() {
  const [stars] = useState<Star[]>(() => generateStars(STAR_COUNT));

  return (
    <div className="relative hidden lg:flex lg:w-[46%] overflow-hidden bg-[#070B18] border-r border-white/5">
      {/* starfield */}
      <div className="absolute inset-0" aria-hidden="true">
        {stars.map((s, i) => (
          <span
            key={i}
            className="ppl-star absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_45%,rgba(76,201,240,0.16),transparent_55%)]" />

      {/* orbit signature illustration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-105 h-105"
        aria-hidden="true"
      >
        <div className="ppl-orbit-spin-slow absolute inset-0 rounded-full border border-dashed border-[#4CC9F0]/25" />
        <div className="absolute inset-9 rounded-full border border-[#4CC9F0]/15" />

        {/* planet */}
        <div className="ppl-drift absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#0F1830] border border-[#4CC9F0]/40 shadow-[0_0_60px_-8px_rgba(76,201,240,0.5)] flex items-center justify-center overflow-visible">
          <div className="absolute w-full h-full rounded-full overflow-hidden">
            <span className="absolute top-6 left-8 w-3 h-3 rounded-full bg-[#4CC9F0]/30" />
            <span className="absolute top-16 left-5 w-2 h-2 rounded-full bg-[#4CC9F0]/25" />
            <span className="absolute top-20 left-20 w-4 h-4 rounded-full bg-[#4CC9F0]/20" />
            <span className="absolute top-8 left-20 w-2 h-2 rounded-full bg-[#FF6B4A]/40" />
          </div>
          <div className="w-14 h-14 rounded-full border border-[#4CC9F0]/50" />
          {/* thin ring crossing the planet */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-16 border border-[#4CC9F0]/50 rounded-[100%] -rotate-12" />
        </div>

        {/* orbiting satellite */}
        <div className="ppl-orbit-spin absolute inset-0">
          <div className="ppl-satellite-counter absolute top-0 left-1/2 -translate-x-1/2">
            <div className="w-3 h-3 rounded-full bg-[#FF6B4A] shadow-[0_0_12px_2px_rgba(255,107,74,0.7)]" />
          </div>
        </div>
      </div>

      {/* copy */}
      <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
        <p className="ppl-mono text-[11px] tracking-[0.25em] text-[#4CC9F0]/70 uppercase mb-4">
          Orbital delivery network
        </p>
        <h1 className="ppl-display text-4xl font-bold text-white leading-tight mb-3">
          Fuel up
          <br />
          before launch.
        </h1>
        <p className="ppl-body text-[#7C89A8] text-sm max-w-sm leading-relaxed">
          Sign in to track your order, save your favorite toppings, and get hot
          pizza delivered from the nearest station.
        </p>
      </div>
    </div>
  );
}
