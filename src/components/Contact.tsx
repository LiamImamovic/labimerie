import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    try {
      // Appel à la nouvelle API serverless
      const response = await axios.post("/api/send-email", formData);

      if (response.data.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 3000);
      } else {
        throw new Error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      setFormStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite. Veuillez réessayer.",
      );
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-b from-white to-gray-50"
    >
      <div ref={ref} className="max-w-6xl mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-primary">
          <span className="relative inline-block px-2">
            Contactez-nous
            <span className="absolute bottom-0 left-0 w-full h-1 rounded-full bg-accent"></span>
          </span>
        </h2>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -30 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="transition-all duration-300 transform ">
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 transition-all duration-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div className="transition-all duration-300 transform ">
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 transition-all duration-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div className="transition-all duration-300 transform ">
                <label
                  htmlFor="phone"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 transition-all duration-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div className="transition-all duration-300 transform ">
                <label
                  htmlFor="message"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 transition-all duration-300 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-accent focus:border-transparent"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="relative w-full btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus === "loading"}
              >
                {formStatus === "loading" ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2 animate-spin"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  "Envoyer"
                )}
              </motion.button>

              <AnimatePresence>
                {formStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="py-2 text-center text-green-600 rounded-lg bg-green-50"
                  >
                    ✓ Message envoyé avec succès !
                  </motion.p>
                )}

                {formStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="py-2 text-center text-red-600 rounded-lg bg-red-50"
                  >
                    ✗ {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6 transition-shadow duration-300 rounded-lg shadow-md bg-light hover:shadow-lg">
              <h3 className="mb-4 text-xl font-semibold text-primary">
                Informations de contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 transition-colors duration-300 rounded-lg hover:bg-white">
                  <span className="text-xl">📍</span>
                  <p>4 rue rosa bonheur, 33680, Lacanau</p>
                </div>
                <div className="flex items-center gap-3 p-2 transition-colors duration-300 rounded-lg hover:bg-white">
                  <span className="text-xl">📞</span>
                  <p>+33 7 86 88 91 00</p>
                </div>
                <div className="flex items-center gap-3 p-2 transition-colors duration-300 rounded-lg hover:bg-white">
                  <span className="text-xl">✉️</span>
                  <p>contact@labimerie.fr</p>
                </div>
              </div>
            </div>
            {/* 
            <div className="h-64 overflow-hidden transition-all duration-300 bg-gray-200 rounded-lg shadow-md hover:shadow-lg">
              <div className="relative flex items-center justify-center w-full h-full bg-gray-300 rounded-lg group">
                <div
                  className="absolute inset-0 transition-opacity duration-500 bg-center bg-cover opacity-70 group-hover:opacity-90"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800&h=400")',
                  }}
                ></div>
                <div className="z-10 px-6 py-4 text-center rounded-lg bg-white/80 backdrop-blur-sm">
                  <p className="font-semibold text-primary">
                    Carte interactive
                  </p>
                  <p className="text-sm text-gray-700">
                    Cliquez pour ouvrir Google Maps
                  </p>
                </div>
              </div>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
