import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Award, Feather, Sparkles, Check, Hourglass, Shield } from 'lucide-react';

export default function HeritageSection() {
  const [activeProcess, setActiveProcess] = useState<number>(0);

  const brandPromises = [
    {
      icon: Feather,
      title: "Grade-A Noble Fibers",
      desc: "Exclusively utilizing 22-momme organic mulberry silk and Grade-A Mongolian cashmere fibers sourced ethically from certified herders."
    },
    {
      icon: Award,
      title: "Handmade in Florence",
      desc: "Each item is individually cut, tailored, and hand-finished by multi-generational master couturiers in our historic Florentine atelier."
    },
    {
      icon: Leaf,
      title: "Certified Circularity",
      desc: "Our production runs strictly in small batches using non-toxic botanical dyes and 100% biodegradable organic flax and linen materials."
    },
    {
      icon: Shield,
      title: "Lifetime Restoration",
      desc: "To discourage landfill waste, we provide complimentary seam restoration and fiber conditioning services for the lifetime of your garment."
    }
  ];

  const artisanalProcesses = [
    {
      step: "01",
      title: "Ethical Harvesting",
      subtitle: "The Foundation of Purity",
      desc: "Our cashmere is delicately hand-combed from free-roaming goats during the natural spring moulting season, preserving fiber length and warmth.",
      image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800"
    },
    {
      step: "02",
      title: "Vegetable Tanning",
      subtitle: "Tuscan Mastercraft",
      desc: "Our leathers undergo a traditional 40-day tanning process in Tuscany using natural chestnut and quebracho extracts, creating rich, hypoallergenic materials that age beautifully.",
      image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2922?auto=format&fit=crop&q=80&w=800"
    },
    {
      step: "03",
      title: "Drape Sculpting",
      subtitle: "Bespoke Precision",
      desc: "Instead of high-volume laser cutting, we drape and draft every dress design manually on wooden mannequins to map how fabric naturally moves with the human form.",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="heritage-storytelling" className="py-24 bg-brand-beige border-t border-brand-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Promises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-28">
          {brandPromises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 bg-white/40 backdrop-blur-xs border border-brand-muted rounded-2xl flex flex-col items-start space-y-4 shadow-[0_4px_24px_rgba(18,18,18,0.01)] hover:shadow-md transition-all duration-300"
            >
              <div className="p-3 bg-brand-dark/5 rounded-xl text-brand-accent">
                <promise.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm uppercase tracking-wider font-semibold text-brand-dark font-sans">
                {promise.title}
              </h3>
              <p className="text-xs text-brand-dark/70 font-light leading-relaxed font-sans">
                {promise.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Editorial Splitted Segment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-28">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-sans font-semibold block">The Philosophy</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-brand-dark tracking-wide leading-tight">
              An Ode to Slow, Intentional Living
            </h2>
            <p className="text-sm font-light text-brand-dark/80 tracking-wide leading-relaxed font-sans">
              At Bespoke, we reject the noise of hyper-consumerism and seasonal trends. We believe a garment should not be designed to be discarded. Rather, it is a structural work of art, curated from pure natural mediums, designed to accompany you through decades of life.
            </p>
            <p className="text-sm font-light text-brand-dark/70 tracking-wide leading-relaxed font-sans">
              Every dress, every stitch, and every formulation is guided by a singular pursuit: absolute tactile perfection, quiet luxury, and architectural grace.
            </p>
            
            <div className="pt-4 flex items-center space-x-6 text-[11px] uppercase tracking-widest font-sans font-semibold text-brand-dark">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-accent" /> Florence, Italy</span>
              <span className="flex items-center gap-1.5"><Hourglass className="w-4 h-4 text-brand-accent" /> 48hrs Atelier Finish</span>
            </div>
          </div>

          {/* Right Image/Graphic Column */}
          <div className="lg:col-span-7">
            <div className="relative group rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(18,18,18,0.08)] aspect-[16/10] bg-brand-muted/10">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200" 
                alt="Florentine Tailoring Atelier"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 p-4.5 bg-brand-beige/85 backdrop-blur-md rounded-2xl border border-white/30 max-w-xs shadow-lg">
                <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-brand-accent block mb-1">Live from Tuscany</span>
                <p className="text-[11px] font-sans text-brand-dark leading-relaxed font-medium">
                  "The hands of our artisans contain the memories of a thousand drapes."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Craft Process Explainer */}
        <div className="bg-brand-muted/20 border border-brand-muted rounded-3xl p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-sans font-semibold block mb-2">Our Process</span>
            <h3 className="text-2xl font-serif font-light text-brand-dark tracking-wide">Behind the Bespoke Seams</h3>
            <p className="text-xs text-brand-dark/60 font-sans font-light mt-2 max-w-xl mx-auto">
              Select an artisanal stage to view the uncompromising standards and raw materials backing each silhouette.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Steps Left Nav Buttons */}
            <div className="lg:col-span-4 flex flex-col space-y-2.5">
              {artisanalProcesses.map((proc, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProcess(index)}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${
                    activeProcess === index
                      ? 'bg-brand-dark border-brand-dark text-brand-beige shadow-md'
                      : 'bg-white/40 border-brand-muted hover:border-brand-dark/20 text-brand-dark'
                  }`}
                >
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    activeProcess === index ? 'bg-brand-accent text-brand-dark' : 'bg-brand-dark/5 text-brand-dark/50'
                  }`}>
                    {proc.step}
                  </span>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-sans font-bold block">{proc.title}</h4>
                    <span className={`text-[10px] font-sans font-light block mt-0.5 ${activeProcess === index ? 'text-brand-accent' : 'text-brand-dark/50'}`}>
                      {proc.subtitle}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Step Focus Preview Content */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProcess}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 rounded-3xl border border-brand-muted shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-brand-muted/10">
                    <img
                      src={artisanalProcesses[activeProcess].image}
                      alt={artisanalProcesses[activeProcess].title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex flex-col justify-between py-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-brand-accent">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[10px] uppercase tracking-widest font-sans font-bold">Atelier Standard</span>
                      </div>
                      <h4 className="text-lg font-serif font-light text-brand-dark tracking-wide">
                        {artisanalProcesses[activeProcess].subtitle}
                      </h4>
                      <p className="text-xs text-brand-dark/75 font-sans font-light leading-relaxed">
                        {artisanalProcesses[activeProcess].desc}
                      </p>
                    </div>

                    <div className="border-t border-brand-muted pt-3 mt-4 text-[10px] text-brand-dark/50 font-sans tracking-wide flex justify-between">
                      <span>Certified Traceability</span>
                      <span className="font-semibold text-brand-accent">Florence Atelier</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
