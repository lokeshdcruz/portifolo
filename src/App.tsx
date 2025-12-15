import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Contact />
      <Footer />
      <FloatingContact />
    </div>
  );
}

export default App;
