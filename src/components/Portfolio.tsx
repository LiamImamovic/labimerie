import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Send, X } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  client: string;
  year: string;
};

const projects: Project[] = [
  {
    id: "projet-1",
    title: "Tour Résidentielle Horizon",
    category: "Modélisation BIM",
    image:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&q=80&w=800&h=600",
    description:
      "Modélisation BIM complète d'une tour résidentielle de 32 étages avec coordination MEP avancée.",
    client: "Groupe Immobilier Métropole",
    year: "2023",
  },
  {
    id: "projet-2",
    title: "Campus Universitaire Nova",
    category: "Coordination BIM",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800&h=600",
    description:
      "Coordination BIM multi-disciplinaire pour un campus universitaire de 5 bâtiments sur 12 hectares.",
    client: "Université Technologique",
    year: "2022",
  },
  {
    id: "projet-3",
    title: "Hôpital Central",
    category: "Gestion BIM",
    image:
      "https://images.unsplash.com/photo-1538685634737-24b83e3fa2f8?auto=format&fit=crop&q=80&w=800&h=600",
    description:
      "Mise en place d'un workflow BIM collaboratif pour la construction d'un hôpital de 250 lits.",
    client: "Centre Hospitalier Régional",
    year: "2022",
  },
  {
    id: "projet-4",
    title: "Rénovation Quartier Historique",
    category: "Numérisation 3D",
    image:
      "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&q=80&w=800&h=600",
    description:
      "Scan 3D et modélisation BIM d'un quartier historique pour projet de rénovation urbaine.",
    client: "Ville de Saint-Martin",
    year: "2021",
  },
  {
    id: "projet-5",
    title: "Centre Commercial Étoile",
    category: "Coordination BIM",
    image:
      "https://images.unsplash.com/photo-1555443805-658637491dd4?auto=format&fit=crop&q=80&w=800&h=600",
    description:
      "Coordination BIM pour un centre commercial de 45 000 m² avec plus de 80 boutiques.",
    client: "Développeurs Commerciaux Associés",
    year: "2021",
  },
  {
    id: "projet-6",
    title: "Pont Suspension Marina",
    category: "Infrastructure BIM",
    image:
      "https://images.unsplash.com/photo-1506422748879-887454f9cdff?auto=format&fit=crop&q=80&w=800&h=600",
    description:
      "Modélisation BIM pour un pont à suspension de 320 mètres avec prise en compte des contraintes environnementales.",
    client: "Département des Infrastructures",
    year: "2020",
  },
];

const allCategories = [
  "Tous",
  ...Array.from(new Set(projects.map((project) => project.category))),
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredProjects =
    selectedCategory === "Tous"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

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
          {allCategories.map((category) => (
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
        <div
          ref={ref}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              // initial={{ opacity: 0, y: 30 }}
              // animate={inView ? { opacity: 1, y: 0 } : {}}
              className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md group hover:shadow-xl"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden cursor-pointer h-60">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-primary/80 to-transparent group-hover:opacity-100"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 transform translate-y-4 bg-white rounded-full text-primary group-hover:translate-y-0">
                    Voir détails <ArrowRight className="w-4 h-4" />
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
            </motion.div>
          ))}
        </div>

        {/* Modal pour afficher les détails du projet */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
              onClick={() => setSelectedProject(null)}
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
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-72 md:h-full">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-2 py-1 mb-2 text-sm font-medium rounded-md text-accent-dark bg-accent/10">
                      {selectedProject.category}
                    </span>
                    <h2 className="mb-4 text-2xl font-bold text-primary">
                      {selectedProject.title}
                    </h2>
                    <div className="mb-6 space-y-4">
                      <p className="text-gray-700">
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
                    <button
                      className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all duration-300 rounded-full bg-accent hover:bg-accent/90"
                      onClick={() => {
                        window.location.href = "#contact";
                        setSelectedProject(null);
                      }}
                    >
                      Demander un projet similaire <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
