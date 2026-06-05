import Faq from "@/components/Faq";
import Countdown from "@/components/Countdown";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import IntroOverlay from "@/components/IntroOverlay";

/* ===============================================================
   HACKCBA — Landing (iteración 1)
   Mono puro · brutalismo controlado · jerarquía por inversión
================================================================ */

const EVENT = {
  name: "Hackcba",
  dates: "12—14 SEP 2026",
  venue: "FAMAF · UNC · CÓRDOBA",
  registerUrl: "#registro",
};

const STATS = [
  { value: "+200", label: "Hackers" },
  { value: "$2M", label: "En premios" },
  { value: "48", label: "Horas" },
  { value: "4", label: "Tracks" },
];

const TRACKS = [
  {
    id: "01",
    title: "AI & Agents",
    desc: "LLMs, agentes autónomos, RAG, lo que se te ocurra que piense por vos.",
  },
  {
    id: "02",
    title: "DevTools",
    desc: "Herramientas para que otros developers construyan más rápido. Meta.",
  },
  {
    id: "03",
    title: "Fintech",
    desc: "Pagos, cripto, finanzas personales. Plata moviéndose en tiempo real.",
  },
  {
    id: "04",
    title: "Open",
    desc: "Sin caja. Si rompe algo y lo arregla mejor, va. Sorprendenos.",
  },
];

const PRIZES = [
  { place: "1º", amount: "$1.000.000", extra: "+ mentorías + créditos cloud" },
  { place: "2º", amount: "$600.000", extra: "+ créditos cloud" },
  { place: "3º", amount: "$400.000", extra: "+ swag" },
];

const SCHEDULE = [
  {
    day: "DÍA 01",
    date: "Vie 12",
    items: [
      ["18:00", "Acreditación & welcome"],
      ["19:30", "Kickoff + armado de equipos"],
      ["21:00", "Arranca el reloj. 48hs."],
    ],
  },
  {
    day: "DÍA 02",
    date: "Sáb 13",
    items: [
      ["10:00", "Workshops & mentorías"],
      ["14:00", "Check-in de proyectos"],
      ["00:00", "Hacking nocturno + café infinito"],
    ],
  },
  {
    day: "DÍA 03",
    date: "Dom 14",
    items: [
      ["18:00", "Freeze de código"],
      ["19:00", "Demos & pitchs"],
      ["21:00", "Premiación & cierre"],
    ],
  },
];

const SPONSORS = ["TU LOGO", "SPONSOR", "PARTNER", "MEDIA", "VENUE", "SUMATE"];

/* --------------------------- primitives --------------------------- */

function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: string;
}) {
  return (
    <div className="mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
      <span>{index}</span>
      <span className="h-px flex-1 bg-line" />
      <span className="text-ink">{children}</span>
    </div>
  );
}

/* Botón CTA: negro sólido, hover invierte a paper con borde. */
function Cta({
  href,
  children,
  className = "",
}: {
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 border-2 border-ink bg-ink px-7 py-4 font-mono text-sm font-medium uppercase tracking-wider text-paper transition-colors duration-150 hover:bg-paper hover:text-ink ${className}`}
    >
      {children}
      <span className="transition-transform duration-150 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

/* ------------------------------- page ------------------------------- */

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <main className="mx-auto w-full max-w-[1240px] border-x-2 border-ink">
      {/* NAV */}
      <header className="flex items-center justify-between border-b-2 border-ink px-6 py-5 md:px-10">
        <a href="#" aria-label="Hackcba — inicio">
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-wider text-muted md:flex">
          <a href="#tracks" className="transition-colors hover:text-ink">
            Tracks
          </a>
          <a href="#premios" className="transition-colors hover:text-ink">
            Premios
          </a>
          <a href="#cronograma" className="transition-colors hover:text-ink">
            Cronograma
          </a>
          <a href="#faq" className="transition-colors hover:text-ink">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={EVENT.registerUrl}
            className="border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            Registrarse
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b-2 border-ink px-6 pb-12 pt-16 md:px-10 md:pb-20 md:pt-24">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          {EVENT.dates} <span className="mx-2">//</span> {EVENT.venue}
        </p>

        <h1 className="text-[clamp(3.5rem,15vw,11rem)] font-bold leading-[0.86] tracking-[-0.03em]">
          <span className="glitch inline-block" data-text="HACK">
            HACK
          </span>
          <br />
          <span className="glitch inline-block" data-text="CÓRDOBA">
            CÓRDOBA
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md font-mono text-base leading-relaxed text-muted">
            <span className="text-ink">&gt;</span> 48 horas de código en el
            corazón de Córdoba.
            <br />
            <span className="text-ink">&gt;</span> Construí. Rompé. Enviá.
            <span className="cursor-blink ml-1 text-ink">_</span>
          </p>
          <Cta href={EVENT.registerUrl}>Inscribite</Cta>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="border-b-2 border-ink px-6 py-12 md:px-10 md:py-16">
        <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          <span className="h-2 w-2 animate-pulse bg-ink" />
          Arranca el reloj en
        </div>
        <Countdown />
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-b border-ink bg-ink py-3 text-paper">
        <div className="animate-marquee flex w-max whitespace-nowrap font-mono text-sm uppercase tracking-wider">
          {Array.from({ length: 2 }).map((_, dup) => (
            <span key={dup} className="flex shrink-0">
              {[
                "Construí",
                "Rompé",
                "Enviá",
                "48 horas",
                "Sin dormir",
                "Café infinito",
                "Demo or die",
              ].map((w) => (
                <span key={w} className="mx-6 flex items-center gap-6">
                  {w} <span className="text-paper/40">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`border-b border-ink px-6 py-10 md:py-14 ${
              i % 2 === 0 ? "border-r" : ""
            } md:border-r ${i === 3 ? "md:border-r-0" : ""}`}
          >
            <div className="font-display text-5xl font-bold tracking-tight md:text-6xl">
              {s.value}
            </div>
            <div className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* ABOUT */}
      <section className="border-b border-ink px-6 py-16 md:px-10 md:py-20">
        <SectionLabel index="00 / SOBRE">¿Qué es esto?</SectionLabel>
        <div className="grid gap-10 md:grid-cols-12">
          <h2 className="text-3xl font-medium leading-tight tracking-tight md:col-span-7 md:text-5xl">
            Un fin de semana para construir lo que venís postergando.
          </h2>
          <div className="space-y-5 font-mono text-sm leading-relaxed text-muted md:col-span-5 md:pt-2">
            <p>
              Hackcba junta a +200 developers, diseñadores y founders en un
              mismo lugar durante 48 horas. Cero teoría. Todo construcción.
            </p>
            <p>
              Venís con una idea (o sin ella), armás equipo, y el domingo a la
              noche tenés algo que funciona y que mostrás en vivo frente a un
              jurado. Así de simple, así de intenso.
            </p>
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section
        id="tracks"
        className="border-b border-ink px-6 py-16 md:px-10 md:py-20"
      >
        <SectionLabel index="01 / DESAFÍOS">Tracks</SectionLabel>
        <div className="grid border-t border-l border-ink sm:grid-cols-2">
          {TRACKS.map((t) => (
            <div
              key={t.id}
              className="group border-b border-r border-ink p-8 transition-colors duration-150 hover:bg-ink hover:text-paper md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-muted group-hover:text-paper/50">
                  {t.id}
                </span>
                <span className="font-mono text-xs opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-bold tracking-tight md:text-3xl">
                {t.title}
              </h3>
              <p className="mt-3 max-w-sm font-mono text-sm leading-relaxed text-muted group-hover:text-paper/70">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRIZES */}
      <section
        id="premios"
        className="border-b border-ink px-6 py-16 md:px-10 md:py-20"
      >
        <SectionLabel index="02 / GUITA">Premios</SectionLabel>
        <div className="border-t border-ink">
          {PRIZES.map((p, i) => (
            <div
              key={p.place}
              className={`group flex flex-col gap-2 border-b border-ink py-8 transition-colors duration-150 hover:bg-ink hover:text-paper md:flex-row md:items-center md:gap-8 ${
                i === 0 ? "md:py-12" : ""
              }`}
            >
              <span className="px-2 font-mono text-sm text-muted group-hover:text-paper/50 md:w-20">
                {p.place}
              </span>
              <span
                className={`px-2 font-bold tracking-tight ${
                  i === 0 ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"
                }`}
              >
                {p.amount}
              </span>
              <span className="px-2 font-mono text-sm text-muted group-hover:text-paper/70 md:ml-auto md:text-right">
                {p.extra}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted">
          * Montos en pesos. Premios especiales por track a confirmar.
        </p>
      </section>

      {/* SCHEDULE */}
      <section
        id="cronograma"
        className="border-b border-ink px-6 py-16 md:px-10 md:py-20"
      >
        <SectionLabel index="03 / 48HS">Cronograma</SectionLabel>
        <div className="grid gap-px border border-ink bg-ink md:grid-cols-3">
          {SCHEDULE.map((d) => (
            <div key={d.day} className="bg-paper p-8 md:p-10">
              <div className="flex items-baseline justify-between border-b border-ink pb-4">
                <span className="font-mono text-sm font-bold tracking-wider">
                  {d.day}
                </span>
                <span className="font-mono text-xs uppercase text-muted">
                  {d.date}
                </span>
              </div>
              <ul className="mt-6 space-y-5">
                {d.items.map(([time, label]) => (
                  <li key={time + label} className="flex gap-4">
                    <span className="w-14 shrink-0 font-mono text-xs text-muted">
                      {time}
                    </span>
                    <span className="text-sm leading-snug">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SPONSORS */}
      <section className="border-b border-ink px-6 py-16 md:px-10 md:py-20">
        <SectionLabel index="04 / APOYAN">Sponsors</SectionLabel>
        <div className="grid grid-cols-2 border-t border-l border-ink sm:grid-cols-3">
          {SPONSORS.map((s) => (
            <div
              key={s}
              className="flex h-28 items-center justify-center border-b border-r border-ink font-mono text-sm uppercase tracking-widest text-muted transition-colors hover:bg-ink hover:text-paper md:h-36"
            >
              {s}
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted">
          ¿Querés que tu logo esté acá?{" "}
          <a href="#registro" className="text-ink underline underline-offset-4">
            Escribinos →
          </a>
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-16 md:px-10 md:py-20">
        <SectionLabel index="05 / DUDAS">Preguntas frecuentes</SectionLabel>
        <Faq />
      </section>

      {/* FINAL CTA */}
      <section
        id="registro"
        className="border-t border-ink bg-ink px-6 py-20 text-paper md:px-10 md:py-32"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-paper/50">
          {EVENT.dates} // {EVENT.venue}
        </p>
        <h2 className="mt-6 text-[clamp(2.5rem,9vw,7rem)] font-bold leading-[0.9] tracking-tight">
          ¿Te animás?
        </h2>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
          <a
            href="#"
            className="group inline-flex items-center gap-3 border-2 border-paper bg-paper px-8 py-5 font-mono text-sm font-medium uppercase tracking-wider text-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
          >
            Inscribite gratis
            <span className="transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </a>
          <span className="font-mono text-xs uppercase tracking-wider text-paper/50">
            Cupos limitados · Inscripción gratuita
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col gap-6 border-t border-ink px-6 py-8 font-mono text-xs uppercase tracking-wider text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <span>© 2026 Hackcba — Córdoba, Argentina</span>
        <div className="flex gap-6">
          <a href="#" className="transition-colors hover:text-ink">
            Instagram
          </a>
          <a href="#" className="transition-colors hover:text-ink">
            X / Twitter
          </a>
          <a href="#" className="transition-colors hover:text-ink">
            Discord
          </a>
        </div>
      </footer>
      </main>
    </>
  );
}
