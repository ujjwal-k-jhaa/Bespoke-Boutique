import React, { useState } from 'react';
import { SlidersHorizontal, Search, RefreshCw, X, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Color } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: Color) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02
    }
  }
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 18
    }
  }
};

export default function ProductGrid({
  products,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlist,
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStock, setSelectedStock] = useState<'all' | 'instock'>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);

  // Filter Categories list
  const categories = ['All', 'Apparel', 'Accessories', 'Fragrance'];

  // Filter products based on active criteria
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
      // Search query filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      // Stock status filter
      if (selectedStock === 'instock' && !product.inStock) return false;
      // Price range dual bounds filter
      if (product.price < minPrice || product.price > maxPrice) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // 'featured' sorting
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedStock('all');
    setMinPrice(0);
    setMaxPrice(500);
    setSortBy('featured');
  };

  const isFiltered =
    selectedCategory !== 'All' ||
    searchQuery !== '' ||
    selectedStock !== 'all' ||
    minPrice !== 0 ||
    maxPrice !== 500;

  return (
    <section id="boutique-catalog-grid" className="py-24 bg-brand-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-sans font-medium block mb-2">The Collection</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-wide text-brand-dark">Curated Essentials</h2>
          </div>

          {/* Quick Category Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 text-xs uppercase tracking-widest font-sans transition-all duration-300 rounded-full border ${
                  selectedCategory === cat
                    ? 'bg-brand-dark border-brand-dark text-brand-beige font-semibold shadow'
                    : 'bg-transparent border-brand-dark/10 text-brand-dark hover:border-brand-dark hover:bg-brand-dark/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Utilities bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-t border-b border-brand-muted mb-8 font-sans">
          
          {/* Left: Filter Toggle & Counter */}
          <div className="flex items-center space-x-4">
            <button
              id="grid-filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 ${
                showFilters 
                  ? 'bg-brand-dark border-brand-dark text-brand-beige' 
                  : 'bg-transparent border-brand-dark/15 text-brand-dark hover:border-brand-dark hover:bg-brand-dark/5'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <span className="text-xs font-light text-brand-dark/60 tracking-wider">
              Showing <span className="font-semibold text-brand-dark">{filteredProducts.length}</span> individual styles
            </span>
          </div>

          {/* Right: Sorting Selector */}
          <div className="flex items-center space-x-3 self-end sm:self-auto">
            <span className="text-xs font-light text-brand-dark/50 uppercase tracking-widest">Sort By</span>
            <select
              id="grid-sort-selector"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent border-b border-brand-dark/20 text-xs font-medium uppercase tracking-widest text-brand-dark py-1.5 focus:outline-none focus:border-brand-accent transition-all cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Collapsible Advanced Filters Drawer */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-brand-muted/20 border-b border-brand-muted/80 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 font-sans">
                
                {/* Search in filters */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-dark">Search Keyword</h4>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type style name, color..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs bg-brand-beige border border-brand-dark/10 py-2.5 pl-3 pr-10 rounded-none focus:outline-none focus:border-brand-accent text-brand-dark"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-dark/40 hover:text-brand-dark"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Availability status */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-dark">Availability</h4>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedStock('all')}
                      className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all ${
                        selectedStock === 'all'
                          ? 'bg-brand-dark border-brand-dark text-brand-beige'
                          : 'bg-transparent border-brand-dark/10 text-brand-dark hover:bg-brand-dark/5'
                      }`}
                    >
                      All Stock
                    </button>
                    <button
                      onClick={() => setSelectedStock('instock')}
                      className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all ${
                        selectedStock === 'instock'
                          ? 'bg-brand-dark border-brand-dark text-brand-beige'
                          : 'bg-transparent border-brand-dark/10 text-brand-dark hover:bg-brand-dark/5'
                      }`}
                    >
                      In Stock Only
                    </button>
                  </div>
                </div>

                {/* Luxury Budget Range slider & price density analysis */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-dark">Luxury Budget Range</h4>
                    <span className="text-xs font-mono text-brand-accent font-semibold">${minPrice} - ${maxPrice}</span>
                  </div>

                  {/* Dynamic Histogram of Boutique prices */}
                  <div className="flex items-end justify-between h-7 gap-1 px-1.5 pt-2">
                    {(() => {
                      const priceIntervals = 10;
                      const maxLimit = 500;
                      const intervalSize = maxLimit / priceIntervals;
                      const priceHistogram = Array(priceIntervals).fill(0);
                      products.forEach((p) => {
                        const bucket = Math.min(priceIntervals - 1, Math.floor(p.price / intervalSize));
                        priceHistogram[bucket]++;
                      });
                      const maxBucketCount = Math.max(...priceHistogram, 1);

                      return priceHistogram.map((count, i) => {
                        const startPrice = i * intervalSize;
                        const endPrice = startPrice + intervalSize;
                        const isPartiallyActive = startPrice <= maxPrice && endPrice >= minPrice;
                        const barHeight = (count / maxBucketCount) * 100;
                        return (
                          <div
                            key={i}
                            className={`flex-1 rounded-t-[2px] transition-all duration-300 ${
                              isPartiallyActive ? 'bg-brand-accent' : 'bg-brand-dark/10'
                            }`}
                            style={{ height: `${Math.max(10, barHeight)}%` }}
                            title={`${count} styles between $${startPrice} and $${endPrice}`}
                          />
                        );
                      });
                    })()}
                  </div>

                  {/* Dual Slider Bar Track */}
                  <div className="relative pt-2 pb-6">
                    <div className="relative h-1.5 rounded-full bg-brand-dark/10">
                      {/* Active green track highlight */}
                      <div
                        className="absolute h-full bg-brand-accent rounded-full"
                        style={{
                          left: `${(minPrice / 500) * 100}%`,
                          right: `${100 - (maxPrice / 500) * 100}%`,
                        }}
                      />
                      
                      {/* Superimposed Range Inputs */}
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={minPrice}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val < maxPrice) {
                            setMinPrice(val);
                          }
                        }}
                        className="absolute inset-0 w-full h-full pointer-events-none appearance-none bg-transparent accent-brand-accent [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-dark [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-accent [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none cursor-pointer"
                        style={{ zIndex: minPrice > 250 ? 5 : 4 }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={maxPrice}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val > minPrice) {
                            setMaxPrice(val);
                          }
                        }}
                        className="absolute inset-0 w-full h-full pointer-events-none appearance-none bg-transparent accent-brand-accent [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-dark [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-accent [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none cursor-pointer"
                        style={{ zIndex: maxPrice < 250 ? 5 : 4 }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] text-brand-dark/40 font-mono mt-3">
                      <span>$0</span>
                      <span>$250</span>
                      <span>$500</span>
                    </div>
                  </div>

                  {/* Quick-tap budget-bracket quick-pills */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-brand-dark/40 font-semibold font-sans block">Quick Budget Brackets</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: 'All Budgets', min: 0, max: 500 },
                        { label: 'Under $150', min: 0, max: 150 },
                        { label: 'Under $300', min: 0, max: 300 },
                        { label: '$300+', min: 300, max: 500 },
                      ].map((tier) => {
                        const isActive = minPrice === tier.min && maxPrice === tier.max;
                        return (
                          <button
                            key={tier.label}
                            type="button"
                            onClick={() => {
                              setMinPrice(tier.min);
                              setMaxPrice(tier.max);
                            }}
                            className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                              isActive
                                ? 'bg-brand-dark text-brand-beige border border-brand-dark shadow-sm'
                                : 'bg-transparent border border-brand-dark/10 text-brand-dark/70 hover:border-brand-dark'
                            }`}
                          >
                            {tier.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>

              {/* Reset filter inside box */}
              {isFiltered && (
                <div className="px-6 pb-6 flex justify-end">
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center space-x-2 text-xs uppercase tracking-widest font-medium text-brand-accent hover:text-brand-dark transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Active Filters</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter tags panel */}
        {isFiltered && (
          <div className="flex flex-wrap items-center gap-2 mb-8 font-sans">
            <span className="text-xs text-brand-dark/40 tracking-wider">Active Filters:</span>
            
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-dark text-brand-beige text-xs font-light tracking-wide rounded-full">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory('All')} className="hover:text-brand-accent">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery !== '' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-dark text-brand-beige text-xs font-light tracking-wide rounded-full">
                <span>Keyword: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-brand-accent">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedStock !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-dark text-brand-beige text-xs font-light tracking-wide rounded-full">
                <span>In Stock Only</span>
                <button onClick={() => setSelectedStock('all')} className="hover:text-brand-accent">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {(minPrice !== 0 || maxPrice !== 500) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-dark text-brand-beige text-xs font-light tracking-wide rounded-full">
                <span>Budget: ${minPrice}-${maxPrice}</span>
                <button onClick={() => { setMinPrice(0); setMaxPrice(500); }} className="hover:text-brand-accent">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs text-brand-accent font-semibold hover:underline"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Products Grid list */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            key={`${selectedCategory}-${searchQuery}-${minPrice}-${maxPrice}-${selectedStock}-${sortBy}`}
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.some((item) => item.id === product.id);
              return (
                <motion.div key={product.id} variants={gridItemVariants} className="h-full">
                  <ProductCard
                    product={product}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={isWishlisted}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-24 bg-brand-beige border border-dashed border-brand-muted/80 rounded-sm">
            <h3 className="text-xl font-serif font-light text-brand-dark/70 mb-2">No boutique items found</h3>
            <p className="text-sm text-brand-dark/40 font-sans max-w-md mx-auto mb-6">
              We couldn't find any designs matching your exact criteria. Try resetting the active filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 bg-brand-dark text-brand-beige text-xs uppercase tracking-widest font-sans font-medium hover:bg-brand-accent transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
