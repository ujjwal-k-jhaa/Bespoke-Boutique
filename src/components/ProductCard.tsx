import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, Color } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: Color) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to the first available size and color
    const defaultSize = product.sizes[0] || 'One Size';
    const defaultColor = product.colors[0];
    onAddToCart(product, defaultSize, defaultColor);
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col h-full bg-brand-beige border border-brand-muted/60 overflow-hidden shadow-[0_4px_24px_rgba(18,18,18,0.02)] hover:shadow-[0_16px_48px_rgba(18,18,18,0.06)] rounded-2xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image and Overlay Tools */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-muted/20 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-brand-beige text-brand-dark px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-sans font-semibold border border-brand-dark/10 shadow-sm">
              New
            </span>
          )}
          {!product.inStock && (
            <span className="bg-brand-dark text-brand-beige px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-sans font-semibold shadow-sm">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick Wishlist Icon */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full border shadow-sm transition-all duration-300 z-10 ${
            isWishlisted
              ? 'bg-brand-dark border-brand-dark text-brand-accent'
              : 'bg-brand-beige/80 border-brand-muted/40 text-brand-dark hover:bg-brand-dark hover:text-brand-beige'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-brand-accent' : ''}`} />
        </button>

        {/* Hover Utility Panel - Premium Glassmorphic Strip */}
        <div className="absolute inset-x-3 bottom-3 p-3 bg-brand-beige/75 backdrop-blur-md border border-white/55 rounded-xl lg:translate-y-[120%] lg:group-hover:translate-y-0 transition-all duration-500 ease-out flex items-center justify-center gap-2 z-10 shadow-lg">
          <button
            id={`quick-add-btn-${product.id}`}
            disabled={!product.inStock}
            onClick={handleQuickAdd}
            className={`flex-grow flex items-center justify-center space-x-2 px-3 py-2 text-[9px] uppercase tracking-widest font-sans font-semibold rounded-lg transition-all cursor-pointer ${
              product.inStock
                ? 'bg-brand-dark text-brand-beige hover:bg-brand-accent shadow-sm'
                : 'bg-brand-muted text-brand-dark/40 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.inStock ? 'Quick Buy' : 'Out of Stock'}</span>
          </button>

          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2 bg-brand-beige text-brand-dark hover:bg-brand-accent hover:text-brand-beige transition-colors rounded-lg shadow-sm border border-brand-dark/10 cursor-pointer"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Category */}
          <span className="text-[10px] uppercase tracking-widest text-brand-dark/40 font-sans font-semibold">
            {product.category}
          </span>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-base font-serif font-light tracking-wide text-brand-dark hover:text-brand-accent transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 py-0.5">
            <div className="flex items-center text-brand-accent">
              <Star className="w-3 h-3 fill-brand-accent" />
            </div>
            <span className="text-[10px] font-mono text-brand-dark/60 font-medium">
              {product.rating.toFixed(1)} <span className="text-brand-dark/30">({product.reviewsCount})</span>
            </span>
          </div>
        </div>

        {/* Price & Available colors */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-muted/40">
          <span className="text-sm font-sans font-medium text-brand-dark">
            ${product.price.toFixed(2)}
          </span>

          {/* Tiny Color Swatches */}
          <div className="flex items-center space-x-1.5">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="w-2.5 h-2.5 rounded-full border border-brand-dark/10"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
