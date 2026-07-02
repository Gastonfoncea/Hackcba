"use client";

/* ===============================================================
   Fondo atmosférico — terminal viva (log stream tipo Mr. Robot)
   Output de recon/pentest "hackeando HACKCBA" scrolleando lento.
   Va MUY tenue y detrás: es ambiente, no contenido. El centro se
   oscurece para que el hero (título, countdown, CTA) mande.
================================================================ */

import { useEffect, useRef, useState } from "react";

const rhex = (n: number) =>
  Array.from({ length: n }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0"),
  ).join(" ");

const rip = () =>
  `${10 + (Math.random() * 240) | 0}.${(Math.random() * 256) | 0}.${
    (Math.random() * 256) | 0
  }.${(Math.random() * 256) | 0}`;

/* Sesión coherente: recon -> acceso -> deploy. Loopea. */
const SCRIPT: Array<() => string> = [
  () => "$ nmap -sV --open hackcba.dev",
  () => "Starting Nmap 7.94 ( https://nmap.org )",
  () => `Nmap scan report for hackcba.dev (${rip()})`,
  () => `Host is up (0.00${(Math.random() * 90 + 9) | 0}s latency).`,
  () => "PORT      STATE  SERVICE    VERSION",
  () => "22/tcp    open   ssh        OpenSSH 9.6",
  () => "443/tcp   open   https      nginx 1.27",
  () => "1337/tcp  open   waste      hackcba-core",
  () => `[+] ${(Math.random() * 40 + 60) | 0} hackers online`,
  () => "$ ssh hacker@hackcba.dev",
  () => "[*] establishing secure channel ........... [OK]",
  () => "[*] payload -> build_the_future.sh",
  () => `[*] cracking registration token... ${(Math.random() * 100) | 0}%`,
  () => `0x00${rhex(1)}  ${rhex(8)}  |HACK CBA|`,
  () => `0x00${rhex(1)}  ${rhex(8)}  |17.07.26|`,
  () => "[+] ACCESS GRANTED",
  () => "> mounting /dev/cordoba ... done",
  () => "> 24h : 100 hackers : 1 demo",
  () => "> kernel: deploying ideas to prod",
  () => 'git commit -m "ship it" && git push --force',
  () => "sudo make coffee --infinite",
  () => "[!] WARNING: too much fun detected",
  () => "[*] 18-19 JUL 2026 @ Casa Naranja X · Córdoba",
  () => "> build. break. ship._",
  () => "",
];

// Ritmo del stream: sweet spot legible. Antes iba a 130ms (frenético); a
// ~300ms se lee como una terminal viva pero tranquila, sin marear.
const STEP_MS = 300;
const MAX_LINES = 42;

export default function TerminalBackground() {
  // Cantidad de filas FIJA (arrancan vacías). Así el DOM nunca cambia de
  // tamaño y el browser no dispara scroll anchoring (el salto al scrollear).
  // Un único stream, anclado a la izquierda.
  const [linesL, setLinesL] = useState<string[]>(() =>
    Array(MAX_LINES).fill(""),
  );
  const ptrL = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const snapshot = SCRIPT.map((fn) => fn());
      setLinesL(
        Array.from(
          { length: MAX_LINES },
          (_, i) => snapshot[i % snapshot.length],
        ),
      );
      return;
    }
    const id = setInterval(() => {
      setLinesL((prev) => {
        const next = [...prev.slice(1), SCRIPT[ptrL.current % SCRIPT.length]()];
        ptrL.current++;
        return next;
      });
    }, STEP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden [overflow-anchor:none]"
    >
      {/* stream de líneas: cantidad fija, solo cambia el texto */}
      <div className="absolute inset-y-0 left-0 flex w-full flex-col justify-end px-4 pb-6 font-mono text-[11px] leading-[1.55] text-paper/45 [overflow-anchor:none] sm:text-xs lg:w-1/2">
        {linesL.map((l, i) => (
          <div key={i} className="truncate whitespace-nowrap">
            {l || " "}
          </div>
        ))}
      </div>

      {/* viñeta: oscurece el centro para que el hero mande */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 75% at 50% 45%, rgb(5 5 5 / 0.9) 20%, rgb(5 5 5 / 0.45) 48%, transparent 78%)",
        }}
      />
      {/* fade arriba/abajo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #050505 0%, transparent 18%, transparent 82%, #050505 100%)",
        }}
      />
      {/* scanlines CRT muy sutiles */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent 0px, transparent 2px, rgb(0 0 0 / 0.25) 3px)",
        }}
      />
    </div>
  );
}
