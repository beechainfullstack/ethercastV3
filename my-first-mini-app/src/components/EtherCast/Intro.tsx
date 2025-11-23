"use client";

import { useEffect, useState } from "react";

const BASE_TEXT = "Invoke Beauty Upon Us";

function makeGlitchText(length: number) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%&";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export const EtherCastIntro = () => {
  const [displayText, setDisplayText] = useState(BASE_TEXT);

  useEffect(() => {
    // Every ~12 seconds, briefly glitch the heading then restore
    const interval = setInterval(() => {
      const length = BASE_TEXT.length;
      setDisplayText(makeGlitchText(length));
      const timeout = setTimeout(() => {
        setDisplayText(BASE_TEXT);
      }, 220); // quick blink
      return () => clearTimeout(timeout);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-2 w-full max-w-md text-left">
      <h1 className="mb-1 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500 transition-colors duration-200">
        {displayText}
      </h1>
      <p className="text-sm text-zinc-400">
        Inscribe your affirmation to manifest in reality.
      </p>
    </section>
  );
};
