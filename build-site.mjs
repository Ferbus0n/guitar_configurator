import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = (...parts) => path.join(root, ...parts);

const langs = {
  es: {
    label: "ES",
    html: "es",
    home: "/es/",
    nav: {
      home: "Inicio",
      models: "Modelos",
      configurator: "Configurador",
      custom: "Custom",
      services: "Servicios",
      academy: "Curso",
      hardware: "3D",
      luthier: "Luthier",
      authorized: "Centro técnico",
      blog: "Blog",
      contact: "Contacto",
    },
    cta: "Contactar",
    view: "Ver detalle",
    ask: "Pedir presupuesto",
    backModels: "Volver a modelos",
    footer: {
      address: "Dirección",
      contact: "Contacto",
      hours: "Horario",
      hoursText: "Lunes a viernes, 9:00 a 18:00",
      social: "Redes",
      legal: "Guitarras custom, reparación y formación de luthería.",
    },
    paths: {
      home: "/es/",
      models: "/es/models/",
      configurator: "/es/configurador/",
      custom: "/es/guitarras-y-bajos-custom/",
      services: "/es/luthier-servicio-de-reparacion/",
      luthier: "/es/luthier-instrumento-artesanal-barcelona/",
      authorized: "/es/centro-tecnico-autorizado/",
      hardware: "/es/3d-guitar-hardware/",
      academy: "/es/como-hacer-una-guitarra/",
      blog: "/es/blog/",
      contact: "/es/contacto/",
    },
    hero: {
      eyebrow: "Custom handmade instruments",
      title: "Guitarras artesanales con alma de taller.",
      text: "Construcción, reparación, diseño y formación desde Barberà del Vallès. Instrumentos hechos para sonar, responder y acompañarte durante años.",
      primary: "Empezar un proyecto",
      secondary: "Explorar modelos",
    },
    sections: {
      modelsTitle: "Modelos con ruta, historia y galería propia",
      modelsText: "Cada modelo parte de una base real de Ramos Guitars, con imágenes correspondientes y ficha independiente.",
      customTitle: "Guitarras y bajos custom",
      customText: "Un instrumento a medida no empieza en una plantilla. Empieza en tu forma de tocar, en el sonido que buscas y en las decisiones que hacen que una guitarra sea realmente tuya.",
      servicesTitle: "Servicio de luthier",
      servicesText: "Ajustes, reparación, trastes, electrónica, pastillas, restauración y personalización con criterio de taller profesional.",
      academyTitle: "Ramos Custom Academy",
      academyText: "Cursos de luthier para aprender el oficio desde dentro, con práctica real y acompañamiento técnico.",
      hardwareTitle: "Diseño 3D y piezas custom",
      hardwareText: "Diseño y fabricación de piezas no metálicas, golpeadores, plantillas, tapas y prototipos para instrumentos.",
      luthierTitle: "José Ramos, luthier",
      luthierText: "Décadas de oficio construyendo, reparando y enseñando desde un taller propio en Barcelona.",
      reviewsTitle: "Reseñas y confianza",
    },
  },
  ca: {
    label: "CA",
    html: "ca",
    home: "/ca/",
    nav: {
      home: "Inici",
      models: "Models",
      configurator: "Configurador",
      custom: "Custom",
      services: "Serveis",
      academy: "Curs",
      hardware: "3D",
      luthier: "Luthier",
      authorized: "Centre tècnic",
      blog: "Blog",
      contact: "Contacte",
    },
    cta: "Contactar",
    view: "Veure detall",
    ask: "Demanar pressupost",
    backModels: "Tornar a models",
    footer: {
      address: "Adreça",
      contact: "Contacte",
      hours: "Horari",
      hoursText: "Dilluns a divendres, 9:00 a 18:00",
      social: "Xarxes",
      legal: "Guitarres custom, reparació i formació de lutheria.",
    },
    paths: {
      home: "/ca/",
      models: "/ca/models/",
      configurator: "/ca/configurador/",
      custom: "/ca/guitarres-i-baixos-custom/",
      services: "/ca/luthier-de-guitarres-i-baixos/",
      luthier: "/ca/luthier-instrument-artesanal-barcelona/",
      authorized: "/ca/centre-tecnic-autoritzat/",
      hardware: "/ca/3d-guitar-hardware/",
      academy: "/ca/com-fer-una-guitarra/",
      blog: "/ca/blog/",
      contact: "/ca/contacte/",
    },
    hero: {
      eyebrow: "Custom handmade instruments",
      title: "Guitarres artesanals amb ànima de taller.",
      text: "Construcció, reparació, disseny i formació des de Barberà del Vallès. Instruments fets per sonar, respondre i acompanyar-te durant anys.",
      primary: "Començar un projecte",
      secondary: "Explorar models",
    },
    sections: {
      modelsTitle: "Models amb ruta, història i galeria pròpia",
      modelsText: "Cada model parteix d'una base real de Ramos Guitars, amb imatges corresponents i fitxa independent.",
      customTitle: "Guitarres i baixos custom",
      customText: "Un instrument a mida comença en la teva manera de tocar, en el so que busques i en els detalls que el fan teu.",
      servicesTitle: "Servei de luthier",
      servicesText: "Ajustos, reparació, trasts, electrònica, pastilles, restauració i personalització amb criteri professional.",
      academyTitle: "Ramos Custom Academy",
      academyText: "Cursos de luthier per aprendre l'ofici des de dins, amb pràctica real i acompanyament tècnic.",
      hardwareTitle: "Disseny 3D i peces custom",
      hardwareText: "Disseny i fabricació de peces no metàl·liques, colpejadors, plantilles, tapes i prototips.",
      luthierTitle: "José Ramos, luthier",
      luthierText: "Dècades d'ofici construint, reparant i ensenyant des d'un taller propi a Barcelona.",
      reviewsTitle: "Ressenyes i confiança",
    },
  },
  en: {
    label: "EN",
    html: "en",
    home: "/en/",
    nav: {
      home: "Home",
      models: "Models",
      configurator: "Configurator",
      custom: "Custom",
      services: "Services",
      academy: "Course",
      hardware: "3D",
      luthier: "Luthier",
      authorized: "Authorized",
      blog: "Blog",
      contact: "Contact",
    },
    cta: "Contact",
    view: "View detail",
    ask: "Request a quote",
    backModels: "Back to models",
    footer: {
      address: "Address",
      contact: "Contact",
      hours: "Opening hours",
      hoursText: "Monday to Friday, 9:00 to 18:00",
      social: "Social",
      legal: "Custom guitars, repair services and lutherie training.",
    },
    paths: {
      home: "/en/",
      models: "/en/models/",
      configurator: "/en/configurator/",
      custom: "/en/custom-guitars-and-basses/",
      services: "/en/luthier-guitar-repair-service/",
      luthier: "/en/luthier-handmade-instruments-barcelona/",
      authorized: "/en/authorized-service-centers/",
      hardware: "/en/3d-guitar-hardware/",
      academy: "/en/how-to-make-a-guitar/",
      blog: "/en/blog/",
      contact: "/en/contact/",
    },
    hero: {
      eyebrow: "Custom handmade instruments",
      title: "Handmade guitars with workshop soul.",
      text: "Building, repair, design and training from Barberà del Vallès. Instruments made to sound, respond and stay with you for years.",
      primary: "Start a project",
      secondary: "Explore models",
    },
    sections: {
      modelsTitle: "Models with their own route, story and gallery",
      modelsText: "Each model is based on a real Ramos Guitars instrument, with matching images and a dedicated detail page.",
      customTitle: "Custom guitars and basses",
      customText: "A custom instrument starts with how you play, the sound you want and the details that make it yours.",
      servicesTitle: "Luthier services",
      servicesText: "Setups, repairs, fretwork, electronics, pickups, restoration and personalization with professional workshop criteria.",
      academyTitle: "Ramos Custom Academy",
      academyText: "Luthier courses to learn the craft from the inside, with real practice and technical guidance.",
      hardwareTitle: "3D design and custom parts",
      hardwareText: "Design and production of non-metal parts, pickguards, routing templates, covers and prototypes.",
      luthierTitle: "José Ramos, luthier",
      luthierText: "Decades of craft building, repairing and teaching from a dedicated workshop in Barcelona.",
      reviewsTitle: "Reviews and trust",
    },
  },
};

const modelData = [
  {
    id: "odyssey",
    assetKey: "sodom",
    slugs: { es: "sodom", ca: "odyssey", en: "odyssey" },
    type: { es: "Rock y metal", ca: "Rock i metal", en: "Rock and metal" },
    title: "Odyssey",
    short: {
      es: "Cuerpo audaz, trémolo expresivo y carácter moderno para guitarristas que quieren precisión sin perder impacto visual.",
      ca: "Cos contundent, tremolo expressiu i caràcter modern per a guitarristes que volen precisió i presència.",
      en: "Bold body, expressive tremolo and modern character for players who want precision and visual impact.",
    },
    paragraphs: {
      es: [
        "Odyssey está pensada para guitarristas de rock y metal que necesitan una guitarra estable, cómoda y con mucha personalidad.",
        "Su acabado en verde esmeralda con matices de madera natural refuerza una estética fuerte, mientras el sistema de trémolo permite vibratos amplios y transiciones suaves.",
      ],
      ca: [
        "Odyssey està pensada per a guitarristes de rock i metal que necessiten una guitarra estable, còmoda i amb molta personalitat.",
        "L'acabat verd maragda amb matisos de fusta natural reforça una estètica potent, i el tremolo permet vibratos amplis i transicions suaus.",
      ],
      en: [
        "Odyssey is built for rock and metal players who need a stable, comfortable guitar with a strong personality.",
        "Its emerald finish with natural wood accents gives it a bold look, while the tremolo system allows wide vibratos and smooth transitions.",
      ],
    },
    specs: ["Tremolo expresivo", "Cuerpo ergonómico", "Acabado verde/natural", "Respuesta moderna"],
  },
  {
    id: "holdsworth",
    assetKey: "eclipse",
    slugs: { es: "eclipse", ca: "abaddon", en: "eclipse" },
    type: { es: "Fusion progresiva", ca: "Fusió progressiva", en: "Progressive fusion" },
    title: "Holdsworth",
    short: {
      es: "Tributo a Allan Holdsworth: rápida, fluida y diseñada para fraseo técnico con sustain y definición.",
      ca: "Tribut a Allan Holdsworth: ràpida, fluida i pensada per a fraseig tècnic amb sustain i definició.",
      en: "A tribute to Allan Holdsworth: fast, fluid and designed for technical phrasing with sustain and definition.",
    },
    paragraphs: {
      es: [
        "Holdsworth rinde tributo a una leyenda del jazz rock progresivo con un instrumento de tacto suave, contornos cómodos y respuesta precisa.",
        "El acabado rojo brillante y la madera seleccionada buscan una presencia intensa, mientras las pastillas de alta precisión mantienen claridad y sustain.",
      ],
      ca: [
        "Holdsworth ret homenatge a una llegenda del jazz rock progressiu amb un instrument de tacte suau, contorns còmodes i resposta precisa.",
        "L'acabat vermell brillant i la fusta seleccionada donen presència, mentre les pastilles mantenen claredat i sustain.",
      ],
      en: [
        "Holdsworth pays tribute to a progressive jazz-rock legend with a smooth neck feel, comfortable contours and precise response.",
        "The bright red finish and selected wood create intensity, while high-precision pickups keep clarity and sustain intact.",
      ],
    },
    specs: ["Mástil fluido", "Pastillas de precisión", "Sustain largo", "Acabado rojo brillante"],
  },
  {
    id: "kevster",
    assetKey: "kevster",
    slugs: { es: "kevster", ca: "pulse", en: "kevster" },
    type: { es: "Clásica reinterpretada", ca: "Clàssica reinterpretada", en: "Reworked classic" },
    title: "Kevster",
    short: {
      es: "Una visión boutique de un diseño clásico, más cómoda, ligera y con acceso superior mejorado.",
      ca: "Una visió boutique d'un disseny clàssic, més còmoda, lleugera i amb millor accés superior.",
      en: "A boutique take on a classic design, lighter, more comfortable and with improved upper fret access.",
    },
    paragraphs: {
      es: [
        "Kevster reinterpreta un diseño clásico con una ergonomía más actual, acceso al mástil más natural y sustain definido.",
        "No busca copiar una Telecaster: busca conservar su inmediatez y llevarla a un terreno más personal, artesanal y cómodo.",
      ],
      ca: [
        "Kevster reinterpreta un disseny clàssic amb una ergonomia més actual, millor accés al màstil i sustain definit.",
        "No vol copiar una Telecaster: vol conservar-ne la resposta directa i portar-la a un terreny més personal i artesanal.",
      ],
      en: [
        "Kevster reinterprets a classic design with updated ergonomics, natural upper fret access and defined sustain.",
        "It is not about copying a Telecaster; it keeps that direct response and moves it into a more personal handmade space.",
      ],
    },
    specs: ["Cuerpo thin", "Acceso superior cómodo", "Sustain definido", "Respuesta directa"],
  },
  {
    id: "groover",
    assetKey: "groover",
    slugs: { es: "groover", ca: "behemoth", en: "groover" },
    type: { es: "Groove y equilibrio", ca: "Groove i equilibri", en: "Groove and balance" },
    title: "Groover",
    short: {
      es: "Inspiración clásica elevada con equilibrio sonoro, comodidad de escenario y una construcción cuidada.",
      ca: "Inspiració clàssica elevada amb equilibri sonor, comoditat d'escenari i construcció cuidada.",
      en: "Classic inspiration elevated with tonal balance, stage comfort and refined construction.",
    },
    paragraphs: {
      es: [
        "Groover recoge la esencia de un icono y la lleva al lenguaje de Ramos: equilibrio, respuesta y comodidad.",
        "Es una guitarra para rock clásico, funk, blues y sesión, con una voz abierta y una construcción pensada para rendir en directo.",
      ],
      ca: [
        "Groover recull l'essència d'una icona i la porta al llenguatge Ramos: equilibri, resposta i comoditat.",
        "És una guitarra per a rock clàssic, funk, blues i sessió, amb veu oberta i construcció pensada per al directe.",
      ],
      en: [
        "Groover takes the essence of an icon and brings it into the Ramos language: balance, response and comfort.",
        "It is made for classic rock, funk, blues and session work, with an open voice and stage-ready construction.",
      ],
    },
    specs: ["Voz equilibrada", "Cuerpo cómodo", "Rock, funk y blues", "Construcción estable"],
  },
  {
    id: "brainless",
    assetKey: "brainless",
    slugs: { es: "brainless", ca: "apollyon", en: "brainless" },
    type: { es: "Metal técnico", ca: "Metal tècnic", en: "Technical metal" },
    title: "Brainless",
    short: {
      es: "Diseñada para metal moderno: ergonomía agresiva, sustain largo, afinación fiable y ataque preciso.",
      ca: "Dissenyada per a metal modern: ergonomia agressiva, sustain llarg, afinació fiable i atac precís.",
      en: "Designed for modern metal: aggressive ergonomics, long sustain, reliable tuning and precise attack.",
    },
    paragraphs: {
      es: [
        "Brainless nace para guitarristas de metal que necesitan comodidad durante horas de técnica intensa y una afinación sólida.",
        "Cada detalle busca sinergia entre innovación y tradición: cuerpo ergonómico, construcción robusta y hardware de alta precisión.",
      ],
      ca: [
        "Brainless neix per a guitarristes de metal que necessiten comoditat durant hores de tècnica intensa i afinació sòlida.",
        "Cada detall busca sinergia entre innovació i tradició: cos ergonòmic, construcció robusta i hardware precís.",
      ],
      en: [
        "Brainless is made for metal players who need comfort through hours of intense technique and solid tuning.",
        "Every detail looks for synergy between innovation and tradition: ergonomic body, robust construction and precise hardware.",
      ],
    },
    specs: ["Afinación estable", "Hardware preciso", "Ergonomía agresiva", "Sustain robusto"],
  },
  {
    id: "atlast",
    assetKey: "atlast",
    slugs: { es: "atlast", ca: "revelation", en: "atlast" },
    type: { es: "Virtuosismo moderno", ca: "Virtuosisme modern", en: "Modern virtuosity" },
    title: "Atlast",
    short: {
      es: "Una obra de luthería moderna para explorar técnica, dinámica y presencia con acceso total al diapasón.",
      ca: "Una obra de lutheria moderna per explorar tècnica, dinàmica i presència amb accés total al diapasó.",
      en: "A modern lutherie piece for technique, dynamics and presence with unrestricted fingerboard access.",
    },
    paragraphs: {
      es: [
        "Atlast está concebida para guitarristas virtuosos que buscan respuesta rápida, dinámica amplia y control absoluto.",
        "El acceso sin restricciones al diapasón y las pastillas de alta definición permiten pasar de arpegios veloces a armónicos sutiles sin perder detalle.",
      ],
      ca: [
        "Atlast està concebuda per a guitarristes virtuosos que busquen resposta ràpida, dinàmica ampla i control absolut.",
        "L'accés lliure al diapasó i les pastilles d'alta definició permeten passar d'arpegis veloços a harmònics subtils.",
      ],
      en: [
        "Atlast is conceived for virtuoso players looking for fast response, wide dynamics and absolute control.",
        "Unrestricted fingerboard access and high-definition pickups let you move from fast arpeggios to subtle harmonics without losing detail.",
      ],
    },
    specs: ["Acceso total", "Pastillas HD", "Respuesta dinámica", "Diseño signature"],
  },
];

const reviews = {
  es: [
    ["Ajuste impecable", "La guitarra volvió con más sustain, mejor tacto y una estabilidad que antes no tenía."],
    ["Proyecto custom", "Entendieron exactamente el instrumento que quería: presencia, comodidad y un sonido muy personal."],
    ["Trabajo de taller", "Electrónica silenciosa, trastes perfectos y una respuesta comodísima en directo."],
  ],
  ca: [
    ["Ajust impecable", "La guitarra va tornar amb més sustain, millor tacte i una estabilitat que abans no tenia."],
    ["Projecte custom", "Van entendre exactament l'instrument que volia: presència, comoditat i un so molt personal."],
    ["Treball de taller", "Electrònica silenciosa, trasts perfectes i una resposta molt còmoda en directe."],
  ],
  en: [
    ["Impeccable setup", "The guitar came back with more sustain, better feel and stability it did not have before."],
    ["Custom project", "They understood exactly the instrument I wanted: presence, comfort and a very personal sound."],
    ["Workshop work", "Silent electronics, perfect frets and a very comfortable response live."],
  ],
};

const blogPosts = [
  {
    slug: "replica-de-la-heart-guitar-de-steve-vai",
    title: {
      es: "Réplica de la guitarra Heart de Steve Vai",
      ca: "Rèplica de la guitarra Heart de Steve Vai",
      en: "Steve Vai Heart guitar replica",
    },
    excerpt: {
      es: "Una réplica única de la guitarra Heart utilizada en el videoclip Just Like Paradise de David Lee Roth en 1988.",
      ca: "Una rèplica única de la guitarra Heart utilitzada al videoclip Just Like Paradise de David Lee Roth l'any 1988.",
      en: "A unique replica of the Heart guitar used in David Lee Roth's Just Like Paradise video in 1988.",
    },
  },
  {
    slug: "salon-international-guitare-toulouse",
    title: {
      es: "Salón Internacional de la Guitarra 2024 en Toulouse",
      ca: "Saló Internacional de la Guitarra 2024 a Toulouse",
      en: "2024 International Guitar Show in Toulouse",
    },
    excerpt: {
      es: "Participación de Ramos Custom Guitars como expositor en uno de los eventos importantes del mundo de la guitarra.",
      ca: "Participació de Ramos Custom Guitars com a expositor en un dels esdeveniments importants del món de la guitarra.",
      en: "Ramos Custom Guitars as an exhibitor at one of the important events in the guitar world.",
    },
  },
];

const pageText = {
  custom: {
    eyebrow: { es: "Instrumentos custom", ca: "Instruments custom", en: "Custom instruments" },
    title: { es: "Tu música, tu instrumento personalizado.", ca: "La teva música, el teu instrument personalitzat.", en: "Your music, your custom instrument." },
    image: "/assets/hero-atlast.png",
    paragraphs: {
      es: [
        "Ramos Custom Guitars construye guitarras y bajos personalizados para músicos que quieren un instrumento con identidad propia.",
        "El proceso arranca con una conversación sobre tu sonido, técnica, estética y necesidades reales. A partir de ahí se definen maderas, escala, pastillas, electrónica, hardware, acabado y ajuste.",
      ],
      ca: [
        "Ramos Custom Guitars construeix guitarres i baixos personalitzats per a músics que volen un instrument amb identitat pròpia.",
        "El procés comença amb una conversa sobre el teu so, tècnica, estètica i necessitats reals. Després es defineixen fustes, escala, pastilles, electrònica, hardware, acabat i ajust.",
      ],
      en: [
        "Ramos Custom Guitars builds custom guitars and basses for musicians who want an instrument with its own identity.",
        "The process starts with a conversation about your sound, technique, aesthetics and real needs. From there we define woods, scale, pickups, electronics, hardware, finish and setup.",
      ],
    },
    bullets: ["Diseño desde cero", "Selección de maderas", "Electrónica y hardware", "Ajuste final personalizado"],
  },
  services: {
    eyebrow: { es: "Servicio de reparación", ca: "Servei de reparació", en: "Repair service" },
    title: { es: "Ajustes, reparación y mejora real del instrumento.", ca: "Ajustos, reparació i millora real de l'instrument.", en: "Setups, repairs and real instrument improvement." },
    image: "/assets/pages/services/binding.jpg",
    paragraphs: {
      es: [
        "El servicio de luthier cubre ajustes completos, reparación, retrasteado, electrónica, pastillas, cejuelas, restauración y personalización.",
        "La prioridad es que el instrumento afine, responda, sea cómodo y se mantenga estable en el uso real.",
      ],
      ca: [
        "El servei de luthier cobreix ajustos complets, reparació, retrastat, electrònica, pastilles, celletes, restauració i personalització.",
        "La prioritat és que l'instrument afini, respongui, sigui còmode i es mantingui estable en ús real.",
      ],
      en: [
        "The luthier service covers full setups, repairs, refrets, electronics, pickups, nuts, restoration and personalization.",
        "The priority is that the instrument tunes, responds, feels comfortable and stays stable in real use.",
      ],
    },
    bullets: ["Setup completo", "Cambio de trastes", "Pastillas handwound", "Electrónica", "Restauración", "Personalización"],
  },
  luthier: {
    eyebrow: { es: "Sobre el luthier", ca: "Sobre el luthier", en: "About the luthier" },
    title: { es: "José Ramos: oficio, experiencia y taller propio.", ca: "José Ramos: ofici, experiència i taller propi.", en: "José Ramos: craft, experience and a dedicated workshop." },
    image: "/assets/pages/luthier/me.jpg",
    paragraphs: {
      es: [
        "José Ramos es fundador y luthier principal de Ramos Custom Guitars, ubicado en Barberà del Vallès, Barcelona.",
        "Su trabajo une construcción, reparación, diseño, formación y una forma de entender la guitarra como herramienta musical viva, no solo como objeto bonito.",
      ],
      ca: [
        "José Ramos és fundador i luthier principal de Ramos Custom Guitars, situat a Barberà del Vallès, Barcelona.",
        "El seu treball uneix construcció, reparació, disseny, formació i una manera d'entendre la guitarra com a eina musical viva.",
      ],
      en: [
        "José Ramos is the founder and main luthier of Ramos Custom Guitars, based in Barberà del Vallès, Barcelona.",
        "His work brings together building, repair, design, training and a way of understanding the guitar as a living musical tool.",
      ],
    },
    bullets: ["Décadas de oficio", "Taller en Barcelona", "Formación de luthiers", "Instrumentos artesanales"],
  },
  authorized: {
    eyebrow: { es: "Centro técnico autorizado", ca: "Centre tècnic autoritzat", en: "Authorized service centers" },
    title: { es: "Respaldo técnico para instrumentos exigentes.", ca: "Suport tècnic per a instruments exigents.", en: "Technical support for demanding instruments." },
    image: "/assets/pages/authorized/taylor.png",
    paragraphs: {
      es: [
        "Ser centro técnico autorizado implica formación, pruebas y respaldo directo de fabricantes.",
        "Para el músico significa tranquilidad: el instrumento entra en manos preparadas y con criterio técnico reconocido.",
      ],
      ca: [
        "Ser centre tècnic autoritzat implica formació, proves i suport directe dels fabricants.",
        "Per al músic significa tranquil·litat: l'instrument entra en mans preparades i amb criteri tècnic reconegut.",
      ],
      en: [
        "Being an authorized technical center involves training, testing and direct support from manufacturers.",
        "For the musician it means peace of mind: the instrument is handled by prepared hands with recognized technical criteria.",
      ],
    },
    bullets: ["Taylor authorized", "Buzz Feiten", "Diagnóstico técnico", "Servicio profesional"],
  },
  hardware: {
    eyebrow: { es: "3D guitar hardware", ca: "3D guitar hardware", en: "3D guitar hardware" },
    title: { es: "Diseño 3D aplicado a guitarras y bajos.", ca: "Disseny 3D aplicat a guitarres i baixos.", en: "3D design applied to guitars and basses." },
    image: "/assets/pages/hardware/guitar-3d.png",
    paragraphs: {
      es: [
        "El diseño 3D permite crear piezas que no existen en catálogo: golpeadores, plantillas de fresado, tapas, soportes, herramientas y prototipos.",
        "Esta página queda preparada como puente hacia el futuro configurador de modificación de guitarras con visión 3D.",
      ],
      ca: [
        "El disseny 3D permet crear peces que no existeixen en catàleg: colpejadors, plantilles, tapes, suports, eines i prototips.",
        "Aquesta pàgina queda preparada com a pont cap al futur configurador de modificació de guitarres amb visió 3D.",
      ],
      en: [
        "3D design makes it possible to create parts that do not exist in catalogues: pickguards, routing templates, covers, supports, tools and prototypes.",
        "This page is prepared as a bridge toward the future guitar modification configurator with 3D vision.",
      ],
    },
    bullets: ["Golpeadores", "Plantillas", "Cubiertas", "Prototipos", "Piezas no metálicas"],
  },
  academy: {
    eyebrow: { es: "Ramos Custom Academy", ca: "Ramos Custom Academy", en: "Ramos Custom Academy" },
    title: { es: "Aprende luthería en un taller real.", ca: "Aprèn lutheria en un taller real.", en: "Learn lutherie in a real workshop." },
    image: "/assets/pages/academy/operando.jpg",
    paragraphs: {
      es: [
        "La academia nace de más de 20 años de experiencia en el sector y más de 12 años formando futuros luthiers.",
        "Los cursos están pensados para vivir el oficio: diseño, herramientas, maderas, construcción, ajustes, reparación y criterio técnico.",
      ],
      ca: [
        "L'acadèmia neix de més de 20 anys d'experiència en el sector i més de 12 anys formant futurs luthiers.",
        "Els cursos estan pensats per viure l'ofici: disseny, eines, fustes, construcció, ajustos, reparació i criteri tècnic.",
      ],
      en: [
        "The academy is built on more than 20 years in the field and over 12 years training future luthiers.",
        "The courses are designed to experience the craft: design, tools, woods, building, setups, repair and technical criteria.",
      ],
    },
    bullets: ["Construcción de guitarra", "Ajuste y reparación", "Diseño 3D", "Mentoría de taller"],
  },
};

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function write(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content, "utf8");
}

function htmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function assetImages(assetKey) {
  const dir = out("assets", "models", assetKey);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => /\.(jpe?g|png|webp|svg)$/i.test(name))
    .sort((a, b) => {
      if (a.startsWith("hero")) return -1;
      if (b.startsWith("hero")) return 1;
      return a.localeCompare(b);
    })
    .map((name) => `/assets/models/${assetKey}/${name}`);
}

function modelPath(lang, model) {
  return `/${lang}/model/${model.slugs[lang]}/`;
}

function langPathsForPage(pageKey, model = null) {
  return Object.fromEntries(
    Object.keys(langs).map((lang) => {
      const cfg = langs[lang];
      if (model) return [lang, modelPath(lang, model)];
      return [lang, cfg.paths[pageKey] || cfg.paths.home];
    })
  );
}

function shell(lang, pageKey, title, description, body, model = null) {
  const cfg = langs[lang];
  const langPaths = langPathsForPage(pageKey, model);
  const nav = cfg.nav;
  const canonical = langPaths[lang];
  const langOptions = Object.entries(langs)
    .map(([code, item]) => `<option value="${langPaths[code]}" ${code === lang ? "selected" : ""}>${item.label}</option>`)
    .join("");
  const navLinks = [
    ["home", nav.home],
    ["models", nav.models],
    ["configurator", nav.configurator],
    ["custom", nav.custom],
    ["services", nav.services],
    ["academy", nav.academy],
    ["hardware", nav.hardware],
    ["luthier", nav.luthier],
    ["blog", nav.blog],
  ]
    .map(([key, label]) => `<a href="${cfg.paths[key]}" ${pageKey === key ? 'aria-current="page"' : ""}>${label}</a>`)
    .join("");
  const configuratorHead = pageKey === "configurator" ? `\n    <link rel="stylesheet" href="/configurador.css" />` : "";
  const configuratorScript = pageKey === "configurator" ? `\n    <script type="module" src="/configurador.js"></script>` : "";

  return `<!DOCTYPE html>
<html lang="${cfg.html}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${htmlEscape(description)}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="es" href="${langPaths.es}" />
    <link rel="alternate" hreflang="ca" href="${langPaths.ca}" />
    <link rel="alternate" hreflang="en" href="${langPaths.en}" />
    <title>${htmlEscape(title)} | Ramos Custom Guitars</title>
    <link rel="icon" href="/assets/logo-ramos.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/styles.css" />
    ${configuratorHead}
  </head>
  <body data-page="${pageKey}">
    <canvas class="ambient-3d" data-ambient-3d aria-hidden="true"></canvas>
    <header class="site-header" data-header>
      <a class="brand" href="${cfg.paths.home}" aria-label="Ramos Custom Guitars">
        <img src="/assets/logo-ramos.svg" alt="Ramos Custom Guitars" />
        <span>Ramos<br />Guitars</span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" data-nav-toggle>
        <span></span><span></span><span></span>
      </button>
      <nav class="main-nav" aria-label="Main navigation" data-nav>${navLinks}</nav>
      <div class="header-actions">
        <label class="language-select" aria-label="Language">
          <select data-lang-switch>${langOptions}</select>
        </label>
        <a class="header-cta" href="${cfg.paths.contact}">${cfg.cta}</a>
      </div>
    </header>
    <main>${body}</main>
    ${footer(lang)}
    <a class="whatsapp-fab" href="https://wa.me/34747477123" aria-label="WhatsApp">WA</a>
    <div class="lightbox" aria-hidden="true" data-lightbox>
      <button type="button" aria-label="Close" data-lightbox-close>×</button>
      <img alt="" data-lightbox-image />
    </div>
    <script type="module" src="/three-scene.js"></script>
    ${configuratorScript}
    <script src="/script.js"></script>
  </body>
</html>`;
}

function footer(lang) {
  const cfg = langs[lang];
  return `<footer class="site-footer">
    <div class="footer-grid">
      <div>
        <img src="/assets/logo-ramos.svg" alt="Ramos Custom Guitars" />
        <p>Custom handmade instruments.</p>
      </div>
      <div>
        <h3>${cfg.footer.address}</h3>
        <p>c. Marquesos de Barberà, 47 Local 7<br />08210 Barberà del Vallès, Barcelona</p>
      </div>
      <div>
        <h3>${cfg.footer.contact}</h3>
        <p><a href="tel:+34747477123">+34 747 477 123</a><br /><a href="mailto:info@ramosguitars.com">info@ramosguitars.com</a></p>
      </div>
      <div>
        <h3>${cfg.footer.hours}</h3>
        <p>${cfg.footer.hoursText}</p>
      </div>
      <div>
        <h3>${cfg.footer.social}</h3>
        <p class="social-links">
          <a href="https://www.instagram.com/ramos_custom_guitars" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.facebook.com/ramosguitars" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://www.youtube.com/channel/UCCr4uHQDbmewQNTCx3eSZuQ" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://www.linkedin.com/in/ramos-guitars-02743221/" target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Ramos Guitars. ${cfg.footer.legal}</p>
      <a href="${cfg.paths.contact}">${cfg.cta}</a>
    </div>
  </footer>`;
}

function modelCards(lang, featured = false) {
  const cfg = langs[lang];
  return `<div class="${featured ? "model-showcase" : "card-grid model-grid"}">
    ${modelData
      .map((model) => {
        const images = assetImages(model.assetKey);
        const hero = images.find((img) => img.includes("/hero.")) || images[0];
        return `<article class="model-card interactive-3d reveal" data-tilt>
          <a href="${modelPath(lang, model)}" aria-label="${cfg.view} ${model.title}">
            <img src="${hero}" alt="${model.title} Ramos Guitars" loading="lazy" />
            <div>
              <p>${model.type[lang]}</p>
              <h3>${model.title}</h3>
              <span>${model.short[lang]}</span>
              <strong>${cfg.view}</strong>
            </div>
          </a>
        </article>`;
      })
      .join("")}
  </div>`;
}

function contactSection(lang) {
  const cfg = langs[lang];
  const labels = {
    es: ["Nombre", "Email", "Qué necesitas", "Mensaje", "Selecciona una opción", "Enviar consulta"],
    ca: ["Nom", "Email", "Què necessites", "Missatge", "Selecciona una opció", "Enviar consulta"],
    en: ["Name", "Email", "What do you need", "Message", "Select an option", "Send request"],
  }[lang];
  return `<section class="section-shell contact-section" id="contacta">
    <div class="contact-panel reveal">
      <div>
        <p class="eyebrow">${cfg.cta}</p>
        <h2>${lang === "en" ? "Tell us what you have in mind." : lang === "ca" ? "Explica'ns què tens al cap." : "Cuéntanos qué tienes en mente."}</h2>
        <p>${lang === "en" ? "Write to start a custom build, book a repair or ask about training." : lang === "ca" ? "Escriu per començar un projecte custom, reservar una reparació o preguntar pels cursos." : "Escríbenos para empezar un proyecto custom, reservar una reparación o preguntar por los cursos."}</p>
      </div>
      <form class="contact-form" data-contact-form>
        <label>${labels[0]}<input name="name" autocomplete="name" required /></label>
        <label>${labels[1]}<input name="email" type="email" autocomplete="email" required /></label>
        <label>${labels[2]}<select name="interest" required><option value="">${labels[4]}</option><option>Custom guitar</option><option>Luthier service</option><option>Ramos Custom Academy</option><option>3D hardware</option></select></label>
        <label>${labels[3]}<textarea name="message" rows="5" required></textarea></label>
        <button class="button button-primary" type="submit">${labels[5]}</button>
        <p class="form-status" role="status" data-form-status></p>
      </form>
    </div>
  </section>`;
}

function homePage(lang) {
  const cfg = langs[lang];
  const featuredModel = modelData.find((model) => model.id === "atlast");
  const atlastImages = assetImages(featuredModel.assetKey);
  const heroImg = "/assets/hero-atlast.png";
  const body = `<section class="hero section-shell">
    <div class="hero-copy reveal">
      <p class="eyebrow">${cfg.hero.eyebrow}</p>
      <h1>${cfg.hero.title}</h1>
      <p class="hero-text">${cfg.hero.text}</p>
      <div class="hero-actions">
        <a class="button button-primary" href="${cfg.paths.contact}">${cfg.hero.primary}</a>
        <a class="button button-secondary" href="${cfg.paths.models}">${cfg.hero.secondary}</a>
      </div>
    </div>
    <div class="hero-stage interactive-3d reveal" data-tilt>
      <div class="stage-ring"></div>
      <img src="${heroImg}" alt="Atlast Ramos Guitars" />
    </div>
  </section>

  <section class="section-shell section-heading reveal">
    <p class="eyebrow">${cfg.nav.models}</p>
    <h2>${cfg.sections.modelsTitle}</h2>
    <p>${cfg.sections.modelsText}</p>
  </section>
  <section class="section-shell no-pad-top">${modelCards(lang, true)}</section>

  <section class="section-shell split-section">
    <div class="reveal">
      <p class="eyebrow">${cfg.nav.custom}</p>
      <h2>${cfg.sections.customTitle}</h2>
      <p>${cfg.sections.customText}</p>
      <a class="button button-secondary" href="${cfg.paths.custom}">${cfg.view}</a>
    </div>
    <div class="configurator-preview interactive-3d reveal" data-configurator data-tilt>
      <img src="${atlastImages[1] || atlastImages[0]}" alt="Guitar configurator preview" data-configurator-image />
      <div class="config-controls">
        <label>Depth <input type="range" min="-18" max="18" value="8" data-depth /></label>
        <label>Rotate <input type="range" min="-28" max="28" value="-6" data-rotate /></label>
      </div>
    </div>
  </section>

  <section class="section-shell service-band">
    ${[
      ["services", cfg.sections.servicesTitle, cfg.sections.servicesText, cfg.paths.services],
      ["academy", cfg.sections.academyTitle, cfg.sections.academyText, cfg.paths.academy],
      ["hardware", cfg.sections.hardwareTitle, cfg.sections.hardwareText, cfg.paths.hardware],
      ["luthier", cfg.sections.luthierTitle, cfg.sections.luthierText, cfg.paths.luthier],
      ["authorized", pageText.authorized.title[lang], pageText.authorized.paragraphs[lang][0], cfg.paths.authorized],
    ]
      .map((item) => `<article class="info-card interactive-3d reveal" data-tilt><p class="eyebrow">${cfg.nav[item[0]]}</p><h3>${item[1]}</h3><p>${item[2]}</p><a href="${item[3]}">${cfg.view}</a></article>`)
      .join("")}
  </section>

  <section class="section-shell gallery-section">
    <div class="section-heading reveal"><p class="eyebrow">Gallery</p><h2>${lang === "en" ? "Real images, not placeholders." : lang === "ca" ? "Imatges reals, no placeholders." : "Imágenes reales, no placeholders."}</h2></div>
    <div class="gallery-grid">
      ${modelData
        .flatMap((model) => assetImages(model.assetKey).slice(1, 2).map((img) => [model.title, img]))
        .map(([title, img]) => `<button class="gallery-item reveal" type="button" data-lightbox-src="${img}"><img src="${img}" alt="${title}" loading="lazy" /></button>`)
        .join("")}
    </div>
  </section>

  <section class="section-shell reviews">
    <div class="section-heading reveal"><p class="eyebrow">${cfg.sections.reviewsTitle}</p><h2>${lang === "en" ? "Made to be played." : lang === "ca" ? "Fetes per ser tocades." : "Hechas para tocarse."}</h2></div>
    <div class="review-grid">${reviews[lang].map(([name, text]) => `<article class="review-card reveal"><p>“${text}”</p><span>${name}</span></article>`).join("")}</div>
  </section>
  ${contactSection(lang)}`;
  return shell(lang, "home", cfg.hero.title, cfg.hero.text, body);
}

function modelsPage(lang) {
  const cfg = langs[lang];
  const body = `<section class="page-hero section-shell compact">
    <p class="eyebrow">${cfg.nav.models}</p>
    <h1>${cfg.sections.modelsTitle}</h1>
    <p>${cfg.sections.modelsText}</p>
  </section>
  <section class="section-shell no-pad-top">${modelCards(lang)}</section>
  ${contactSection(lang)}`;
  return shell(lang, "models", cfg.nav.models, cfg.sections.modelsText, body);
}

function modelPage(lang, model) {
  const cfg = langs[lang];
  const images = assetImages(model.assetKey);
  const hero = images.find((img) => img.includes("/hero.")) || images[0];
  const body = `<section class="model-hero section-shell">
    <div class="model-copy reveal">
      <a class="back-link" href="${cfg.paths.models}">${cfg.backModels}</a>
      <p class="eyebrow">${model.type[lang]}</p>
      <h1>${model.title}</h1>
      <p>${model.short[lang]}</p>
      <div class="hero-actions">
        <a class="button button-primary" href="${cfg.paths.contact}">${cfg.ask}</a>
        <a class="button button-secondary" href="#galeria">Gallery</a>
      </div>
    </div>
    <div class="model-viewer interactive-3d reveal" data-tilt>
      <img src="${hero}" alt="${model.title}" data-main-gallery-image />
    </div>
  </section>

  <section class="section-shell model-detail-grid">
    <article class="rich-copy reveal">
      <p class="eyebrow">${lang === "en" ? "Model story" : lang === "ca" ? "Història del model" : "Historia del modelo"}</p>
      <h2>${lang === "en" ? "Built with a clear musical intention." : lang === "ca" ? "Construïda amb una intenció musical clara." : "Construida con una intención musical clara."}</h2>
      ${model.paragraphs[lang].map((p) => `<p>${p}</p>`).join("")}
    </article>
    <aside class="spec-card reveal">
      <p class="eyebrow">Specs</p>
      <ul>${model.specs.map((spec) => `<li>${spec}</li>`).join("")}</ul>
    </aside>
  </section>

  <section class="section-shell gallery-section" id="galeria">
    <div class="section-heading reveal"><p class="eyebrow">Gallery</p><h2>${model.title}: ${lang === "en" ? "matching image set" : lang === "ca" ? "galeria corresponent" : "galería correspondiente"}</h2></div>
    <div class="model-thumbs">${images.slice(0, 8).map((img) => `<button type="button" data-gallery-thumb="${img}"><img src="${img}" alt="${model.title}" loading="lazy" /></button>`).join("")}</div>
    <div class="gallery-grid model-gallery">${images.map((img) => `<button class="gallery-item reveal" type="button" data-lightbox-src="${img}"><img src="${img}" alt="${model.title}" loading="lazy" /></button>`).join("")}</div>
  </section>
  ${contactSection(lang)}`;
  return shell(lang, "models", `${model.title}`, model.short[lang], body, model);
}

function genericPage(lang, key) {
  const cfg = langs[lang];
  const page = pageText[key];
  const body = `<section class="page-hero section-shell">
    <div class="reveal">
      <p class="eyebrow">${page.eyebrow[lang]}</p>
      <h1>${page.title[lang]}</h1>
      <p>${page.paragraphs[lang][0]}</p>
      <div class="hero-actions"><a class="button button-primary" href="${cfg.paths.contact}">${cfg.cta}</a></div>
    </div>
    <div class="page-hero-image interactive-3d reveal" data-tilt>
      <img src="${page.image}" alt="${page.title[lang]}" />
    </div>
  </section>
  <section class="section-shell model-detail-grid">
    <article class="rich-copy reveal">
      ${page.paragraphs[lang].map((p) => `<p>${p}</p>`).join("")}
      ${key === "hardware" ? hardwarePlayground(lang) : ""}
      ${key === "academy" ? academyCards(lang) : ""}
    </article>
    <aside class="spec-card reveal">
      <p class="eyebrow">${lang === "en" ? "Includes" : lang === "ca" ? "Inclou" : "Incluye"}</p>
      <ul>${page.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
    </aside>
  </section>
  ${key === "authorized" ? authorizedLogos() : ""}
  ${key === "hardware" ? hardwareGallery() : ""}
  ${contactSection(lang)}`;
  return shell(lang, key, page.title[lang], page.paragraphs[lang][0], body);
}

function hardwarePlayground(lang) {
  return `<div class="mini-3d-lab interactive-3d" data-tilt>
    <img src="/assets/pages/hardware/pickguard.jpg" alt="3D guitar hardware" />
    <div>
      <h3>${lang === "en" ? "Interactive preview" : lang === "ca" ? "Previsualització interactiva" : "Previsualización interactiva"}</h3>
      <p>${lang === "en" ? "Move the pointer over the piece to feel depth and perspective." : lang === "ca" ? "Mou el cursor sobre la peça per notar profunditat i perspectiva." : "Mueve el cursor sobre la pieza para notar profundidad y perspectiva."}</p>
    </div>
  </div>`;
}

function academyCards(lang) {
  const items = {
    es: ["Construcción de guitarra desde cero", "Ajuste profesional", "Reparación y trastes", "Diseño aplicado al taller"],
    ca: ["Construcció de guitarra des de zero", "Ajust professional", "Reparació i trasts", "Disseny aplicat al taller"],
    en: ["Build a guitar from scratch", "Professional setup", "Repair and fretwork", "Design applied to the workshop"],
  }[lang];
  return `<div class="course-grid">${items.map((item, index) => `<article><span>0${index + 1}</span><h3>${item}</h3></article>`).join("")}</div>`;
}

function authorizedLogos() {
  return `<section class="section-shell logo-row reveal">
    <img src="/assets/pages/authorized/taylor.png" alt="Taylor authorized service" />
    <img src="/assets/pages/authorized/buzz.png" alt="Buzz Feiten authorized" />
  </section>`;
}

function hardwareGallery() {
  const imgs = ["/assets/pages/hardware/sketch.jpg", "/assets/pages/hardware/before.png", "/assets/pages/hardware/after.png"];
  return `<section class="section-shell gallery-section"><div class="gallery-grid">${imgs.map((img) => `<button class="gallery-item reveal" type="button" data-lightbox-src="${img}"><img src="${img}" alt="3D hardware" loading="lazy" /></button>`).join("")}</div></section>`;
}

function contactPage(lang) {
  const cfg = langs[lang];
  return shell(lang, "contact", cfg.nav.contact, "Contact Ramos Custom Guitars", contactSection(lang));
}

function configuratorPage(lang) {
  const cfg = langs[lang];
  const text = {
    es: {
      eyebrow: "Configurador 3D",
      title: "Diseña tu guitarra custom en tiempo real.",
      intro: "Una primera versión interactiva para elegir acabado, color, mástil y hardware antes de solicitar presupuesto. El modelo está preparado en GLTF por piezas para sustituirlo después por guitarras reales.",
      viewer: "Vista 3D del configurador Ramos",
      loading: "Cargando GLTF",
      reset: "Centrar vista",
      panel: "Opciones",
      finish: "Acabado del cuerpo",
      bodyColor: "Color personalizado del cuerpo",
      neckColor: "Color del mástil",
      hardware: "Hardware",
      bridge: "Puente",
      pickups: "Pastillas",
      tuners: "Clavijero",
      hardwareColor: "Color hardware",
      summary: "Resumen",
      json: "JSON de configuración",
      quote: "Solicitar presupuesto",
      loaded: "GLTF modular cargado",
      fallback: "Modelo simplificado activo",
      saved: "Configuración guardada para presupuesto",
    },
    ca: {
      eyebrow: "Configurador 3D",
      title: "Dissenya la teva guitarra custom en temps real.",
      intro: "Una primera versió interactiva per triar acabat, color, màstil i hardware abans de demanar pressupost. El model està preparat en GLTF per peces per substituir-lo després per guitarres reals.",
      viewer: "Vista 3D del configurador Ramos",
      loading: "Carregant GLTF",
      reset: "Centrar vista",
      panel: "Opcions",
      finish: "Acabat del cos",
      bodyColor: "Color personalitzat del cos",
      neckColor: "Color del màstil",
      hardware: "Hardware",
      bridge: "Pont",
      pickups: "Pastilles",
      tuners: "Claviller",
      hardwareColor: "Color hardware",
      summary: "Resum",
      json: "JSON de configuració",
      quote: "Demanar pressupost",
      loaded: "GLTF modular carregat",
      fallback: "Model simplificat actiu",
      saved: "Configuració guardada per pressupost",
    },
    en: {
      eyebrow: "3D Configurator",
      title: "Design your custom guitar in real time.",
      intro: "A first interactive version for choosing finish, color, neck and hardware before requesting a quote. The model is prepared as modular GLTF pieces so it can later be replaced with real guitars.",
      viewer: "Ramos configurator 3D view",
      loading: "Loading GLTF",
      reset: "Center view",
      panel: "Options",
      finish: "Body finish",
      bodyColor: "Custom body color",
      neckColor: "Neck color",
      hardware: "Hardware",
      bridge: "Bridge",
      pickups: "Pickups",
      tuners: "Tuners",
      hardwareColor: "Hardware color",
      summary: "Summary",
      json: "Configuration JSON",
      quote: "Request a quote",
      loaded: "Modular GLTF loaded",
      fallback: "Simplified model active",
      saved: "Configuration saved for quote",
    },
  }[lang];

  const copy = {
    loaded: text.loaded,
    fallback: text.fallback,
    saved: text.saved,
    summary: {
      finish: text.finish,
      bodyColor: text.bodyColor,
      neckColor: text.neckColor,
      bridge: text.bridge,
      pickups: text.pickups,
      tuners: text.tuners,
      hardwareColor: text.hardwareColor,
    },
    values: {
      natural: lang === "en" ? "Natural" : "Natural",
      black: lang === "ca" ? "Negre" : lang === "en" ? "Black" : "Negro",
      red: lang === "ca" ? "Vermell" : lang === "en" ? "Red" : "Rojo",
      sunburst: "Sunburst",
      custom: "Custom",
      hardtail: "Hardtail",
      tremolo: "Trémolo",
      humbucker: "Humbucker",
      single: "Single coil",
      active: lang === "en" ? "Active" : lang === "ca" ? "Actives" : "Activas",
      modern: lang === "en" ? "Modern" : "Moderno",
      locking: "Locking",
      vintage: "Vintage",
      chrome: "Chrome",
      gold: lang === "en" ? "Gold" : lang === "ca" ? "Daurat" : "Dorado",
    },
  };

  const finishOptions = [
    ["natural", "linear-gradient(135deg, #d49a52, #6b3516)"],
    ["black", "#050505"],
    ["red", "#8f1713"],
    ["sunburst", "radial-gradient(circle, #f0b45c 0%, #9d2a1c 48%, #070403 100%)"],
    ["custom", "linear-gradient(135deg, #c8a45d, #262626)"],
  ];
  const neckOptions = [
    ["#b77a3d", "linear-gradient(135deg, #d6a66a, #7a431d)"],
    ["#d0ae75", "linear-gradient(135deg, #f0d59b, #a16a2e)"],
    ["#5b3520", "linear-gradient(135deg, #8b5830, #28140b)"],
  ];
  const body = `<section class="section-shell configurator-page">
    <div class="configurator-intro reveal">
      <p class="eyebrow">${text.eyebrow}</p>
      <h1>${text.title}</h1>
      <p>${text.intro}</p>
    </div>

    <div class="configurator-workbench" data-guitar-configurator data-lang="${lang}" data-contact-path="${cfg.paths.contact}" data-copy="${htmlEscape(JSON.stringify(copy))}">
      <section class="configurator-canvas-panel reveal" aria-label="${text.viewer}">
        <canvas class="configurator-canvas" data-guitar-canvas></canvas>
        <div class="viewer-toolbar">
          <button type="button" data-reset-view>${text.reset}</button>
          <span data-model-status>${text.loading}</span>
        </div>
      </section>

      <aside class="configurator-panel reveal">
        <h2>${text.panel}</h2>
        <fieldset class="option-group">
          <legend>${text.finish}</legend>
          <div class="swatch-row">
            ${finishOptions.map(([value, background]) => `<button class="swatch-button" type="button" data-config-key="finish" data-config-value="${value}" aria-label="${copy.values[value]}"><span class="swatch-dot" style="background:${background}"></span></button>`).join("")}
          </div>
          <label class="configurator-field"><span class="configurator-label">${text.bodyColor}</span><input type="color" value="#7b1914" data-config-key="bodyColor" /></label>
        </fieldset>

        <fieldset class="option-group">
          <legend>${text.neckColor}</legend>
          <div class="swatch-row">
            ${neckOptions.map(([value, background]) => `<button class="swatch-button" type="button" data-config-key="neckColor" data-config-value="${value}" aria-label="${text.neckColor}"><span class="swatch-dot" style="background:${background}"></span></button>`).join("")}
          </div>
          <label class="configurator-field"><span class="configurator-label">${text.neckColor}</span><input type="color" value="#b77a3d" data-config-key="neckColor" /></label>
        </fieldset>

        <fieldset class="option-group">
          <legend>${text.hardware}</legend>
          <div class="select-grid">
            <label class="configurator-field"><span class="configurator-label">${text.bridge}</span><select data-config-key="bridge"><option value="hardtail">Hardtail</option><option value="tremolo">Trémolo</option></select></label>
            <label class="configurator-field"><span class="configurator-label">${text.pickups}</span><select data-config-key="pickups"><option value="humbucker">Humbucker</option><option value="single">Single coil</option><option value="active">${copy.values.active}</option></select></label>
            <label class="configurator-field"><span class="configurator-label">${text.tuners}</span><select data-config-key="tuners"><option value="modern">${copy.values.modern}</option><option value="locking">Locking</option><option value="vintage">Vintage</option></select></label>
            <label class="configurator-field"><span class="configurator-label">${text.hardwareColor}</span><select data-config-key="hardwareColor"><option value="chrome">Chrome</option><option value="black">${copy.values.black}</option><option value="gold">${copy.values.gold}</option></select></label>
          </div>
        </fieldset>
      </aside>

      <aside class="configurator-summary reveal">
        <h2>${text.summary}</h2>
        <ul class="summary-list" data-config-summary></ul>
        <p class="configurator-label">${text.json}</p>
        <pre class="json-output" data-config-json></pre>
        <a class="button button-primary" href="${cfg.paths.contact}?config=3d" data-request-quote>${text.quote}</a>
        <p class="quote-status" role="status" data-quote-status></p>
      </aside>
    </div>
  </section>`;
  return shell(lang, "configurator", text.title, text.intro, body);
}

function blogPath(lang, post = null) {
  return post ? `/${lang}/${post.slug}/` : langs[lang].paths.blog;
}

function blogPage(lang) {
  const cfg = langs[lang];
  const title = lang === "en" ? "Workshop notes and news" : lang === "ca" ? "Notes de taller i notícies" : "Notas de taller y noticias";
  const body = `<section class="page-hero section-shell compact">
    <p class="eyebrow">${cfg.nav.blog}</p>
    <h1>${title}</h1>
    <p>${lang === "en" ? "A small editorial space for builds, events and guitar culture." : lang === "ca" ? "Un espai editorial per a construccions, esdeveniments i cultura de guitarra." : "Un espacio editorial para construcciones, eventos y cultura de guitarra."}</p>
  </section>
  <section class="section-shell no-pad-top service-band">
    ${blogPosts.map((post) => `<article class="info-card reveal"><p class="eyebrow">Ramos Journal</p><h3>${post.title[lang]}</h3><p>${post.excerpt[lang]}</p><a href="${blogPath(lang, post)}">${cfg.view}</a></article>`).join("")}
  </section>`;
  return shell(lang, "blog", title, "Ramos Guitars blog", body);
}

function blogPostPage(lang, post) {
  const cfg = langs[lang];
  const body = `<section class="page-hero section-shell compact">
    <p class="eyebrow">Ramos Journal</p>
    <h1>${post.title[lang]}</h1>
    <p>${post.excerpt[lang]}</p>
    <div class="hero-actions"><a class="button button-secondary" href="${cfg.paths.blog}">${cfg.nav.blog}</a></div>
  </section>
  <section class="section-shell rich-copy">
    <p>${post.excerpt[lang]}</p>
    <p>${lang === "en" ? "This local version keeps the editorial route present so the site architecture is closer to the original Ramos Guitars website. Full long-form articles can be expanded later with the original photos and text." : lang === "ca" ? "Aquesta versió local manté la ruta editorial perquè l'arquitectura sigui més propera a la web original de Ramos Guitars. Els articles llargs es poden ampliar després amb fotos i text originals." : "Esta versión local mantiene la ruta editorial para que la arquitectura se parezca más a la web original de Ramos Guitars. Los artículos largos se pueden ampliar después con fotos y texto originales."}</p>
  </section>`;
  return shell(lang, "blog", post.title[lang], post.excerpt[lang], body);
}

for (const lang of Object.keys(langs)) {
  write(out(lang, "index.html"), homePage(lang));
  write(out(lang, "models", "index.html"), modelsPage(lang));
  write(out(lang, "blog", "index.html"), blogPage(lang));
  {
    const configuratorPath = langs[lang].paths.configurator.replace(/^\/+/, "");
    const page = configuratorPage(lang);
    write(out(configuratorPath, "index.html"), page);
    write(out(configuratorPath, "configurador.html"), page);
  }
  write(out(lang, "contacto", "index.html"), contactPage(lang));
  write(out(lang, "contacte", "index.html"), contactPage(lang));
  write(out(lang, "contact", "index.html"), contactPage(lang));

  for (const [key, page] of Object.entries(pageText)) {
    const pagePath = langs[lang].paths[key];
    const relative = pagePath.replace(/^\/+/, "");
    write(out(relative, "index.html"), genericPage(lang, key));
  }

  for (const model of modelData) {
    write(out(lang, "model", model.slugs[lang], "index.html"), modelPage(lang, model));
  }

  for (const post of blogPosts) {
    write(out(lang, post.slug, "index.html"), blogPostPage(lang, post));
  }
}

write(out("index.html"), homePage("es"));
write(out("configurador.html"), configuratorPage("es"));
