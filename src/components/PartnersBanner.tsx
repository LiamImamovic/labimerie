export const PartnersBanner = () => {
  const partners = [
    {
      name: "Autodesk",
      logo: "https://brand.autodesk.com/app/uploads/2021/04/primary-logo-1.svg",
      url: "https://www.autodesk.com",
    },
    {
      name: "Trimble",
      logo: "https://www.trimble.com/images/logo-trimble-black.svg",
      url: "https://www.trimble.com",
    },
    {
      name: "Graphisoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Archicad-logo-1.png",
      url: "https://www.graphisoft.com",
    },
    {
      name: "Nemetschek",
      logo: "https://www.nemetschek.com/sites/default/files/2024-09/NemetschekGroup%20RGB%20Schwarz.png",
      url: "https://www.nemetschek.com",
    },
    {
      name: "Bentley",
      logo: "https://www.carlogos.org/car-logos/bentley-logo-2002-black-download.png",
      url: "https://www.bentley.com",
    },
  ];

  return (
    <section id="partenaires" className="py-32 bg-light">
      <div className="px-4 mx-auto max-w-7xl">
        <h2 className="relative mb-16 text-3xl font-bold text-center text-primary">
          <span className="relative inline-block px-2">
            Nos Partenaires
            <span className="absolute bottom-0 left-0 w-full h-1 rounded-full bg-accent"></span>
          </span>
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-16 mt-32 md:gap-24 lg:gap-32">
          {partners.map((partner, idx) => (
            <a
              key={idx}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="object-contain w-auto h-24 md:h-28 lg:h-32"
                loading="lazy"
                width="auto"
                height="128"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersBanner;
