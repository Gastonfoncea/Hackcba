"use client";

import { useEffect, useState } from "react";

// Fecha objetivo del evento (placeholder). Arranca Vie 12 SEP 2026, 18:00 ART.
const TARGET = new Date("2026-09-12T18:00:00-03:00").getTime();

type T = { d: number; h: number; m: number; s: number };

function diff(): T {
  const now = Date.now();
  let delta = Math.max(0, Math.floor((TARGET - now) / 1000));
  const d = Math.floor(delta / 86400);
  delta -= d * 86400;
  const h = Math.floor(delta / 3600);
  delta -= h * 3600;
  const m = Math.floor(delta / 60);
  const s = delta - m * 60;
  return { d, h, m, s };
}

const pad = (n: number, len = 2) => String(n).padStart(len, "0");

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-5xl font-bold leading-none tracking-tight tabular-nums sm:text-6xl md:text-7xl">
        {value}
      </span>
      <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [t, setT] = useState<T | null>(null);

  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  // Placeholder estable para evitar mismatch de hidratación.
  const v = t ?? { d: 0, h: 0, m: 0, s: 0 };

  return (
    <div
      className="flex items-end gap-5 sm:gap-8"
      role="timer"
      aria-label="Cuenta regresiva para el inicio"
    >
      <Unit value={pad(v.d, 3)} label="Días" />
      <span className="pb-9 font-display text-4xl font-bold text-muted md:text-5xl">
        :
      </span>
      <Unit value={pad(v.h)} label="Horas" />
      <span className="pb-9 font-display text-4xl font-bold text-muted md:text-5xl">
        :
      </span>
      <Unit value={pad(v.m)} label="Min" />
      <span className="pb-9 font-display text-4xl font-bold text-muted md:text-5xl">
        :
      </span>
      <Unit value={pad(v.s)} label="Seg" />
    </div>
  );
}
