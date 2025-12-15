const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t border-[#1E1E1E] border-opacity-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-6">
          <p className="text-sm font-light text-[#1E1E1E] tracking-widest uppercase opacity-60">
            Lokesh - Freelance Photographer
          </p>
          <p className="text-xs font-light text-[#1E1E1E] opacity-40">
            loke7official@gmail.com
          </p>
          <p className="text-xs font-light text-[#1E1E1E] opacity-40">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
