import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "/images/logo_labimerie.png";

type NavItem = {
  name: string;
  href: string;
  id: string;
};

const navItems: NavItem[] = [
  { name: "Accueil", href: "#accueil", id: "accueil" },
  { name: "À propos", href: "#à-propos", id: "à-propos" },
  { name: "Services", href: "#services", id: "services" },
  {
    name: "Travaux réalisés",
    href: "#travaux-réalisés",
    id: "travaux-réalisés",
  },
  { name: "Contact", href: "#contact", id: "contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const currentPosition = window.scrollY + 100;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (!element) continue;

        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;

        if (
          currentPosition >= offsetTop &&
          currentPosition < offsetTop + height
        ) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  // Function to handle anchor navigation
  const handleNavigation = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Close the mobile menu first
      setIsOpen(false);

      // Small delay to ensure menu closes smoothly before scrolling
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Update URL without page reload
        window.history.pushState(null, "", `#${id}`);
      }, 100);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-primary/95 shadow-lg backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between px-4 py-4 mx-auto">
        <a
          href="#accueil"
          className="flex items-center gap-2 text-2xl font-bold text-white font-montserrat"
          aria-label="labimerie accueil"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("accueil");
          }}
        >
          <img src={logo} alt="labimerie logo" className="w-12 h-12" />
          <span className="relative">
            labimerie
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </span>
        </a>

        <div className="hidden md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(item.id);
              }}
            />
          ))}
        </div>

        <button
          className="text-white transition-colors duration-300 md:hidden hover:text-accent"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>

        <MobileMenu
          isOpen={isOpen}
          navItems={navItems}
          activeSection={activeSection}
          onItemClick={handleNavigation}
        />
      </nav>
    </header>
  );
};

type NavLinkProps = {
  item: NavItem;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
};

const NavLink = ({ item, isActive, onClick }: NavLinkProps) => (
  <a
    href={item.href}
    className={`nav-link relative group px-3 md:px-2 lg:px-3 whitespace-nowrap text-sm lg:text-base ${
      isActive ? "text-white font-medium" : "text-gray-200"
    }`}
    aria-current={isActive ? "page" : undefined}
    onClick={onClick}
  >
    {item.name}
    <span
      className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
        isActive ? "w-full" : "w-0 group-hover:w-full"
      }`}
      aria-hidden="true"
    ></span>
  </a>
);

type MobileMenuProps = {
  isOpen: boolean;
  navItems: NavItem[];
  activeSection: string;
  onItemClick: (id: string) => void;
};

const MobileMenu = ({
  isOpen,
  navItems,
  activeSection,
  onItemClick,
}: MobileMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 right-0 overflow-hidden top-full bg-primary/95 backdrop-blur-sm md:hidden"
        role="menu"
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`block px-4 py-3 border-l-4 transition-all duration-300 ${
              activeSection === item.id
                ? "text-white border-accent bg-white/5"
                : "text-gray-200 border-transparent hover:bg-white/10 hover:border-accent/50"
            }`}
            onClick={(e) => {
              e.preventDefault();
              onItemClick(item.id);
            }}
            role="menuitem"
            aria-current={activeSection === item.id ? "page" : undefined}
          >
            {item.name}
          </a>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

export default Header;
