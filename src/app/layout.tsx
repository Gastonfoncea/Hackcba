import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Hackcba — La hackathon de Córdoba",
  description:
    "24 horas, 100 hackers, una demo. Venís con una idea, te vas con un producto. 18 y 19 de julio en Casa Naranja X, Córdoba.",
  openGraph: {
    title: "Hackcba — La hackathon de Córdoba",
    description:
      "24 horas, 100 hackers, una demo. 18 y 19 de julio en Casa Naranja X, Córdoba.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`dark ${display.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash: aplica el tema guardado antes del primer paint. Default = dark. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('hackcba-theme');var d=t?t==='dark':true;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink font-display selection:bg-ink selection:text-paper">
        {children}
      </body>
    </html>
  );
}
