import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "Qu'est-ce que le BIM et pourquoi est-ce important ?",
    answer:
      "Le BIM (Building Information Modeling) est une méthode de travail collaborative qui centralise toutes les informations d'un projet de construction dans un modèle 3D intelligent. Cela permet d'optimiser la coordination, réduire les erreurs et améliorer l'efficacité des projets.",
  },
  {
    question: "Quels logiciels BIM utilisez-vous ?",
    answer:
      "J'utilise principalement Archicad pour la modélisation architecturale, complété par d'autres outils selon les besoins : Revit, SketchUp, et des logiciels de rendu comme Twinmotion ou V-Ray pour les visualisations réalistes.",
  },
  {
    question: "Combien coûte une prestation de modélisation BIM ?",
    answer:
      "Le tarif dépend de la complexité et de la taille de votre projet. Je propose un devis gratuit après étude de vos plans et besoins. Mes tarifs sont compétitifs et adaptés aux budgets des PME du bâtiment.",
  },
  {
    question: "Travaillez-vous uniquement dans la région de Lacanau ?",
    answer:
      "Bien que basé à Lacanau, je travaille avec des clients dans toute la Nouvelle-Aquitaine et même au-delà grâce aux outils numériques. La plupart de mes prestations peuvent être réalisées à distance.",
  },
  {
    question: "Proposez-vous de la formation aux outils BIM ?",
    answer:
      "Oui, je propose des formations personnalisées aux logiciels BIM comme Archicad. Ces formations peuvent être individuelles ou en groupe, adaptées au niveau et aux besoins spécifiques de votre équipe.",
  },
];

const FAQItem = ({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group"
    >
      <div
        className={`
          border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 
          ${
            isOpen
              ? "shadow-lg border-accent/20 bg-white"
              : "hover:border-accent/30 hover:shadow-md bg-gray-50/50"
          }
        `}
      >
        <motion.button
          onClick={onToggle}
          className="flex items-center justify-between w-full px-6 py-5 text-left transition-all duration-300"
          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.02)" }}
          whileTap={{ scale: 0.99 }}
          aria-expanded={isOpen}
        >
          <h3
            className={`
            font-semibold transition-colors duration-300 pr-4
            ${isOpen ? "text-accent" : "text-primary group-hover:text-accent"}
          `}
          >
            {item.question}
          </h3>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`
              flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300
              ${
                isOpen
                  ? "bg-accent/10 text-accent"
                  : "bg-gray-100 text-gray-500 group-hover:bg-accent/10 group-hover:text-accent"
              }
            `}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: { duration: 0.4, ease: "easeInOut" },
                  opacity: { duration: 0.3, delay: 0.1 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.2 },
                },
              }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-5 bg-white border-t border-gray-100"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="pt-4"
                >
                  <p className="leading-relaxed text-gray-700">{item.answer}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section
      id="faq"
      className="section-padding bg-gradient-to-b from-white to-gray-50/50"
    >
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: inView ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-primary">
              Questions fréquentes sur le BIM
            </h2>
            <div className="w-24 h-1 mx-auto mb-6 rounded-full bg-accent"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Retrouvez les réponses aux questions les plus courantes concernant
              mes services BIM
            </p>
          </motion.div>
        </motion.div>

        {/* Schema.org FAQ structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqData.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openItems.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </motion.div>

        {/* Call to action subtil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="p-8 border bg-gradient-to-r from-accent/5 to-primary/5 rounded-2xl border-accent/10">
            <p className="mb-4 text-gray-700">Vous avez d'autres questions ?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 font-semibold text-white bg-accent rounded-xl hover:shadow-md"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contactez-moi directement
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
