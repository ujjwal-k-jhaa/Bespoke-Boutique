import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenStylist: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onScrollToProducts: () => void;
}

export default function Navbar({
  cart,
  wishlist,
  onOpenCart,
  onOpenWishlist,
  onOpenStylist,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onScrollToProducts,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setIsMobileMenuOpen(false);
    onScrollToProducts();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none flex flex-col">
      {/* Top Banner */}
      <div 
        id="top-announcement-banner" 
        className={`pointer-events-auto bg-brand-dark text-brand-beige text-center px-4 text-[10px] sm:text-xs tracking-widest font-sans font-light uppercase flex items-center justify-center gap-2 relative z-50 transition-all duration-500 ease-out overflow-hidden ${
          isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-16 py-2.5 opacity-100'
        }`}
      >
        <Sparkles className="w-3 h-3 text-brand-accent animate-pulse shrink-0" />
        <span className="truncate">Complimentary courier shipping on orders over $200 — Apply Code <strong className="font-semibold text-brand-accent">ELEGANCE20</strong> for 20% off</span>
      </div>

      {/* Main Header */}
      <header
        id="main-navigation-header"
        className={`pointer-events-auto w-full px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          isScrolled ? 'mt-2' : 'mt-2.5 sm:mt-4'
        }`}
      >
        <div 
          className={`mx-auto transition-all duration-500 ease-out rounded-2xl md:rounded-full ${
            isScrolled 
              ? 'max-w-6xl bg-brand-beige/85 backdrop-blur-xl shadow-[0_12px_45px_rgba(18,18,18,0.12)] border border-white/50 py-2.5 px-4 md:px-8' 
              : 'max-w-7xl bg-brand-beige/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(18,18,18,0.03)] border border-white/40 py-4 px-4 md:px-10'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Left: Mobile Toggle & Desktop Nav */}
            <div className="flex items-center">
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-2 text-brand-dark lg:hidden hover:text-brand-accent transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <nav className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-brand-dark/80">
                <button
                  onClick={() => handleCategoryClick('All')}
                  className={`hover:text-brand-accent transition-colors relative py-1 ${
                    selectedCategory === 'All' ? 'text-brand-accent' : ''
                  }`}
                >
                  Collections
                  {selectedCategory === 'All' && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-accent" />
                  )}
                </button>
                <button
                  onClick={() => handleCategoryClick('Apparel')}
                  className={`hover:text-brand-accent transition-colors relative py-1 ${
                    selectedCategory === 'Apparel' ? 'text-brand-accent' : ''
                  }`}
                >
                  Apparel
                  {selectedCategory === 'Apparel' && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-accent" />
                  )}
                </button>
                <button
                  onClick={() => handleCategoryClick('Accessories')}
                  className={`hover:text-brand-accent transition-colors relative py-1 ${
                    selectedCategory === 'Accessories' ? 'text-brand-accent' : ''
                  }`}
                >
                  Accessories
                  {selectedCategory === 'Accessories' && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-accent" />
                  )}
                </button>
                <button
                  onClick={() => handleCategoryClick('Fragrance')}
                  className={`hover:text-brand-accent transition-colors relative py-1 ${
                    selectedCategory === 'Fragrance' ? 'text-brand-accent' : ''
                  }`}
                >
                  Fragrance
                  {selectedCategory === 'Fragrance' && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-accent" />
                  )}
                </button>
              </nav>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex-1 flex justify-center lg:justify-center">
              <button
                onClick={() => handleCategoryClick('All')}
                className="text-2xl sm:text-3xl font-serif tracking-[0.25em] font-light text-brand-dark uppercase hover:text-brand-accent transition-colors duration-300"
              >
                Bespoke
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-1 sm:space-x-4">
              {/* Interactive Stylist Button */}
              <button
                id="nav-stylist-guide-btn"
                onClick={onOpenStylist}
                className="hidden md:flex items-center space-x-2 text-[10px] uppercase tracking-[0.18em] font-sans font-semibold px-4 py-2 border border-brand-accent/30 rounded-full hover:border-brand-accent hover:bg-brand-accent/5 transition-all text-brand-dark shadow-sm bg-brand-beige/40 backdrop-blur-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
                <span>Style Lounge</span>
              </button>

              {/* Mobile Style Lounge Icon Button */}
              <button
                id="nav-mobile-stylist-btn"
                onClick={onOpenStylist}
                className="md:hidden p-2 text-brand-dark hover:text-brand-accent transition-colors rounded-full hover:bg-brand-dark/5"
                aria-label="Style Lounge"
              >
                <Sparkles className="w-4.5 h-4.5 text-brand-accent animate-pulse" />
              </button>

              {/* Search Toggle */}
              <div className="relative flex items-center">
                <AnimatePresence>
                  {isSearchVisible && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 160, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                      className="absolute right-8 overflow-hidden bg-brand-beige/90 backdrop-blur-md rounded-full border border-brand-dark/10 px-3 py-1 shadow-sm flex items-center"
                    >
                      <input
                        type="text"
                        placeholder="Search collection..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-xs bg-transparent py-0.5 focus:outline-none font-sans text-brand-dark"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  id="nav-search-btn"
                  onClick={() => setIsSearchVisible(!isSearchVisible)}
                  className="p-2 text-brand-dark hover:text-brand-accent transition-colors rounded-full hover:bg-brand-dark/5"
                  aria-label="Search"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Wishlist Icon */}
              <button
                id="nav-wishlist-btn"
                onClick={onOpenWishlist}
                className="p-2 text-brand-dark hover:text-brand-accent transition-colors relative rounded-full hover:bg-brand-dark/5"
                aria-label="Wishlist"
              >
                <Heart className="w-4.5 h-4.5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-accent rounded-full border border-brand-beige shadow-sm" />
                )}
              </button>

              {/* Cart Icon */}
              <button
                id="nav-cart-btn"
                onClick={onOpenCart}
                className="p-2 text-brand-dark hover:text-brand-accent transition-colors relative rounded-full hover:bg-brand-dark/5"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-accent text-brand-beige text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-bold shadow-sm">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu with premium frosted background */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden mt-2 bg-brand-beige/95 backdrop-blur-lg border border-brand-dark/10 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="px-5 pt-4 pb-6 space-y-3 flex flex-col text-xs uppercase tracking-[0.2em] font-sans font-semibold text-brand-dark/80">
                <button
                  onClick={() => handleCategoryClick('All')}
                  className={`text-left py-2.5 border-b border-brand-muted/30 ${
                    selectedCategory === 'All' ? 'text-brand-accent pl-2' : ''
                  } transition-all`}
                >
                  All Collections
                </button>
                <button
                  onClick={() => handleCategoryClick('Apparel')}
                  className={`text-left py-2.5 border-b border-brand-muted/30 ${
                    selectedCategory === 'Apparel' ? 'text-brand-accent pl-2' : ''
                  } transition-all`}
                >
                  Apparel
                </button>
                <button
                  onClick={() => handleCategoryClick('Accessories')}
                  className={`text-left py-2.5 border-b border-brand-muted/30 ${
                    selectedCategory === 'Accessories' ? 'text-brand-accent pl-2' : ''
                  } transition-all`}
                >
                  Accessories
                </button>
                <button
                  onClick={() => handleCategoryClick('Fragrance')}
                  className={`text-left py-2.5 border-b border-brand-muted/30 ${
                    selectedCategory === 'Fragrance' ? 'text-brand-accent pl-2' : ''
                  } transition-all`}
                >
                  Fragrance
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenStylist();
                  }}
                  className="flex items-center space-x-2 text-left py-2.5 mt-2 text-brand-accent"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Style Lounge</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
