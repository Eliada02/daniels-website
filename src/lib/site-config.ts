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
    { href: "/chi-sono", label: "Chi sono" },
    { href: "/#problema", label: "Il problema" },
    { href: "/#soluzione", label: "La soluzione" },
    { href: "/#metodo", label: "Il metodo" },
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
      { h: "58%", bg: "#0054A6", delay: "0.4s" },
      { h: "78%", bg: "#5BA3E0", delay: "0.54s" },
      { h: "100%", bg: "#7EC8FF", delay: "0.68s" },
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

export type CvExperience = {
  period: string;
  role: string;
  company: string;
  highlights: string[];
};

export type CvEducation = {
  period: string;
  degree: string;
  school: string;
};

export type CvSkillGroup = {
  label: string;
  items: string[];
};

export const aboutProfile = {
  kicker: "Chi sono",
  headline: "Consulente di finanza strutturata",
  headlineEm: "con focus sulla liquidità",
  summary:
    "Da oltre quindici anni accompagno PMI, fornitori sanitari e operatori mid-market nella trasformazione dei crediti commerciali in liquidità prevedibile. Specializzato in cessione del credito pro-soluto verso la Pubblica Amministrazione, unisco competenza tecnica e un rapporto diretto con il cliente.",
  contact: [
    { label: "Email", value: "daniele@example.com" },
    { label: "Telefono", value: "+39 000 000 0000" },
    { label: "Sede", value: "Milano, Italia" },
    { label: "LinkedIn", value: "linkedin.com/in/danieledigiorgio" },
  ],
  languages: [
    { lang: "Italiano", level: "Madrelingua" },
    { lang: "Inglese", level: "Professionale (C1)" },
    { lang: "Francese", level: "Intermedio (B2)" },
  ],
} as const;

export const aboutExperience: CvExperience[] = [
  {
    period: "2018 — oggi",
    role: "Consulente indipendente",
    company: "Finanza strutturata · Cessione del credito",
    highlights: [
      "Strutturazione di operazioni pro-soluto su crediti verso PA e sanità per oltre €45M di volume annuo.",
      "Due diligence amministrativa e negoziazione con factor e istituti di credito specializzati.",
      "Affiancamento diretto di CFO e imprenditori nella pianificazione della liquidità.",
    ],
  },
  {
    period: "2012 — 2018",
    role: "Senior Structured Finance",
    company: "Banca di investimento · Team crediti commerciali",
    highlights: [
      "Origination e closing di operazioni di factoring e cessione su portafogli corporate.",
      "Sviluppo di modelli di pricing e analisi del rischio di insolvenza del debitore ceduto.",
      "Coordinamento legale e fiscale su strutture cross-border in ambito UE.",
    ],
  },
  {
    period: "2008 — 2012",
    role: "Analista finanziario",
    company: "Società di consulenza · Corporate finance",
    highlights: [
      "Valutazioni d'impresa e supporto a operazioni di M&A per PMI industriali.",
      "Analisi di bilancio e cash flow forecasting per mandati di advisory.",
    ],
  },
];

export const aboutEducation: CvEducation[] = [
  {
    period: "2006 — 2008",
    degree: "Laurea magistrale in Economia e Management",
    school: "Università Bocconi, Milano",
  },
  {
    period: "2003 — 2006",
    degree: "Laurea triennale in Economia Aziendale",
    school: "Università degli Studi di Milano",
  },
];

export const aboutSkills: CvSkillGroup[] = [
  {
    label: "Specializzazioni",
    items: [
      "Cessione del credito pro-soluto",
      "Crediti verso PA e sanità",
      "Factoring strutturato",
      "Due diligence amministrativa",
    ],
  },
  {
    label: "Competenze tecniche",
    items: [
      "Analisi di bilancio e cash flow",
      "Pricing e strutturazione deal",
      "Normativa creditizia italiana",
      "Reporting e monitoraggio incassi",
    ],
  },
  {
    label: "Certificazioni",
    items: [
      "CFA Level II (in corso)",
      "Certificazione OCF · Intermediari finanziari",
    ],
  },
];

/* ============================================================
   "Chi sono" — dedicated CV / timeline route (/chi-sono).
   Infographic résumé layout; primary accent is #0054A6 (the
   `olive` brand token). Edit all copy here.
   ============================================================ */

/** Icon keys resolved by the inline icon set in about-cv.tsx. */
export type CvIcon =
  | "mail"
  | "phone"
  | "pin"
  | "globe"
  | "flag"
  | "cap"
  | "chart"
  | "briefcase"
  | "users"
  | "star"
  | "clock"
  | "check"
  | "rocket"
  | "award";

export const aboutHero = {
  role: "Consulente di Finanza Strutturata",
  summary:
    "Aiuto aziende e professionisti a trasformare i crediti commerciali bloccati in liquidità prevedibile — con strutture su misura, trasparenti e orientate ai risultati.",
  /** Contact row; icon keys map onto the inline icon set. */
  contact: [
    { icon: "mail" as CvIcon, value: "daniele@example.com", href: "mailto:daniele@example.com" },
    { icon: "phone" as CvIcon, value: "+39 000 000 0000", href: "tel:+390000000000" },
    { icon: "pin" as CvIcon, value: "Milano, Italia", href: null },
    { icon: "globe" as CvIcon, value: "danieledigiorgio.it", href: "https://danieledigiorgio.it" },
  ],
} as const;

export type CvCompetenza = { label: string; value: number };

export const aboutCompetenze: CvCompetenza[] = [
  { label: "Cessione del credito", value: 95 },
  { label: "Crediti PA & sanità", value: 92 },
  { label: "Factoring strutturato", value: 86 },
  { label: "Due diligence", value: 80 },
  { label: "Analisi di bilancio", value: 90 },
  { label: "Pricing & strutturazione", value: 84 },
  { label: "Risk management", value: 78 },
  { label: "Negoziazione", value: 88 },
];

export type CvMilestone = {
  period: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  body: string;
  icon: CvIcon;
  variant?: "start" | "goal";
};

export const aboutTimeline: CvMilestone[] = [
  {
    variant: "start",
    kicker: "Partenza",
    period: "2003 — 2006",
    title: "Formazione",
    body: "Laurea in Economia Aziendale e primi passi nel mondo della finanza d'impresa.",
    icon: "flag",
  },
  {
    period: "2006 — 2008",
    title: "Laurea Magistrale",
    subtitle: "Università Bocconi",
    body: "Specializzazione in Economia e Management, con focus sul corporate finance.",
    icon: "cap",
  },
  {
    period: "2008 — 2012",
    title: "Analista Finanziario",
    subtitle: "Società di consulenza",
    body: "Valutazioni d'impresa e supporto a operazioni di M&A per PMI industriali.",
    icon: "chart",
  },
  {
    period: "2012 — 2018",
    title: "Senior Structured Finance",
    subtitle: "Banca d'investimento",
    body: "Origination e closing di operazioni di factoring e cessione su portafogli corporate.",
    icon: "briefcase",
  },
  {
    period: "2018 — oggi",
    title: "Consulente Indipendente",
    subtitle: "Finanza strutturata",
    body: "Strutturazione di operazioni pro-soluto su crediti verso PA e sanità.",
    icon: "users",
  },
  {
    variant: "goal",
    kicker: "Prossima destinazione",
    period: "Domani",
    title: "Crescita",
    body: "Trasformare crediti bloccati in liquidità e crescita reale per le imprese italiane.",
    icon: "star",
  },
];

export const aboutFormazione = {
  degree: "Laurea Magistrale in Economia e Management",
  school: "Università Bocconi, Milano",
  period: "2006 — 2008",
};

export const aboutCertificazioni: string[] = [
  "CFA Level II — in corso",
  "OCF — Albo intermediari finanziari",
  "AIFI — Private Debt & Direct Lending",
  "Specializzazione Cessione Pro-Soluto",
];

export type CvStat = { value: string; suffix: string; label: string; icon: CvIcon };

export const aboutStats: CvStat[] = [
  { value: "15", suffix: "+", label: "Anni di esperienza", icon: "clock" },
  { value: "200", suffix: "+", label: "Operazioni strutturate", icon: "check" },
  { value: "45", suffix: "M€", label: "Volume medio annuo", icon: "chart" },
  { value: "1", suffix: "", label: "Missione: la tua liquidità", icon: "rocket" },
];
