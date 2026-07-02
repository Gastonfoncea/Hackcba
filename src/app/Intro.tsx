"use client";

/* ===============================================================
   Intro v2 — tipea "hackcba" en el centro y avisa al terminar (onDone).
   Sin persistencia por ahora: replay en cada load (para iterar la anim).
   Skip con click o tecla. Respeta prefers-reduced-motion.
================================================================ */

import { useEffect, useRef, useState } from "react";

const CMD = "hackcba";
const CURSOR_ONLY = 460; // el cursor parpadea una vez antes de tipear
const CHAR_MS = 78; // velocidad de tipeo
const HOLD = 360; // beat final antes de soltar la landing

export default function Intro({ onDone }: { onDone: () => void }) {
  const [typed, setTyped] = useState("");
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setGone(true);
      doneRef.current();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let skipped = false;

    const finish = () => {
      setGone(true);
      doneRef.current();
    };
    const skip = () => {
      if (skipped) return;
      skipped = true;
      timers.forEach(clearTimeout);
      finish();
    };

    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    let i = 0;
    const type = () => {
      if (skipped) return;
      i += 1;
      setTyped(CMD.slice(0, i));
      if (i < CMD.length) timers.push(setTimeout(type, CHAR_MS));
      else timers.push(setTimeout(finish, HOLD));
    };
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
      aria-hidden
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050505] px-6"
    >
      <div className="flex items-center font-mono text-lg text-[#f4efe6] md:text-xl">
        <span className="text-[#8a8a8a]">&gt;&nbsp;</span>
        <span>{typed}</span>
        <span className="cursor-blink ml-0.5 inline-block h-[1.15em] w-[0.55em] bg-[#f4efe6] align-middle" />
      </div>
    </div>
  );
}
