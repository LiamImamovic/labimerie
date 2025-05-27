import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useInView } from "react-intersection-observer";

type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  category: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "Les avantages du BIM pour les projets de rénovation",
    excerpt:
      "Découvrez comment le BIM peut transformer vos projets de rénovation en optimisant la coordination et réduisant les imprévus.",
    date: "2024-12-20",
    slug: "bim-renovation-avantages",
    category: "BIM",
  },
  {
    title: "Archicad vs Revit : quel logiciel choisir en 2024 ?",
    excerpt:
      "Comparatif détaillé entre les deux leaders du marché BIM pour vous aider à faire le meilleur choix selon votre activité.",
    date: "2024-12-15",
    slug: "archicad-vs-revit-2024",
    category: "Logiciels",
  },
  {
    title: "Comment optimiser vos rendus 3D pour vos clients",
    excerpt:
      "5 conseils pratiques pour créer des visualisations 3D qui impressionnent et convainquent vos prospects.",
    date: "2024-12-10",
    slug: "optimiser-rendus-3d-clients",
    category: "Rendu 3D",
  },
];

export const BlogPreview = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="blog" className="section-padding bg-gray-50">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          className="mb-12 text-3xl font-bold text-center text-primary"
        >
          Actualités & Conseils BIM
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString("fr-FR")}
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-3 text-primary">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>

                <button className="flex items-center gap-2 text-accent hover:text-primary transition-colors">
                  Lire l'article
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
