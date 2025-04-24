import { useEffect, useState } from "react";
import { getProjects } from "../services/api";

// Type adapté à la structure réelle
type ProjectImage = {
  id: number;
  name: string;
  url?: string;
  formats?: {
    thumbnail: {
      url: string;
    };
  };
  // autres propriétés possibles
};

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  client: string;
  year: string;
  image: ProjectImage;
  // autres propriétés
};

export const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        console.log("Données reçues:", data);
        setProjects(data || []);
      } catch (err) {
        setError("Erreur lors du chargement des projets");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Reset selected project when category changes
    setSelectedProject(null);
  }, [selectedCategory]);

  if (isLoading) {
    return <div className="flex justify-center py-12">Chargement...</div>;
  }

  if (error) {
    return <div className="py-12 text-center text-red-500">{error}</div>;
  }

  if (!projects || projects.length === 0) {
    return <div className="py-12 text-center">Aucun projet trouvé.</div>;
  }

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
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md group hover:shadow-xl"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden cursor-pointer h-60">
                {project.image ? (
                  <img
                    src={`http://localhost:1337${project.image.url}`}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200">
                    <span>Image non disponible</span>
                  </div>
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
          ))}
        </div>

        {/* Modal pour projet sélectionné */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Contenu détaillé du projet */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-72 md:h-full">
                  {selectedProject.image && selectedProject.image.url ? (
                    <img
                      src={`http://localhost:1337${selectedProject.image.url}`}
                      alt={selectedProject.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200">
                      <span>Image non disponible</span>
                    </div>
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
    </section>
  );
};
