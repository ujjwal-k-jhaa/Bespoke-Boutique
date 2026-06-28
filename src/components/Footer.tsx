import React, { useState } from 'react';
import { ArrowRight, Mail, Instagram, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please provide your email address.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email structure.');
      return;
    }

    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <footer id="boutique-brand-footer" className="bg-brand-dark text-brand-beige pt-20 pb-8 border-t border-brand-accent/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Branding and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-brand-beige/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-serif tracking-[0.25em] font-medium uppercase text-brand-beige">Bespoke</h3>
            <p className="text-xs font-light text-brand-beige/70 leading-relaxed max-w-sm">
              Artisanal curations, lightweight structures, and natural sensory landscapes. Crafting contemporary luxury in low-volume, sustainable batches.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#instagram" className="w-8 h-8 rounded-full border border-brand-beige/25 flex items-center justify-center text-brand-beige/70 hover:text-brand-accent hover:border-brand-accent transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#mail" className="w-8 h-8 rounded-full border border-brand-beige/25 flex items-center justify-center text-brand-beige/70 hover:text-brand-accent hover:border-brand-accent transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links Col 1 */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">Atelier</h4>
            <ul className="space-y-2 text-xs text-brand-beige/70 font-light">
              <li><a href="#story" className="hover:text-brand-accent transition-colors">The Story</a></li>
              <li><a href="#crafts" className="hover:text-brand-accent transition-colors">Italian Crafts</a></li>
              <li><a href="#sustainability" className="hover:text-brand-accent transition-colors">Sustainability</a></li>
              <li><a href="#journal" className="hover:text-brand-accent transition-colors">The Journal</a></li>
            </ul>
          </div>

          {/* Nav Links Col 2 */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">Client Care</h4>
            <ul className="space-y-2 text-xs text-brand-beige/70 font-light">
              <li><a href="#shipping" className="hover:text-brand-accent transition-colors">Express Courier</a></li>
              <li><a href="#returns" className="hover:text-brand-accent transition-colors">Bespoke Returns</a></li>
              <li><a href="#consultation" className="hover:text-brand-accent transition-colors">Style Consultant</a></li>
              <li><a href="#faq" className="hover:text-brand-accent transition-colors">Assistance FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">Join the Gazette</h4>
            <p className="text-xs font-light text-brand-beige/70 leading-relaxed">
              Subscribe to receive invitations to private seasonal curations and small-batch drops.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="flex border-b border-brand-beige/30 focus-within:border-brand-accent transition-colors pb-1">
                <input
                  type="email"
                  placeholder="Your Atelier Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent flex-1 text-xs text-brand-beige focus:outline-none placeholder-brand-beige/35 py-1.5"
                />
                <button type="submit" className="p-1.5 text-brand-beige hover:text-brand-accent transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[11px] text-brand-accent font-semibold flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Welcome to the Atelier Newsletter circle.</span>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] text-red-400 font-medium"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Bottom: Addresses and Credits */}
        <div className="pt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 text-[11px] text-brand-beige/50 font-light tracking-wide">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
              <span>Ateliers: Florence • Los Angeles • Tokyo</span>
              <span>© {new Date().getFullYear()} Bespoke Boutique. All Rights Reserved.</span>
            </div>
            <p className="text-[10px] text-brand-beige/35 leading-relaxed max-w-lg mt-1">
              Disclaimer: This website is a premium interactive portfolio demonstration created for design and engineering assessment. It does not represent or belong to any active real-world commercial boutique or luxury business. All mock items, rates, and materials are featured strictly for non-commercial showcase.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-brand-beige transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-brand-beige transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
