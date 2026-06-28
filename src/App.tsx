import { useState, useRef } from 'react';
import { PRODUCTS } from './data';
import { Product, CartItem, Color } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import StylistGuide from './components/StylistGuide';
import HeritageSection from './components/HeritageSection';
import Footer from './components/Footer';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);

  // Catalog Scroll Ref
  const catalogRef = useRef<HTMLDivElement>(null);

  const handleScrollToProducts = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Add a single item to cart
  const handleAddToCart = (product: Product, size: string, color: Color, quantity: number = 1) => {
    const itemId = `${product.id}-${size}-${color.name}`;
    
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity,
        };
        return newCart;
      } else {
        const newItem: CartItem = {
          id: itemId,
          product,
          quantity,
          selectedSize: size,
          selectedColor: color,
        };
        return [...prevCart, newItem];
      }
    });
  };

  // Add an entire pre-curated outfit style look to cart
  const handleAddLookToCart = (items: { product: Product; size: string; color: Color }[]) => {
    items.forEach((item) => {
      handleAddToCart(item.product, item.size, item.color, 1);
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-beige relative overflow-hidden">
      {/* Premium Cosmic Flow Animation Background Layer */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-60 select-none">
        {/* Subtle glowing cosmic elements with brand luxury tones */}
        <div className="absolute top-[-10%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-[#ebdcb9]/45 to-[#ebdcb9]/10 blur-[130px] cosmic-blob-1" />
        <div className="absolute top-[35%] right-[-15%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#c1a45e]/15 to-[#ebdcb9]/35 blur-[140px] cosmic-blob-2" />
        <div className="absolute bottom-[-15%] left-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#e5dec9]/50 to-[#ebdcb9]/20 blur-[110px] cosmic-blob-3" />
        {/* Premium ambient star field particle structure */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#121212_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </div>

      {/* Top sticky/transparent navigation bar */}
      <Navbar
        cart={cart}
        wishlist={wishlist}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenStylist={() => setIsStylistOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onScrollToProducts={handleScrollToProducts}
      />

      {/* Main viewport */}
      <main className="flex-grow pt-32 sm:pt-36 lg:pt-40">
        {/* Editorial Hero view */}
        <Hero
          onScrollToProducts={handleScrollToProducts}
          onOpenStylist={() => setIsStylistOpen(true)}
        />

        {/* Collections Quick Pill Navigator */}
        <CategorySection
          onSelectCategory={setSelectedCategory}
          onScrollToProducts={handleScrollToProducts}
          selectedCategory={selectedCategory}
        />

        {/* Core Catalog section */}
        <div ref={catalogRef} className="scroll-mt-24">
          <ProductGrid
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onQuickView={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
          />
        </div>

        {/* Editorial Brand Heritage Section & Promises */}
        <HeritageSection />
      </main>

      {/* Footer credits and forms */}
      <Footer />

      {/* Dynamic Overlay Components Drawers & Modals */}
      
      {/* 1. Saved wishlist drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setSelectedProduct(p)}
      />

      {/* 2. Shopping bag drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 3. Style Lounge Mixer popup */}
      <StylistGuide
        isOpen={isStylistOpen}
        onClose={() => setIsStylistOpen(false)}
        onAddLookToCart={handleAddLookToCart}
      />

      {/* 4. Detailed product quickview modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlist.some((item) => item.id === selectedProduct.id) : false}
      />
    </div>
  );
}
