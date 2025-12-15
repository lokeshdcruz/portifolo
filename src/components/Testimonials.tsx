const Testimonials = () => {
  const testimonials = [
    {
      quote: 'The photos exceeded every expectation. They captured moments we didn\'t even know happened. Pure artistry.',
      author: 'Sarah & Michael',
      location: 'Napa Valley',
    },
    {
      quote: 'Working with this team felt effortless. They made us feel so comfortable, and the results are simply breathtaking.',
      author: 'Emily & James',
      location: 'Tuscany',
    },
    {
      quote: 'Every single image tells a story. These aren\'t just photos, they\'re heirlooms we\'ll treasure forever.',
      author: 'Alexandra & David',
      location: 'Santa Barbara',
    },
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-[#1E1E1E] tracking-wide mb-6">
            Kind Words
          </h2>
          <div className="w-16 h-px bg-[#1E1E1E] opacity-30 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center">
              <p className="text-base md:text-lg font-light text-[#1E1E1E] leading-relaxed mb-8 opacity-70 italic">
                "{testimonial.quote}"
              </p>
              <p className="text-sm font-light text-[#1E1E1E] tracking-wider uppercase opacity-60">
                {testimonial.author}
              </p>
              <p className="text-xs font-light text-[#1E1E1E] tracking-wider opacity-40 mt-2">
                {testimonial.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
