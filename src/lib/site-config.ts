import type { MotionLevel } from "@/hooks/use-site-motion";

/**
 * Site configuration & content — the single source of truth for copy and the
 * two configurable "props" carried over from the original DC component.
 * Editing text or tuning the motion level happens HERE, never in JSX.
 */
export const siteConfig = {
  /** "Massima" = full motion, "Calma" = reduced parallax & fewer particles. */
  motion: "Massima" as MotionLevel,
  /** Warm accent — also overridable via the --accent-warm CSS variable. */
  accentWarm: "#c2683f",

  brand: {
    initials: "DG",
    name: "Daniele Di Giorgio",
    tagline: "Finanza strutturata · Cessione del credito",
  },

  nav: [
    { href: "#problema", label: "Il problema" },
    { href: "#soluzione", label: "La soluzione" },
    { href: "#metodo", label: "Il metodo" },
  ],

  barometerLabel: "Consapevolezza finanziaria",

  loader: {
    kicker: "Finanza strutturata · Cessione del credito",
    headline: "Il capitale",
    headlineEm: "sbloccato",
    status: "Strutturazione in corso",
    chartLabels: ["Oggi", "Cessione", "Stabilità"] as const,
    chartBars: [
      { h: "24%", bg: "rgba(249,250,245,.22)", delay: "0.12s" },
      { h: "40%", bg: "rgba(249,250,245,.3)", delay: "0.26s" },
      { h: "58%", bg: "#50772F", delay: "0.4s" },
      { h: "78%", bg: "#7da34f", delay: "0.54s" },
      { h: "100%", bg: "#D9E9AA", delay: "0.68s" },
    ] as const,
  },
} as const;

export type PainCard = {
  title: string;
  body: string;
  /** Visual variant maps to a tile style in the asymmetric grid. */
  variant: "feature" | "plain" | "dark" | "wide";
  span?: "row" | "col";
  dot?: boolean;
};

export const painCards: PainCard[] = [
  {
    title: "Pagamenti ritardati",
    body: "Aspetti 6, 9, 12 mesi un pagamento già dovuto. Il credito esiste, ma è bloccato — e con lui ogni tua decisione.",
    variant: "feature",
    span: "row",
    dot: true,
  },
  {
    title: "Necessità di liquidità",
    body: "Serve cassa, ma il debito tradizionale è l'ultima cosa che vuoi.",
    variant: "plain",
    dot: true,
  },
  {
    title: "Zero prevedibilità",
    body: "Senza una data certa di incasso, ogni piano è un'ipotesi. Pianificare diventa impossibile.",
    variant: "dark",
  },
  {
    title: "Paura dell'instabilità",
    body: "Ciò che spaventa non è il costo: è non sapere se il prossimo mese reggerà.",
    variant: "plain",
    dot: true,
  },
];

export const solutionNot = ["Una banca", "Un prestatore", "Un'app fintech"];
export const solutionAre = [
  "Consulenti di finanza strutturata",
  "Specialisti della liquidità",
  "Un rapporto umano, non un algoritmo",
];

export const solutionFeatures = [
  {
    n: "01",
    title: "Focus su PA e sanità",
    body: "Specializzazione sui crediti verso la Pubblica Amministrazione e i fornitori del settore sanitario.",
  },
  {
    n: "02",
    title: "Strutture pro-soluto",
    body: "Competenza nella rimozione del rischio: il credito ceduto esce davvero dal tuo bilancio.",
  },
  {
    n: "03",
    title: "Consulenza diretta",
    body: "Un rapporto umano, su misura — non un processo automatizzato e impersonale.",
  },
];

export type Step = {
  n: string;
  kicker: string;
  title: string;
  body: string;
  side: "left" | "right";
  tone: "forest" | "olive" | "sage";
};

export const steps: Step[] = [
  {
    n: "01",
    kicker: "Step 01 — Problema",
    title: "Ritardi nei pagamenti",
    body: "Mappiamo i crediti bloccati e il ciclo amministrativo che li tiene fermi per mesi.",
    side: "left",
    tone: "forest",
  },
  {
    n: "02",
    kicker: "Step 02 — Analisi",
    title: "Spiegazione del ciclo",
    body: "Rendiamo leggibile il ciclo amministrativo e identifichiamo la struttura di cessione più adatta.",
    side: "right",
    tone: "olive",
  },
  {
    n: "03",
    kicker: "Step 03 — Soluzione",
    title: "Cessione strutturata",
    body: "Strutturiamo la cessione pro-soluto: il rischio esce dal tuo bilancio, la liquidità entra.",
    side: "left",
    tone: "forest",
  },
  {
    n: "04",
    kicker: "Step 04 — Risultato",
    title: "Liquidità prevedibile",
    body: "Flussi di cassa con date certe. Finalmente puoi pianificare la crescita, non subirla.",
    side: "right",
    tone: "sage",
  },
];

export type EduCard = {
  kicker: string;
  title: string;
  body: string;
  tone: "white" | "forest" | "sage" | "olive";
};

export const eduCards: EduCard[] = [
  {
    kicker: "ARTICOLO",
    title: "Perché le fatture della PA richiedono 180–360 giorni",
    body: "E cosa le aziende quasi sempre non capiscono del ciclo amministrativo pubblico.",
    tone: "white",
  },
  {
    kicker: "INSIGHT",
    title: "La liquidità è struttura, non credito.",
    body: "Perché le banche non risolvono i problemi di cash flow — e la prevedibilità è il vero vantaggio finanziario.",
    tone: "forest",
  },
  {
    kicker: "GUIDA",
    title: "Factoring vs cessione del credito",
    body: "Le differenze chiave — e perché il pro-soluto cambia tutto.",
    tone: "sage",
  },
  {
    kicker: "SPIEGAZIONE",
    title: "Il pro-soluto spiegato in 30 secondi",
    body: "Cedi il credito e cedi il rischio. Punto. Senza nuovo debito a bilancio.",
    tone: "white",
  },
  {
    kicker: "CASE STUDY",
    title: "Dai crediti bloccati a un flusso di cassa stabile",
    body: "Un fornitore sanitario libera capitale fermo da 11 mesi — senza accendere debito.",
    tone: "white",
  },
  {
    kicker: "APPROFONDIMENTO",
    title: "Problemi di cash flow delle PMI nei mercati UE",
    body: "Le sfide strutturali della liquidità nelle filiere del settore sanitario.",
    tone: "olive",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  tone: "white" | "forest";
  rotate: string; // e.g. "-2.5deg"
  offset: string; // top margin tweak
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Avevamo 800K fermi nei crediti verso una ASL. In sei settimane erano liquidità. Senza un euro di nuovo debito.",
    author: "M. Ferraro",
    role: "CFO, fornitore sanitario",
    tone: "white",
    rotate: "-2.5deg",
    offset: "mt-5",
  },
  {
    quote:
      "Per la prima volta posso dire al mio CdA quando entreranno i soldi. Daniele non vende un prodotto: struttura una certezza.",
    author: "L. Bianchi",
    role: "CEO, PMI mid-market",
    tone: "forest",
    rotate: "1.5deg",
    offset: "mt-0",
  },
  {
    quote:
      "Lo consiglio ai miei clienti come consulente di fiducia, non come una banca. Spiega la finanza in modo che chiunque la capisca.",
    author: "A. Conti",
    role: "Commercialista",
    tone: "white",
    rotate: "-1.5deg",
    offset: "mt-9",
  },
];

export const ctaBenefits = [
  "Una stima della liquidità recuperabile dai tuoi crediti",
  "La struttura di cessione più adatta al tuo caso",
  "Tempistiche certe di incasso, messe nero su bianco",
  "Un interlocutore umano, dall'inizio alla fine",
];
