const Packages = () => {
  const packages = [
    {
      name: 'Essential',
      hours: '6 Hours',
      price: 'From $3,500',
      features: [
        '6 hours of coverage',
        'One photographer',
        'High-resolution digital images',
        'Online gallery',
        'Personal printing rights',
      ],
    },
    {
      name: 'Signature',
      hours: '8 Hours',
      price: 'From $5,500',
      features: [
        '8 hours of coverage',
        'Two photographers',
        'High-resolution digital images',
        'Online gallery with slideshow',
        'Engagement session included',
        'Premium USB with all images',
      ],
    },
    {
      name: 'Complete',
      hours: 'Full Day',
      price: 'From $8,500',
      features: [
        'Full day coverage',
        'Two photographers',
        'Second shooter assistant',
        'High-resolution digital images',
        'Premium album included',
        'Engagement session',
        'Rehearsal dinner coverage',
      ],
    },
  ];

  return (
    <section id="packages" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-[#1E1E1E] tracking-wide mb-6">
            Investment
          </h2>
          <div className="w-16 h-px bg-[#1E1E1E] opacity-30 mx-auto mb-6"></div>
          <p className="text-base md:text-lg font-light text-[#1E1E1E] opacity-60 max-w-2xl mx-auto">
            Each package is thoughtfully designed to capture your wedding day with elegance and artistry
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {packages.map((pkg, index) => (
            <div key={index} className="text-center">
              <div className="border border-[#1E1E1E] border-opacity-10 p-10 md:p-12 hover:border-opacity-30 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-light text-[#1E1E1E] tracking-wide mb-4">
                  {pkg.name}
                </h3>
                <p className="text-sm font-light text-[#1E1E1E] opacity-50 tracking-widest uppercase mb-6">
                  {pkg.hours}
                </p>
                <p className="text-xl md:text-2xl font-light text-[#1E1E1E] mb-8">
                  {pkg.price}
                </p>
                <div className="space-y-4">
                  {pkg.features.map((feature, idx) => (
                    <p key={idx} className="text-sm font-light text-[#1E1E1E] opacity-60">
                      {feature}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
