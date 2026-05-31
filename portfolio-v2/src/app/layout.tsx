import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { profile } from "@/data/profile";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import "./globals.css";

// Applies the saved theme before first paint to avoid a flash of the wrong
// palette. Runs inline in <head>, ahead of the body render.
const themeBootScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');var ok=['dark','light','matte','iris','cobalt'];document.documentElement.setAttribute('data-theme',ok.indexOf(t)>-1?t:'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Display / foreground typeface. Sycamore.so uses "Feature Display" (a paid
// Commercial Type face); Instrument Serif is the closest free match. To swap in
// licensed Feature Display later: drop the font files in, replace this with a
// next/font/local definition pointing at them, and keep the `--font-display`
// variable name — nothing else needs to change.
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.subtitle}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.subtitle}`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="grain font-sans antialiased">
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
