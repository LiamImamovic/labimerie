import { useEffect, useState } from "react";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  client: string;
  year: string;
  documentId: string;
  objectives: string[];
  deliverables: string[];
  surface: string;
  software: string[];
  missions: string[];
  image: {
    url: string;
    formats: {
      thumbnail: { url: string };
      small: { url: string };
      medium: { url: string };
      large: { url: string };
    };
  };
};

// Projets réels de La Bimerie
const REAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: "RENDU 3D D'UNE MAISON SIMPLE",
    category: "Modélisation 3D",
    description:
      "Dans le cadre de ce projet, La Bimerie a conçu les plans de base, réalisé la modélisation 3D de la maison, puis développé un environnement réaliste sous Twinmotion pour permettre au client de mieux se projeter dans son futur aménagement extérieur. L'objectif : proposer un rendu simple, lisible et immersif.",
    client: "Particulier",
    year: "2024",
    documentId: "1",
    objectives: [
      "Créer un modèle 3D à partir des plans fournis",
      "Générer un rendu visuel immersif du jardin et de la terrasse",
      "Offrir au client une vision claire de son projet d'aménagement",
    ],
    deliverables: [
      "Maquette Revit du bâti",
      "Rendu réaliste avec environnement extérieur",
      "Vues fixes pour communication client",
    ],
    surface: "~200 m²",
    software: ["Revit", "Twinmotion", "AutoCAD"],
    missions: ["Modélisation", "rendu réaliste"],
    image: {
      url: "https://picsum.photos/800/600?random=1",
      formats: {
        thumbnail: { url: "https://picsum.photos/200/200?random=1" },
        small: { url: "https://picsum.photos/400/300?random=1" },
        medium: { url: "https://picsum.photos/600/400?random=1" },
        large: { url: "https://picsum.photos/800/600?random=1" },
      },
    },
  },
  {
    id: 2,
    title: "CENTRE DE TRI",
    category: "BIM Industriel",
    description:
      "J'ai assuré l'ensemble du processus, de l'acquisition des données à la modélisation 3D finale, pour ce centre de tri industriel de 3 000 m². Le projet a mobilisé des compétences en repérage terrain, en exploitation de données techniques et en production BIM structurée, afin de livrer une maquette exploitable pour les études futures.",
    client: "Projet professionnel (site industriel)",
    year: "2024",
    documentId: "2",
    objectives: [
      "Relever et exploiter les données d'un site industriel",
      "Produire une maquette Revit propre et structurée",
      "Fournir une base technique pour analyses ou interventions",
    ],
    deliverables: [
      "Maquette Revit complète du bâtiment et de ses volumes",
      "Structuration du modèle pour usage métier",
      "Extractions de vues et livrables adaptés",
    ],
    surface: "~3 000 m²",
    software: ["Revit", "AutoCAD", "BimCollab"],
    missions: ["Relevé", "modélisation", "structuration BIM"],
    image: {
      url: "https://picsum.photos/800/600?random=2",
      formats: {
        thumbnail: { url: "https://picsum.photos/200/200?random=2" },
        small: { url: "https://picsum.photos/400/300?random=2" },
        medium: { url: "https://picsum.photos/600/400?random=2" },
        large: { url: "https://picsum.photos/800/600?random=2" },
      },
    },
  },
  {
    id: 3,
    title: "CENTRE CULTUREL POLYVALENT",
    category: "Gestion BIM",
    description:
      "Dans le cadre de ce projet de fin d'études, j'ai assuré la gestion BIM globale pour une équipe pluridisciplinaire, en supervisant la coordination des maquettes, la structuration des livrables et la cohérence technique tout au long du processus. Le projet intégrait également une démarche de développement durable, à travers des choix constructifs et environnementaux réfléchis.",
    client: "Projet académique (travail de groupe – fin d'études)",
    year: "2024",
    documentId: "3",
    objectives: [
      "Coordonner l'ensemble du processus BIM pour l'équipe projet",
      "Produire des rendus visuels de qualité pour la communication",
      "Intégrer les principes de durabilité dès la conception",
    ],
    deliverables: [
      "Maquette Revit complète (architecture, aménagements, technique)",
      "Synthèse et coordination via Navisworks et BimCollab",
      "Rendus visuels du projet",
    ],
    surface: "~3 500 m²",
    software: ["Revit", "AutoCAD", "Navisworks", "BimCollab"],
    missions: ["Gestion BIM", "rendu", "management d'équipe"],
    image: {
      url: "https://picsum.photos/800/600?random=3",
      formats: {
        thumbnail: { url: "https://picsum.photos/200/200?random=3" },
        small: { url: "https://picsum.photos/400/300?random=3" },
        medium: { url: "https://picsum.photos/600/400?random=3" },
        large: { url: "https://picsum.photos/800/600?random=3" },
      },
    },
  },
  {
    id: 4,
    title: "BILIÈRE – MISSION DE RELEVÉ ET MODÉLISATION",
    category: "Relevé BIM",
    description:
      "Je suis intervenue sur un ensemble résidentiel de 200 logements répartis sur 10 000 m², incluant les bâtiments, le parking et le terrain environnant. La mission comprenait un relevé sur site, suivi d'une modélisation BIM complète.",
    client: "Promoteur immobilier",
    year: "2024",
    documentId: "4",
    objectives: [
      "Réaliser une maquette fidèle à partir d'un existant complexe",
      "Structurer les données pour exploitation en phase de réhabilitation",
      "Permettre une visualisation claire pour les études futures",
    ],
    deliverables: [
      "Maquette Revit (bâtiments + aménagements extérieurs)",
      "Coordination via BimCollab",
      "Extraction de vues, nomenclatures et quantitatifs",
    ],
    surface: "~10 000 m²",
    software: ["Revit", "AutoCAD", "BimCollab"],
    missions: ["relevé + modélisation"],
    image: {
      url: "https://picsum.photos/800/600?random=4",
      formats: {
        thumbnail: { url: "https://picsum.photos/200/200?random=4" },
        small: { url: "https://picsum.photos/400/300?random=4" },
        medium: { url: "https://picsum.photos/600/400?random=4" },
        large: { url: "https://picsum.photos/800/600?random=4" },
      },
    },
  },
  {
    id: 5,
    title: "CENTRE CULTUREL POLYVALENT 2",
    category: "Projet Académique",
    description:
      "Dans le cadre de son projet de fin d'études, j'ai assuré la modélisation complète d'un centre culturel de 2 000 m², en intégrant l'architecture, la structure, le système climatique et le terrain environnant.",
    client: "Projet académique (Licence BIM)",
    year: "2024",
    documentId: "5",
    objectives: [
      "Concevoir un modèle BIM multidisciplinaire",
      "Visualiser le bâtiment en environnement réaliste",
      "Simuler les interactions techniques et les phases de coordination",
    ],
    deliverables: [
      "Maquette Revit complète",
      "Rendu réaliste Twinmotion",
      "Coordination via Navisworks et BimCollab",
    ],
    surface: "~2 000 m²",
    software: ["Revit", "AutoCAD", "Twinmotion"],
    missions: ["Projet académique (Licence BIM)"],
    image: {
      url: "https://picsum.photos/800/600?random=5",
      formats: {
        thumbnail: { url: "https://picsum.photos/200/200?random=5" },
        small: { url: "https://picsum.photos/400/300?random=5" },
        medium: { url: "https://picsum.photos/600/400?random=5" },
        large: { url: "https://picsum.photos/800/600?random=5" },
      },
    },
  },
  {
    id: 6,
    title: "PROJET DE DÉMOLITION DE PONT",
    category: "Infrastructure",
    description:
      "Dans le cadre d'un projet pour le département de la Dordogne, j'ai assuré la modélisation structurelle d'un pont existant, ainsi que la reconstitution du terrain naturel environnant. Ce travail a permis de simuler les phases de démolition en anticipant les impacts techniques liés aux structures à retirer.",
    client: "Département de la Dordogne",
    year: "2024",
    documentId: "6",
    objectives: [
      "Documenter les ouvrages existants avec précision",
      "Modéliser les supports topographiques et environnementaux",
      "Organiser les étapes de démolition en phases claires et séquencées",
    ],
    deliverables: [
      "Maquette Revit de l'ouvrage",
      "Phasage de démolition modélisé",
      "Support de coordination sur BimCollab",
    ],
    surface: "~10 000 m²",
    software: ["Revit", "BimCollab", "AutoCAD"],
    missions: ["Modélisation structurelle", "phasage de démolition"],
    image: {
      url: "https://picsum.photos/800/600?random=6",
      formats: {
        thumbnail: { url: "https://picsum.photos/200/200?random=6" },
        small: { url: "https://picsum.photos/400/300?random=6" },
        medium: { url: "https://picsum.photos/600/400?random=6" },
        large: { url: "https://picsum.photos/800/600?random=6" },
      },
    },
  },
  {
    id: 7,
    title: "RENDU 3D – AMÉNAGEMENT D'ENTRÉE DE JARDIN",
    category: "Paysagisme",
    description:
      "Dans le cadre d'un partenariat avec l'entreprise de paysagisme PLANTA-SERVICES, La Bimerie a conçu deux propositions de modélisation 3D pour l'entrée d'un jardin privé. L'objectif était de faciliter le choix final du client en visualisant les solutions d'aménagement de manière réaliste.",
    client: "Planta-Services",
    year: "2024",
    documentId: "7",
    objectives: [
      "Valoriser les propositions de l'entreprise paysagiste",
      "Créer une visualisation claire et immersive des aménagements",
      "Aider à la décision client avec des rendus comparatifs",
    ],
    deliverables: [
      "Modélisation sous Revit",
      "Rendus réalistes via Twinmotion",
      "Plans techniques sur Autocad",
    ],
    surface: "~30 m²",
    software: ["Revit", "Twinmotion", "Autocad"],
    missions: ["Modélisation", "rendu réaliste"],
    image: {
      url: "https://picsum.photos/800/600?random=7",
      formats: {
        thumbnail: { url: "https://picsum.photos/200/200?random=7" },
        small: { url: "https://picsum.photos/400/300?random=7" },
        medium: { url: "https://picsum.photos/600/400?random=7" },
        large: { url: "https://picsum.photos/800/600?random=7" },
      },
    },
  },
  {
    id: 8,
    title: "RÉAMÉNAGEMENT INTÉRIEUR",
    category: "Aménagement Intérieur",
    description:
      "Pour une chocolaterie artisanale située à Bordeaux, La Bimerie a réalisé un relevé d'intérieur, la modélisation 3D de l'existant et proposé trois scénarios d'aménagement optimisés du laboratoire.",
    client: "Chocolaterie Origines",
    year: "2024",
    documentId: "8",
    objectives: [
      "Améliorer la circulation et la lisibilité des zones de travail",
      "Optimiser l'intégration du mobilier et des équipements professionnels",
      "Séparer les espaces critiques (plonge, stockage, cuisson)",
    ],
    deliverables: [
      "Plans 2D annotés et légendés",
      "Propositions 3D immersives",
      "Analyse technique et recommandations",
    ],
    surface: "30 m²",
    software: ["Revit", "AutoCAD"],
    missions: ["Relevé et modélisation 3D"],
    image: {
      url: "https://picsum.photos/800/600?random=8",
      formats: {
        thumbnail: { url: "https://picsum.photos/200/200?random=8" },
        small: { url: "https://picsum.photos/400/300?random=8" },
        medium: { url: "https://picsum.photos/600/400?random=8" },
        large: { url: "https://picsum.photos/800/600?random=8" },
      },
    },
  },
];

export const Portfolio = () => {
  const [projects] = useState<Project[]>(REAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  useEffect(() => {
    setSelectedProject(null);
  }, [selectedCategory]);

  // Extraire les catégories
  const categories = [
    "Tous",
    ...Array.from(
      new Set(projects.filter((p) => p?.category).map((p) => p.category)),
    ),
  ];

  const filteredProjects =
    selectedCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="travaux-réalisés" className="bg-white section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <div className="p-4">
            <h2 className="relative inline-block mx-auto mb-12 text-3xl font-bold text-center text-primary">
              <span className="relative">
                Travaux Réalisés
                <span className="absolute bottom-0 h-1 rounded-full left-1/4 right-1/4 bg-accent"></span>
              </span>
            </h2>

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full md:text-base ${
                    selectedCategory === category
                      ? "bg-accent text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Grille de projets */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => {
                const imageUrl = project.image?.url;

                return (
                  <div
                    key={project.id}
                    className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md group hover:shadow-xl"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative overflow-hidden cursor-pointer h-60">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={project.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          width={800}
                          height={600}
                        />
                      )}
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-primary/80 to-transparent group-hover:opacity-100"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 transform translate-y-4 bg-white rounded-full text-primary group-hover:translate-y-0">
                          Voir détails
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-md text-accent-dark bg-accent/10">
                        {project.category}
                      </span>
                      <h3 className="mb-2 text-lg font-bold text-primary">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal pour projet sélectionné - VERSION AMÉLIORÉE */}
            {selectedProject && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
                onClick={() => setSelectedProject(null)}
              >
                <div
                  className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Bouton de retour */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute z-10 p-2 text-white transition-colors rounded-full top-4 right-4 bg-primary/80 hover:bg-primary"
                    aria-label="Fermer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Contenu détaillé du projet */}
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-72 lg:h-full">
                      {selectedProject.image?.url && (
                        <img
                          src={selectedProject.image.url}
                          alt={selectedProject.title}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <h2 className="mb-2 text-2xl font-bold text-primary">
                          {selectedProject.title}
                        </h2>
                        <span className="inline-block px-3 py-1 text-sm font-medium rounded-full text-accent-dark bg-accent/10">
                          {selectedProject.category}
                        </span>
                      </div>

                      <p className="leading-relaxed text-gray-700">
                        {selectedProject.description}
                      </p>

                      {/* Objectifs */}
                      <div>
                        <h4 className="flex items-center gap-2 mb-3 text-lg font-semibold text-primary">
                          🎯 Objectifs
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {selectedProject.objectives.map(
                            (objective, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <span className="text-accent">–</span>
                                {objective}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      {/* Livrables */}
                      <div>
                        <h4 className="flex items-center gap-2 mb-3 text-lg font-semibold text-primary">
                          📦 Livrables
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {selectedProject.deliverables.map(
                            (deliverable, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <span className="text-accent">–</span>
                                {deliverable}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      {/* Informations techniques */}
                      <div className="grid grid-cols-1 gap-4 p-4 rounded-lg bg-gray-50">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="flex items-center gap-1 text-sm font-semibold text-gray-500">
                              📐 Superficie
                            </h4>
                            <p className="font-medium text-primary">
                              {selectedProject.surface}
                            </p>
                          </div>
                          <div>
                            <h4 className="flex items-center gap-1 text-sm font-semibold text-gray-500">
                              👥 Client
                            </h4>
                            <p className="font-medium text-primary">
                              {selectedProject.client}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="flex items-center gap-1 mb-2 text-sm font-semibold text-gray-500">
                            🧰 Logiciels
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.software.map((soft, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs font-medium rounded bg-accent/20 text-accent-dark"
                              >
                                {soft}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="flex items-center gap-1 mb-2 text-sm font-semibold text-gray-500">
                            📋 Missions réalisées
                          </h4>
                          <p className="text-sm font-medium text-primary">
                            {selectedProject.missions.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
