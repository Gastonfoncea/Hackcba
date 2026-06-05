"use client";

import { useEffect, useState } from "react";

const CMD = "hackcba";

// Ritmo (ms). Un flash de personalidad, no un gate. ~1.3s total.
const CURSOR_ONLY = 480; // 1: el cursor parpadea una vez
const CHAR_MS = 75; // 2: tipeo de hackcba, letra por letra
const HOLD = 320; // beat final antes del corte

export default function IntroOverlay() {
  const [typed, setTyped] = useState("");
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let seen = false;
    try {
      seen = localStorage.getItem("hackcba-intro") === "1";
    } catch {}

    if (reduce || seen) {
      setGone(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let skipped = false;

    const cut = () => {
      try {
        localStorage.setItem("hackcba-intro", "1");
      } catch {}
      setGone(true); // corte seco: sin transición, la pantalla se limpia
    };

    const skip = () => {
      if (skipped) return;
      skipped = true;
      timers.forEach(clearTimeout);
      cut();
    };

    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    let i = 0;
    const type = () => {
      if (skipped) return;
      i += 1;
      setTyped(CMD.slice(0, i));
      if (i < CMD.length) {
        timers.push(setTimeout(type, CHAR_MS));
      } else {
        timers.push(setTimeout(cut, HOLD));
      }
    };
    // 1: el cursor parpadea solo, después arranca el tipeo
    timers.push(setTimeout(type, CURSOR_ONLY));

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-paper px-6"
    >
      <div className="flex items-center font-mono text-lg md:text-xl">
        <span className="text-ink">{typed}</span>
        {/* Cursor de bloque, parpadeo duro (steps) */}
        <span className="cursor-blink ml-0.5 inline-block h-[1.15em] w-[0.55em] bg-ink align-middle" />
      </div>
    </div>
  );
}
