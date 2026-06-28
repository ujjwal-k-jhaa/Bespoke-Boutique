import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import heroImage from '../assets/images/boutique_hero_1782562951876.jpg';

interface HeroProps {
  onScrollToProducts: () => void;
  onOpenStylist: () => void;
}

export default function Hero({ onScrollToProducts, onOpenStylist }: HeroProps) {
  return (
    <section id="hero-banner-section" className="relative h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Boutique Luxury Storefront"
          className="w-full h-full object-cover scale-105 filter brightness-[0.78] contrast-[1.02]"
          referrerPolicy="no-referrer"
        />
        {/* Soft Vignette and Tint Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/35 via-transparent to-brand-dark/45" />
        <div className="absolute inset-0 bg-brand-dark/15 mix-blend-multiply" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-brand-beige z-10 flex flex-col items-center">
        {/* Top Accent Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center space-x-2 bg-brand-beige/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-brand-beige/25 mb-6 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-sans font-medium">Summer Resort Curations</span>
        </motion.div>

        {/* Elegant Display Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-wide leading-tight sm:leading-none mb-6 max-w-4xl"
        >
          Art of <span className="italic font-normal">Undertoned</span> Luxury
        </motion.h1>

        {/* Description Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-sm sm:text-base md:text-lg font-light tracking-wide text-brand-beige/90 max-w-2xl mb-10 leading-relaxed font-sans"
        >
          Discover a curated assortment of bespoke apparel, sculptured accessories, and organic sensory fragrances crafted in low-volume batches by Italian couturiers.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Main Button: Explore */}
          <button
            id="hero-explore-collection-btn"
            onClick={onScrollToProducts}
            className="w-full sm:w-auto bg-brand-beige text-brand-dark hover:bg-brand-accent hover:text-brand-beige px-8 py-4 text-xs uppercase tracking-widest font-sans font-medium transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Secondary Button: Stylist */}
          <button
            id="hero-open-stylist-btn"
            onClick={onOpenStylist}
            className="w-full sm:w-auto bg-transparent border border-brand-beige/40 hover:border-brand-accent hover:bg-brand-beige/5 px-8 py-4 text-xs uppercase tracking-widest font-sans font-medium transition-all duration-300 text-brand-beige flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
            <span>Style Lounge</span>
          </button>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={onScrollToProducts}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-brand-beige/70 font-sans">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-brand-beige/80 to-transparent" />
      </motion.div>
    </section>
  );
}
