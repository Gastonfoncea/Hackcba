"use client";

/* ===============================================================
   HACKCBA — v2 (centrado · fondo terminal viva · actitud builder)
   Flujo: Intro tipea "hackcba" → el hero BOOTEA (lock-in + cascada +
   power-on del countdown). Debajo: secciones en el mismo lenguaje.
   Accent (B&W por ahora) en --accent (.v2 en globals.css).

   VOZ DEL COPY — "entusiasta concreto":
   voseo · castellano · promesas como escenas verificables (nada de
   adjetivos huecos) · spanglish solo en términos de cultura (Demo
   Day, freeze, pitch) · inglés permitido como flavor decorativo,
   nunca en frases completas del copy principal.
================================================================ */

import { useEffect, useRef, useState, type ReactNode } from "react";
import TerminalBackground from "./TerminalBackground";
import Intro from "./Intro";

const EVENT = {
  dates: "18 — 19 JUL 2026",
  venue: "Casa Naranja X · Córdoba",
  mapsUrl: "https://maps.app.goo.gl/aJhbPkNnLkureMWb7",
  registerUrl: "#registro",
};

/* Sponsors. Logos en blanco (public/sponsors). Wallbit: logo pendiente -> nombre. */
type Sponsor = { name: string; role?: string; logo?: string };
const SPONSORS: Sponsor[] = [
  { name: "Córdoba Cluster", logo: "/sponsors/cordoba-cluster.png" },
  { name: "Cursor", logo: "/sponsors/cursor.svg" },
  { name: "Supabase", logo: "/sponsors/supabase.svg" },
  { name: "Naranja X", role: "Anfitrión", logo: "/sponsors/naranja-x.webp" },
  { name: "BTC Argentina", logo: "/sponsors/btc-argentina.png" },
  { name: "Hedera", logo: "/sponsors/hedera.svg" },
  { name: "Wallbit", logo: "/sponsors/Wallbit-logo.png" },
  { name: "Paisanos", logo: "/sponsors/paisanos.png" },
];

/* Cronograma (horarios tentativos). Fases del deck, agrupadas por día. */
const SCHEDULE = [
  {
    day: "Día 01",
    date: "Sáb 18",
    items: [
      {
        time: "10:00",
        title: "Apertura",
        desc: "Se presentan los desafíos de cada track y armás tu equipo ahí mismo.",
      },
      {
        time: "12:00",
        title: "Workshops & charlas",
        desc: "Talleres cortos de las herramientas que vas a usar esa misma noche.",
      },
      {
        time: "14:00",
        title: "Arranca el building",
        desc: "Empieza a correr el reloj: de acá al freeze hay 24 horas para llegar a la demo.",
      },
      {
        time: "00:00",
        title: "Hacking nocturno",
        desc: "Café infinito. El reloj no para.",
      },
    ],
  },
  {
    day: "Día 02",
    date: "Dom 19",
    items: [
      {
        time: "14:00",
        title: "Freeze & Demo Day",
        desc: "Código congelado: cada equipo pitchea su demo frente al jurado.",
      },
      {
        time: "16:00",
        title: "Cierre",
        desc: "Ganadores, feedback del jurado y la última ronda de networking.",
      },
    ],
  },
];

/* Tres tracks reales (deck). */
const TRACKS = [
  {
    id: "01",
    title: "AgroTech",
    desc: "Tecnología para el campo argentino.",
    tags: ["IA aplicada al agro", "Innovación productiva", "Monitoreo y automatización"],
  },
  {
    id: "02",
    title: "Agentes IA",
    desc: "IA que ejecuta, no solo responde.",
    tags: ["Agentes autónomos", "Herramientas para empresas", "Automatización"],
  },
  {
    id: "03",
    title: "Blockchain y Web3",
    desc: "Infraestructura y finanzas on-chain.",
    tags: ["Finanzas descentralizadas", "Smart contracts", "Pagos y activos digitales"],
  },
];

/* --------------------------- countdown --------------------------- */

const TARGET = new Date("2026-07-18T10:00:00-03:00").getTime();
const pad = (n: number) => String(n).padStart(2, "0");
const r2 = () => (Math.random() * 100) | 0;

function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      let delta = Math.max(0, Math.floor((TARGET - Date.now()) / 1000));
      const d = Math.floor(delta / 86400);
      delta -= d * 86400;
      const h = Math.floor(delta / 3600);
      delta -= h * 3600;
      const m = Math.floor(delta / 60);
      setT({ d, h, m, s: delta - m * 60 });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-2xl font-bold leading-none tabular-nums text-paper sm:text-4xl">
        {pad(value)}
      </span>
      <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
        {label}
      </span>
    </div>
  );
}

function Sep() {
  return (
    <span className="self-start pt-0.5 font-display text-xl font-bold text-muted/60 sm:text-3xl">
      :
    </span>
  );
}

/* ---------------- boot-on-scroll: la sección "imprime" al entrar --------- */

/* Dispara una sola vez cuando el elemento entra al viewport */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* Bloque que entra con rise-in la primera vez que aparece en viewport */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${className} ${inView ? "rise-in" : "opacity-0"}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

/* Encabezado de sección, estilo terminal: // 01 · LABEL ─────────
   Al entrar en viewport, el label se tipea y la línea se dibuja en pasos. */
function SectionLabel({ index, label }: { index: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [chars, setChars] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setChars(label.length);
      return;
    }
    setTyping(true);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setChars(i);
      if (i >= label.length) {
        clearInterval(id);
        setTimeout(() => setTyping(false), 420);
      }
    }, 42);
    return () => clearInterval(id);
  }, [inView, label]);

  return (
    <div
      ref={ref}
      className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
    >
      <span className={`text-paper ${inView ? "" : "opacity-0"}`}>
        // {index}
      </span>
      <span className="whitespace-pre">
        {label.slice(0, chars)}
        {typing ? (
          <span className="cursor-blink ml-0.5 inline-block h-[1.3em] w-[0.5em] translate-y-[0.3em] bg-muted" />
        ) : null}
      </span>
      <span className={`line-draw h-px flex-1 bg-white/10 ${inView ? "on" : ""}`} />
    </div>
  );
}

/* Celda de stat: al entrar en viewport, el número sube a saltos (stepped) */
function Stat({
  value,
  unit,
  label,
}: {
  value: string;
  unit?: string;
  label: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [display, setDisplay] = useState("0".padStart(value.length, "0"));

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const target = parseInt(value, 10);
    if (reduce || Number.isNaN(target)) {
      setDisplay(value);
      return;
    }
    const steps = 12;
    let k = 0;
    const id = setInterval(() => {
      k += 1;
      setDisplay(
        String(Math.round((target * k) / steps)).padStart(value.length, "0"),
      );
      if (k >= steps) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="relative border border-white/10 bg-white/[0.02] px-3 py-6 text-center sm:py-8"
    >
      <div className="font-display text-3xl font-bold tabular-nums text-paper sm:text-5xl">
        {display}
        {unit ? <span className="ml-0.5 text-lg text-muted sm:text-2xl">{unit}</span> : null}
      </div>
      <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
        {label}
      </div>
    </div>
  );
}

/* Card de track: id + título + descripción + tags de los sub-ejes */
function Track({
  id,
  title,
  desc,
  tags,
}: {
  id: string;
  title: string;
  desc: string;
  tags: string[];
}) {
  return (
    <div className="group relative flex flex-col border border-white/10 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04] sm:p-7">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        {id}
      </span>
      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-paper">
        {title}
      </h3>
      <p className="mt-2 font-mono text-xs leading-relaxed text-muted">{desc}</p>
      <ul className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-5">
        {tags.map((tag) => (
          <li
            key={tag}
            className="flex items-center gap-2 font-mono text-[11px] text-paper/80"
          >
            <span className="text-muted">›</span>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Slot de sponsor: caja sharp normalizada. Logo en blanco (object-contain),
   con fallback al nombre si todavía no hay logo. Se aclara en hover. */
function SponsorSlot({
  name,
  role,
  logo,
}: {
  name: string;
  role?: string;
  logo?: string;
}) {
  return (
    <div className="group relative flex aspect-[5/2] flex-col items-center justify-center gap-1.5 border border-white/10 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]">
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={name}
          loading="lazy"
          className="max-h-10 w-auto max-w-[82%] object-contain opacity-90 transition-opacity duration-200 group-hover:opacity-100 sm:max-h-12"
        />
      ) : (
        <span className="font-display text-lg font-bold tracking-tight text-paper/75 sm:text-2xl">
          {name}
        </span>
      )}
      {role ? (
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
          {role}
        </span>
      ) : null}
    </div>
  );
}

/* Countdown con power-on: al bootear, los dígitos scramblean y se asientan. */
function Countdown({ booted }: { booted: boolean }) {
  const t = useCountdown();
  const [powering, setPowering] = useState(true);
  const [rnd, setRnd] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (!booted) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setPowering(false);
      return;
    }
    setPowering(true);
    const id = setInterval(
      () => setRnd({ d: r2(), h: r2(), m: r2(), s: r2() }),
      55,
    );
    const stop = setTimeout(() => {
      clearInterval(id);
      setPowering(false);
    }, 620);
    return () => {
      clearInterval(id);
      clearTimeout(stop);
    };
  }, [booted]);

  const v = booted && powering ? rnd : t;

  return (
    <div
      className={`relative mt-10 inline-flex items-center gap-3 border border-white/10 bg-white/[0.04] px-7 py-5 backdrop-blur-md sm:gap-5 sm:px-9 ${
        booted ? "rise-in [animation-delay:0.26s]" : "opacity-0"
      }`}
      style={{ boxShadow: "inset 0 1px 0 0 rgb(255 255 255 / 0.07)" }}
    >
      <Unit value={v.d} label="Días" />
      <Sep />
      <Unit value={v.h} label="Hrs" />
      <Sep />
      <Unit value={v.m} label="Min" />
      <Sep />
      <Unit value={v.s} label="Seg" />
    </div>
  );
}

/* ------------------------------- page ---------------------------- */

export default function HeroV2() {
  const [booted, setBooted] = useState(false);
  const onDone = useRef(() => setBooted(true)).current;

  return (
    <main className="v2 relative bg-[#050505] text-paper">
      {/* Intro: tipea "hackcba", al terminar dispara el boot del hero */}
      <Intro onDone={onDone} />

      {/* ===================== HERO ===================== */}
      <section className="relative flex min-h-svh flex-col overflow-hidden">
        {/* Fondo: terminal viva, scopeada al hero */}
        <TerminalBackground />

        {/* NAV mínimo */}
        <header
          className={`relative z-10 flex items-center justify-between px-5 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:px-8 ${
            booted ? "rise-in" : "opacity-0"
          }`}
        >
          <span className="text-paper">
            Hackcba<span className="text-muted">/26</span>
          </span>
        </header>

        {/* Contenido del hero */}
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-10 text-center">
          {/* solo la fecha arriba del título */}
          <span
            className={`mb-7 font-mono text-[10px] uppercase tracking-[0.28em] text-muted ${
              booted ? "rise-in [animation-delay:0.12s]" : "opacity-0"
            }`}
          >
            {EVENT.dates}
          </span>

          {/* título: aterriza con lock-in glitch (no re-tipea) */}
          <h1
            data-text="HACKCBA"
            className={`glitch cursor-default select-none font-display text-[clamp(4rem,17vw,12rem)] font-bold leading-[0.9] tracking-[-0.045em] ${
              booted ? "lock-in" : "opacity-0"
            }`}
          >
            HACKCBA
          </h1>

          {/* terminal subtitle — qué es, en una línea */}
          <p
            className={`mt-5 font-mono text-sm text-muted sm:text-base ${
              booted ? "rise-in [animation-delay:0.2s]" : "opacity-0"
            }`}
          >
            <span style={{ color: "rgb(var(--accent))" }}>&gt;</span> 24 hs ·
            100 hackers · Casa Naranja X, Córdoba
            <span className="cursor-blink ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.1em] bg-[rgb(var(--accent))] align-middle" />
          </p>

          {/* Countdown — power-on al bootear */}
          <Countdown booted={booted} />

          {/* CTA — bloque blanco sólido, sharp, hover invierte a outline */}
          <a
            href={EVENT.registerUrl}
            className={`group mt-10 inline-flex items-center gap-3 border border-[rgb(var(--accent))] bg-[rgb(var(--accent))] px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-[#050505] transition-colors duration-150 hover:bg-transparent hover:text-[rgb(var(--accent))] ${
              booted ? "rise-in [animation-delay:0.34s]" : "opacity-0"
            }`}
          >
            Inscribite
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>

      {/* ===================== QUÉ ES ===================== */}
      <section
        id="que-es"
        className="relative border-t border-white/10 px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="mx-auto w-full max-w-5xl">
          <SectionLabel index="01" label="Qué es" />

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:items-center lg:gap-16">
            {/* pitch */}
            <Reveal>
              <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-paper sm:text-5xl">
                Tenés 24 horas.
                <br />
                Hacé que funcione.
              </h2>
              <p className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-muted sm:text-[15px]">
                Venís con una idea, te vas con un producto. 24 horas
                construyendo con 100 hackers, mentores en cada etapa, y el
                domingo tu demo corriendo frente al jurado. Lo que hagas es
                tuyo.
              </p>
            </Reveal>

            {/* stats */}
            <Reveal delay={0.12} className="grid grid-cols-3 gap-3">
              <Stat value="24" unit="hs" label="Sin parar" />
              <Stat value="100" label="Hackers" />
              <Stat value="03" label="Tracks" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== TRACKS ===================== */}
      <section
        id="tracks"
        className="relative border-t border-white/10 px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="mx-auto w-full max-w-5xl">
          <SectionLabel index="02" label="Tracks" />

          <Reveal className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-paper sm:text-5xl">
              Elegí tu track.
            </h2>
            <p className="max-w-sm font-mono text-sm leading-relaxed text-muted">
              Tres verticales con desafíos concretos que se presentan en la
              apertura. Elegí la tuya y construí sobre eso todo el finde.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
            {TRACKS.map((t) => (
              <Track
                key={t.id}
                id={t.id}
                title={t.title}
                desc={t.desc}
                tags={t.tags}
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ CRONOGRAMA (con cuándo & dónde de cabecera) ============ */}
      <section
        id="cronograma"
        className="relative border-t border-white/10 px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="mx-auto w-full max-w-3xl">
          <SectionLabel index="03" label="Cronograma" />

          <Reveal className="mt-10 flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-paper sm:text-5xl">
              24 horas, sin pausa.
            </h2>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Horarios tentativos
            </span>
          </Reveal>

          {/* barra cuándo & dónde */}
          <Reveal
            delay={0.1}
            className="relative mt-10 flex flex-col gap-4 border border-white/10 bg-white/[0.02] px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                Fecha
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-paper">
                {EVENT.dates}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                Sede
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-paper">
                Casa Naranja X · Córdoba
              </span>
            </div>
            <a
              href={EVENT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-paper underline-offset-4 hover:underline"
            >
              Ver en mapa →
            </a>
          </Reveal>

          {/* timeline agrupado por día */}
          <Reveal delay={0.16}>
          {SCHEDULE.map((d) => (
            <div key={d.day} className="mt-12">
              <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em]">
                <span className="text-paper">{d.day}</span>
                <span className="text-muted">{d.date}</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <ol className="mt-7 border-l border-white/15">
                {d.items.map((s) => (
                  <li
                    key={`${d.day}-${s.time}`}
                    className="relative pb-9 pl-8 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-1.5 h-2 w-2 -translate-x-1/2 bg-paper"
                    />
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                      {s.time}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-paper sm:text-xl">
                      {s.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-muted">
                      {s.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
          </Reveal>
        </div>
      </section>

      {/* ===================== SPONSORS ===================== */}
      <section
        id="sponsors"
        className="relative border-t border-white/10 px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="mx-auto w-full max-w-5xl">
          <SectionLabel index="04" label="Sponsors" />

          <Reveal className="mt-10">
            <p className="font-mono text-sm leading-relaxed text-muted">
              Hackcba pasa gracias a estas empresas.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SPONSORS.map((s) => (
              <SponsorSlot key={s.name} name={s.name} role={s.role} logo={s.logo} />
            ))}
          </Reveal>

          {/* captar más sponsors */}
          <Reveal delay={0.18}>
            <a
              href="#registro"
              className="group mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-paper"
            >
              ¿Querés que tu empresa esté acá?
              <span className="text-paper/70 transition-transform group-hover:translate-x-1">
                Sumate →
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ===================== REGISTRO (cierre) ===================== */}
      <section
        id="registro"
        className="relative border-t border-white/10 px-5 py-24 text-center sm:px-8 sm:py-32"
      >
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            {EVENT.dates} · Casa Naranja X
          </span>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[0.95] tracking-[-0.03em] text-paper sm:text-6xl">
            Nos vemos
            <br />
            el 18.
          </h2>
          <p className="mt-6 font-mono text-sm leading-relaxed text-muted">
            100 lugares. 24 horas. Una demo.
          </p>
          <a
            href={EVENT.registerUrl}
            className="group mt-10 inline-flex items-center gap-3 border border-[rgb(var(--accent))] bg-[rgb(var(--accent))] px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-[#050505] transition-colors duration-150 hover:bg-transparent hover:text-[rgb(var(--accent))]"
          >
            Inscribite
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Inscripción abierta · cupos limitados
          </p>
        </Reveal>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="flex flex-col items-start justify-between gap-2 border-t border-white/10 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:flex-row sm:items-center sm:px-8">
        <span className="text-paper">
          Hackcba<span className="text-muted">/26</span> — hecho en Córdoba
        </span>
        <span>Organizan: Foncea · Giorgis · Mazzitello</span>
      </footer>
    </main>
  );
}
