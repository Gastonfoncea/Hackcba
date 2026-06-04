"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "¿Quién puede participar?",
    a: "Cualquier persona mayor de 16 años con ganas de construir. Estudiantes, profesionales, autodidactas. No hace falta ser un crack: hace falta ganas.",
  },
  {
    q: "¿Tengo que venir con equipo?",
    a: "No. Podés venir solo y armar equipo en el kickoff. Los equipos son de 1 a 4 personas. Vas a conocer gente, ese es medio el punto.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Nada. La inscripción es gratuita. Comida, café y mate corren por nuestra cuenta durante las 48 horas.",
  },
  {
    q: "¿Qué tengo que llevar?",
    a: "Tu notebook, cargador, y lo que necesites para sobrevivir 48 horas. Nosotros ponemos el lugar, la energía (eléctrica y la otra) y la comida.",
  },
  {
    q: "¿Sobre qué tengo que construir?",
    a: "Sobre cualquiera de los tracks. El proyecto se arranca de cero en el evento; podés traer ideas, no código.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-ink">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-ink">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-colors hover:bg-ink hover:text-paper md:px-10"
              aria-expanded={isOpen}
            >
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-muted group-hover:text-paper/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium md:text-xl">
                  {item.q}
                </span>
              </span>
              <span className="font-mono text-2xl leading-none">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl px-6 pb-8 pl-[3.25rem] text-muted md:px-10 md:pl-[4.5rem]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
