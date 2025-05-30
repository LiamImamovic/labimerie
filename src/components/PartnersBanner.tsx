type Partner = {
  name: string;
  logo?: string;
  url: string;
  displayType: "logo" | "text";
};

export const PartnersBanner = () => {
  const partners: Partner[] = [
    {
      name: "Planta Services",
      logo: "https://www.plantaservices.fr/wp-content/uploads/2024/10/298422158_429047909243589_7237415736216501716_n.jpg",
      url: "https://www.plantaservices.fr/",
      displayType: "logo",
    },
    {
      name: "Oyster Agency",
      url: "https://liamimamovic.vercel.app/",
      displayType: "text",
    },
  ];

  return (
    <section id="partenaires" className="py-32 bg-light">
      <div className="px-4 mx-auto max-w-7xl">
        <h2 className="relative mb-16 text-3xl font-bold text-center text-primary">
          <span className="relative inline-block px-2">
            Mes Partenaires
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
              className="flex items-center justify-center transition-transform hover:scale-105"
            >
              {partner.displayType === "logo" && partner.logo ? (
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="object-contain w-auto h-12 rounded-full lg:h-36"
                  loading="lazy"
                  width="auto"
                  height="128"
                />
              ) : (
                <span className="text-lg font-semibold text-primary md:text-2xl lg:text-3xl">
                  {partner.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersBanner;
