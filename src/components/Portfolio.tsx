import { useEffect, useState } from "react";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  client: string;
  year: string;
  documentId: string;
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

// Ajout des données mockées en haut du fichier après les types
const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Projet 1",
    category: "Web Design",
    description:
      "Description détaillée du projet 1 avec plusieurs lignes de texte pour montrer un exemple réaliste de contenu.",
    client: "Client A",
    year: "2024",
    documentId: "1",
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
    title: "Projet 2",
    category: "Développement",
    description:
      "Description détaillée du projet 2 qui montre un autre exemple de projet en cours de développement.",
    client: "Client B",
    year: "2024",
    documentId: "2",
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
    title: "Projet 3",
    category: "Marketing",
    description:
      "Un troisième projet pour montrer la diversité des catégories et des contenus disponibles.",
    client: "Client C",
    year: "2024",
    documentId: "3",
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
];

export const Portfolio = () => {
  const [projects] = useState<Project[]>(MOCK_PROJECTS);
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
          {/* Banner En Construction */}
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="px-6 py-4 text-lg font-bold text-center rounded-lg shadow-lg text-primary bg-white/90">
              🚧 En Construction 🚧
            </div>
          </div>

          {/* Contenu existant avec effet de flou */}
          <div className="filter blur-[4px] pointer-events-none p-4">
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
                // Use the direct image URL
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

            {/* Modal pour projet sélectionné */}
            {selectedProject && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
                onClick={() => setSelectedProject(null)}
              >
                <div
                  className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto relative"
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
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-72 md:h-full">
                      {selectedProject.image?.url && (
                        <img
                          src={selectedProject.image.url}
                          alt={selectedProject.title}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h2 className="mb-4 text-2xl font-bold text-primary">
                        {selectedProject.title}
                      </h2>
                      <p className="mb-4 text-gray-700">
                        {selectedProject.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gray-50">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500">
                            Client
                          </h4>
                          <p className="font-medium text-primary">
                            {selectedProject.client}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500">
                            Année
                          </h4>
                          <p className="font-medium text-primary">
                            {selectedProject.year}
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
