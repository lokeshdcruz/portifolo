import { Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-light text-[#1E1E1E] tracking-wide mb-6">
            Let's Work Together
          </h2>
          <div className="w-16 h-px bg-[#1E1E1E] opacity-30 mx-auto mb-6"></div>
          <p className="text-base md:text-lg font-light text-[#1E1E1E] opacity-60 max-w-2xl mx-auto mb-12">
            Feel free to reach out for bookings, collaborations, or inquiries
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=loke7official@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-10 py-4 bg-[#1E1E1E] text-white text-sm font-light tracking-[0.2em] uppercase hover:bg-opacity-80 transition-all"
            >
              <Mail size={20} />
              Gmail
            </a>
            
            <a
              href="https://wa.me/917396412974"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-10 py-4 bg-[#25D366] text-white text-sm font-light tracking-[0.2em] uppercase hover:bg-opacity-80 transition-all"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </div>
          
          <div className="mt-12 space-y-2 text-base font-light text-[#1E1E1E] opacity-70">
            <p>📧 loke7official@gmail.com</p>
            <p>📞 +91 73964 12974</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
