const FloatingContact = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToContact}
      className="fixed bottom-8 right-8 px-8 py-4 bg-[#1E1E1E] text-white text-xs font-light tracking-[0.2em] uppercase hover:bg-opacity-80 transition-all shadow-lg z-40"
    >
      Contact Me
    </button>
  );
};

export default FloatingContact;
