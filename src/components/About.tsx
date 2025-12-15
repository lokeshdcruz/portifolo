const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-light text-[#1E1E1E] tracking-wide mb-8">
              About Me
            </h2>
            <div className="w-16 h-px bg-[#1E1E1E] opacity-30 mb-8"></div>
            <p className="text-base md:text-lg font-light text-[#1E1E1E] leading-relaxed mb-6 opacity-70">
              Hi, I'm Lokesh, a freelance photographer passionate about capturing real emotions and timeless moments. 
              I specialize in couple, engagement, candid, and event photography, focusing on natural expressions and 
              storytelling through visuals.
            </p>
            <p className="text-base md:text-lg font-light text-[#1E1E1E] leading-relaxed mb-6 opacity-70">
              I'm currently actively looking for freelance photography gigs and collaborations. Whether it's an intimate 
              couple shoot or a large celebration, I aim to deliver photographs that feel authentic, cinematic, and memorable.
            </p>
            <p className="text-base md:text-lg font-light text-[#1E1E1E] leading-relaxed mb-8 opacity-70">
              If you're looking for a dedicated photographer who understands moments and emotions, I'd love to connect.
            </p>
            <div className="space-y-3">
              <p className="text-base font-light text-[#1E1E1E] opacity-60">
                📧 Email: <a href="mailto:loke7official@gmail.com" className="hover:opacity-100 transition-opacity">loke7official@gmail.com</a>
              </p>
              <p className="text-base font-light text-[#1E1E1E] opacity-60">
                📞 Phone: <a href="tel:+917396412974" className="hover:opacity-100 transition-opacity">+91 73964 12974</a>
              </p>
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
            <img
              src="/images/about_me.jpg"
              alt="Lokesh - Freelance Photographer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
