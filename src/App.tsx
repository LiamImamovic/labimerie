import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Building2,
  Check,
  ChevronRight,
  FileCheck2,
  FileImage,
  Presentation,
  Send,
  X,
} from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const LazyPartnersBanner = lazy(() => import("./components/PartnersBanner"));
const LazyContact = lazy(() => import("./components/Contact"));
const LazyHeader = lazy(() => import("./components/Header"));
const LazyPortfolio = lazy(() =>
  import("./components/Portfolio").then((module) => ({
    default: module.Portfolio,
  })),
);

export const ComponentLoader = () => (
  <div className="flex items-center justify-center w-full h-64">
    <div className="w-8 h-8 border-4 rounded-full border-accent/20 border-t-accent animate-spin"></div>
  </div>
);

const Hero = () => {
  return (
    <section
      id="accueil"
      className="relative flex items-center justify-center min-h-screen"
    >
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1618385455730-2571c38966b7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/70"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative max-w-4xl px-4 mx-auto text-center"
      >
        <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl md:mb-6">
          L'art du numérique, taillé sur mesure
        </h1>
        <p className="mb-6 text-lg text-gray-200 sm:text-xl md:text-2xl md:mb-8">
          Optimisez votre workflow BIM avec un consultant expérimenté
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 btn-primary"
          aria-label="Démarrer votre projet"
          onClick={() => {
            window.location.href = "#contact";
          }}
        >
          Démarrer votre projet
        </motion.button>
      </motion.div>

      <div className="absolute flex items-center justify-center p-1 transition-all duration-300 transform -translate-x-1/2 rounded-full bottom-4 sm:bottom-6 md:bottom-8 left-1/2 hover:bg-accent/20">
        <a
          href="#à-propos"
          aria-label="Scroll to next section"
          className="flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-white rotate-90 sm:w-8 sm:h-8 md:w-12 md:h-12" />
        </a>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="à-propos" className="section-padding bg-light">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative order-2 overflow-hidden rounded-lg shadow-xl group md:order-1">
          <img
            src="/images/thomas.JPEG"
            alt="Portrait du consultant BIM"
            className="object-cover w-full h-auto transition-all duration-700 rounded-lg shadow-md group-hover:scale-105 group-hover:saturate-110"
            loading="lazy"
            width="800"
            height="600"
          />
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-primary/60 to-transparent group-hover:opacity-100"></div>
        </div>

        <div className="order-1 md:order-2">
          <h2 className="relative inline-block mb-4 text-2xl font-bold sm:text-3xl text-primary sm:mb-6">
            5 ans d'expertise en BIM
            <span className="absolute bottom-0 left-0 w-1/2 h-1 rounded-full bg-accent"></span>
          </h2>
          <p className="mb-6 text-base sm:text-lg">
            Ingénieur Génie civil Spécialisé en numérique pour la construction,
            j'accompagne les professionnels de la construction dans leur
            transition vers le numérique en les aidant dans leurs démarches BIM.
          </p>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold sm:text-xl text-primary">
              Certifications
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "BTS Géomètre topographe et modélisation numérique",
                "Licence BIM",
                "Master Ingénierie numérique - BIM",
              ].map((cert, index) => (
                <motion.li
                  key={cert}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-2 p-2 transition-shadow duration-300 bg-white rounded-lg shadow-sm sm:gap-3 sm:p-3 hover:shadow-md"
                >
                  <span className="p-1.5 sm:p-2 text-white rounded-full bg-accent">
                    <FileCheck2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                  <span className="text-sm sm:text-base">{cert}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedService, setSelectedService] = useState<{
    icon: JSX.Element;
    title: string;
    description: string;
    longDescription?: string;
    features?: string[];
  } | null>(null);

  const services = [
    {
      icon: <Building2 className="w-10 h-10 sm:w-12 sm:h-12" />,
      title: "Modélisation BIM",
      description:
        "Des modèles clairs et organisés pour tous vos projets, neufs ou en rénovation.",
      longDescription:
        "Je modélise vos projets en BIM pour qu'ils soient faciles à lire, à partager et à coordonner. L'objectif est de fluidifier la communication entre les intervenants, d'éviter les erreurs sur le chantier et de gagner un temps précieux à chaque étape du projet.",
      features: [
        "Modélisation architecturale pour projets neufs et rénovations",
        "Utilisation de normes et conventions BIM",
        "Coordination interdisciplinaire facilitée",
        "Documentation claire et centralisée",
        "Optimisation des flux de travail BIM",
      ],
    },
    {
      icon: <FileImage className="w-10 h-10 sm:w-12 sm:h-12" />,
      title: "Infographie & Rendu Réaliste",
      description:
        "Des visuels 3D percutants pour valoriser vos idées et convaincre vos clients.",
      longDescription:
        "Je crée des rendus 3D réalistes et soignés pour mettre en valeur vos projets. Que ce soit pour une présentation client, une mise en vente ou un concours, je vous aide à capter l'attention avec des visuels impactants. Je peux aussi intervenir ponctuellement pour soulager vos équipes en cas de surcharge.",
      features: [
        "Rendus réalistes haute qualité",
        "Mise en valeur des matériaux et de la lumière",
        "Animation et vues immersives possibles",
        "Formats adaptés à vos supports de présentation",
        "Collaboration souple en sous-traitance",
      ],
    },
    {
      icon: <Presentation className="w-10 h-10 sm:w-12 sm:h-12" />,
      title: "Gestion de Projet BIM",
      description:
        "Structuration et coordination de projets BIM pour un déroulement fluide et maîtrisé.",
      longDescription:
        "Je vous accompagne dans la gestion de vos projets BIM, de la structuration des maquettes à la coordination entre disciplines. L'objectif : anticiper les problèmes, fluidifier les échanges, et faire avancer le projet sans accroc, tout en garantissant la qualité et la cohérence des livrables.",
      features: [
        "Mise en place de la stratégie BIM",
        "Organisation et structuration des maquettes",
        "Détection et gestion des conflits",
        "Suivi des échanges entre intervenants",
        "Assistance à la coordination BIM",
      ],
    },
    {
      icon: <FileCheck2 className="w-10 h-10 sm:w-12 sm:h-12" />,
      title: "Relevé de l'Existant",
      description:
        "Création de modèles 3D précis à partir de l'existant pour vos projets de rénovation ou d'extension.",
      longDescription:
        "Je réalise des relevés de bâtiments existants via mesures terrain ou à partir de nuages de points, pour produire des modèles 3D à jour et exploitables. C'est un outil clé pour bien démarrer un projet de rénovation ou une étude de faisabilité, avec une base fiable et complète.",
      features: [
        "Relevés sur site ou exploitation de nuages de points",
        "Modélisation fidèle de l'existant",
        "Formats compatibles avec votre environnement BIM",
        "Support pour études de faisabilité",
        "Base de travail fiable pour rénovation ou extension",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="section-padding bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="relative inline-block mx-auto mb-8 text-2xl font-bold text-center sm:text-3xl sm:mb-12 text-primary">
          <span className="relative">
            Nos Services
            <span className="absolute bottom-0 h-1 rounded-full left-1/4 right-1/4 bg-accent"></span>
          </span>
        </h2>

        <div ref={ref} className="grid gap-6 sm:gap-8 sm:grid-cols-2">
          {services.map((service) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
              className="pl-3 transition-all duration-300 border-l-2 sm:pl-4 service-card group hover:border-accent hover:border-l-4"
            >
              <div className="mb-3 transition-transform duration-300 transform sm:mb-4 text-accent ">
                {service.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold sm:text-xl sm:mb-3 text-primary">
                {service.title}
              </h3>
              <p className="mb-3 text-sm text-gray-600 sm:text-base sm:mb-4">
                {service.description}
              </p>
              <button
                className="flex items-center gap-1 text-sm font-semibold transition-all sm:text-base text-accent group-hover:gap-3"
                onClick={() => setSelectedService(service)}
              >
                En savoir plus{" "}
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal pour afficher les détails du service */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative flex flex-col w-full max-w-4xl max-h-[90vh] overflow-auto rounded-lg bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute p-1 transition-colors duration-300 rounded-full right-4 top-4 bg-white/80 hover:bg-accent hover:text-white"
                onClick={() => setSelectedService(null)}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-accent/10 text-accent">
                    {selectedService.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-primary">
                    {selectedService.title}
                  </h2>
                </div>

                <div className="mb-6 space-y-4">
                  <p className="text-gray-700">
                    {selectedService.longDescription}
                  </p>

                  {selectedService.features && (
                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-primary">
                        Caractéristiques principales :
                      </h3>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {selectedService.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="flex-shrink-0 p-1 rounded-full bg-accent/20 text-accent">
                              <Check className="w-4 h-4" />
                            </span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all duration-300 rounded-full bg-accent hover:bg-accent/90"
                  onClick={() => {
                    window.location.href = "#contact";
                    setSelectedService(null);
                  }}
                >
                  Demander ce service <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 text-white sm:py-12 bg-primary">
      <div className="container px-4 mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="relative inline-block mb-3 text-lg font-bold sm:text-xl sm:mb-4">
              labimerie
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-accent"></span>
            </h3>
            <p className="text-sm text-gray-300 sm:text-base">
              L'art du numérique, taillé sur mesure
            </p>
            <div className="mt-3 sm:mt-4">
              <a
                href="#accueil"
                className="inline-block px-3 py-1.5 mt-2 text-xs transition-colors duration-300 rounded-full sm:text-sm sm:px-4 sm:py-2 sm:mt-4 btn-accent bg-accent/20 hover:bg-accent/30"
              >
                Retour en haut ↑
              </a>
            </div>
          </div>

          <div>
            <h3 className="relative inline-block mb-3 text-lg font-bold sm:text-xl sm:mb-4">
              Liens rapides
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-accent"></span>
            </h3>
            <ul className="grid grid-cols-2 gap-2 sm:space-y-2 sm:block">
              {[
                { name: "Accueil", href: "#accueil" },
                { name: "À propos", href: "#à-propos" },
                { name: "Services", href: "#services" },
                { name: "Travaux réalisés", href: "#travaux-réalisés" },
                { name: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center text-xs text-gray-300 transition-all duration-300 sm:text-base hover:text-white hover:translate-x-1"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold sm:text-xl sm:mb-4">
              Suivez-nous
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-4 sm:flex-nowrap">
              <motion.a
                href="https://www.linkedin.com/in/thomas-peyrondet-bazile-4736b4205"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-2 py-1.5 text-xs transition-colors rounded-md sm:text-sm sm:px-3 sm:py-2 text-gray-300 hover:text-white hover:bg-accent/20"
                aria-label="LinkedIn"
              >
                LinkedIn
              </motion.a>
              <motion.a
                href="https://www.instagram.com/la_bimerie/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-2 py-1.5 text-xs transition-colors rounded-md sm:text-sm sm:px-3 sm:py-2 text-gray-300 hover:text-white hover:bg-accent/20"
                aria-label="Instagram"
              >
                Instagram
              </motion.a>
              <motion.a
                href="https://www.malt.fr/profile/thomaspeyrondetbazile?overview"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-2 py-1.5 text-xs transition-colors rounded-md sm:text-sm sm:px-3 sm:py-2 text-gray-300 hover:text-white hover:bg-accent/20"
                aria-label="Malt"
              >
                Malt
              </motion.a>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 text-xs text-center text-gray-300 border-t border-gray-700 sm:text-sm sm:pt-8 sm:mt-8">
          <p>© {currentYear} labimerie. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

const SmoothScroll = () => {
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
        const targetId = target.getAttribute("href");
        const targetElement = document.querySelector(targetId || "");

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Update URL without page reload
          window.history.pushState(null, "", targetId);
        }
      }
    };

    // Add event listener
    document.addEventListener("click", handleLinkClick);

    // Cleanup
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  return null;
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed z-40 p-2 text-white rounded-full shadow-lg sm:p-3 bottom-4 right-4 sm:bottom-8 sm:right-8 bg-accent focus:outline-none"
          aria-label="Retour en haut"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-[-90deg]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-primary z-[100]"
        >
          <div className="flex flex-col items-center">
            <img
              src="/images/logo_labimerie.png"
              alt="labimerie logo"
              className="w-20 h-20"
            />
            <motion.div
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-1 mt-4 rounded-full bg-accent"
              style={{ width: "200px" }}
            />
            <p className="mt-4 text-white font-montserrat">Chargement...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="mb-2 text-2xl font-bold">
            Oups! Quelque chose s'est mal passé
          </h2>
          <p className="mb-4 text-gray-600">
            Nous travaillons à résoudre ce problème.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Rafraîchir la page
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const App = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <PageLoader />
        <SmoothScroll />
        <Suspense fallback={<ComponentLoader />}>
          <LazyHeader />
        </Suspense>
        <main>
          <Hero />
          <About />
          <Services />
          <Suspense fallback={<ComponentLoader />}>
            <div className="min-h-screen">
              <LazyPortfolio />
            </div>
          </Suspense>
          <Suspense fallback={<ComponentLoader />}>
            <div className="">
              <LazyPartnersBanner />
            </div>
          </Suspense>
          <Suspense fallback={<ComponentLoader />}>
            <LazyContact />
          </Suspense>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  );
};

export default App;
