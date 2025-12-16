import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-white'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-6">
        <ul className="flex items-center justify-center gap-8 md:gap-12">
          <li>
            <button
              onClick={() => scrollToSection('home')}
              className="text-[#1E1E1E] text-xs md:text-sm font-light tracking-[0.2em] uppercase hover:opacity-60 transition-opacity"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('about')}
              className="text-[#1E1E1E] text-xs md:text-sm font-light tracking-[0.2em] uppercase hover:opacity-60 transition-opacity"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-[#1E1E1E] text-xs md:text-sm font-light tracking-[0.2em] uppercase hover:opacity-60 transition-opacity"
            >
              Gallery
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-[#1E1E1E] text-xs md:text-sm font-light tracking-[0.2em] uppercase hover:opacity-60 transition-opacity"
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
