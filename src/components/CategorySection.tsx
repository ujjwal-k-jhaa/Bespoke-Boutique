import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data';
import { Category } from '../types';

interface CategorySectionProps {
  onSelectCategory: (categoryId: string) => void;
  onScrollToProducts: () => void;
  selectedCategory: string;
}

export default function CategorySection({
  onSelectCategory,
  onScrollToProducts,
  selectedCategory,
}: CategorySectionProps) {
  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    onScrollToProducts();
  };

  return (
    <section id="boutique-categories-section" className="py-20 bg-brand-beige border-b border-brand-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-sans font-medium block mb-2">Curated Assortments</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-wide text-brand-dark">Shop by Collection</h2>
          <div className="w-12 h-[1px] bg-brand-accent/40 mx-auto mt-4" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((category: Category, idx: number) => {
            const isCurrentlySelected = selectedCategory === category.id;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                onClick={() => handleCategoryClick(category.id)}
                className="group relative h-[480px] bg-brand-dark cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
              >
                {/* Background image */}
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.6] transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 text-brand-beige">
                  {/* Category Name */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-serif font-light tracking-wide group-hover:text-brand-accent transition-colors">
                      {category.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-brand-beige/20 flex items-center justify-center group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-brand-beige transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-brand-beige/80 tracking-wide font-light leading-relaxed mb-6 font-sans">
                    {category.description}
                  </p>

                  {/* Call to Action Line */}
                  <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-brand-accent opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Explore Products</span>
                    <div className="w-6 h-[1px] bg-brand-accent" />
                  </div>
                </div>

                {/* Active Indicator Border */}
                {isCurrentlySelected && (
                  <div className="absolute inset-0 border-2 border-brand-accent z-20 pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
