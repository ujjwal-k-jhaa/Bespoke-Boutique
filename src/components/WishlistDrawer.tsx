import { X, Heart, ShoppingBag, Eye, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Color } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: Color) => void;
  onQuickView: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  const handleMoveToCart = (product: Product) => {
    // Default to first size and color
    const defaultSize = product.sizes[0] || 'One Size';
    const defaultColor = product.colors[0];
    onAddToCart(product, defaultSize, defaultColor);
    onRemoveFromWishlist(product);
  };

  return (
    <AnimatePresence>
      <div id="wishlist-drawer-wrapper" className="fixed inset-0 z-50 overflow-hidden">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
        />

        {/* Slide-out Panel */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="w-screen max-w-md bg-brand-beige/85 backdrop-blur-xl border-l border-white/30 shadow-[0_0_40px_rgba(18,18,18,0.1)] flex flex-col h-full"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-muted flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Heart className="w-5 h-5 text-brand-accent fill-brand-accent" />
                <h2 className="text-lg font-serif font-light tracking-wide text-brand-dark">Your Boutique Wishlist</h2>
              </div>
              <button
                id="wishlist-drawer-close"
                onClick={onClose}
                className="p-1.5 text-brand-dark/60 hover:text-brand-dark hover:bg-brand-muted transition-colors rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
              {wishlist.length > 0 ? (
                <div className="space-y-4">
                  {wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 pb-4 border-b border-brand-muted/70 items-start font-sans"
                    >
                      {/* Image thumb */}
                      <div className="w-16 aspect-[3/4] bg-brand-muted/20 flex-shrink-0 overflow-hidden cursor-pointer" onClick={() => { onQuickView(product); onClose(); }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Info & action buttons */}
                      <div className="flex-1 flex flex-col justify-between h-full min-h-[90px]">
                        <div className="space-y-0.5">
                          <h3 className="text-xs font-serif font-light tracking-wide text-brand-dark hover:text-brand-accent cursor-pointer line-clamp-1" onClick={() => { onQuickView(product); onClose(); }}>
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-brand-dark font-sans">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className={`text-[9px] uppercase tracking-wider font-semibold ${product.inStock ? 'text-green-700' : 'text-brand-dark/40'}`}>
                              {product.inStock ? 'In Stock' : 'Sold Out'}
                            </span>
                          </div>
                        </div>

                        {/* Actions block */}
                        <div className="flex items-center justify-between mt-3 gap-2">
                          <button
                            onClick={() => handleMoveToCart(product)}
                            disabled={!product.inStock}
                            className={`flex-1 flex items-center justify-center space-x-1.5 py-1.5 px-3 text-[10px] uppercase tracking-widest font-semibold transition-colors ${
                              product.inStock
                                ? 'bg-brand-dark text-brand-beige hover:bg-brand-accent'
                                : 'bg-brand-muted text-brand-dark/35 cursor-not-allowed'
                            }`}
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </button>

                          <button
                            onClick={() => {
                              onQuickView(product);
                              onClose();
                            }}
                            className="p-1.5 border border-brand-dark/10 text-brand-dark hover:bg-brand-muted transition-colors"
                            title="Quick View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onRemoveFromWishlist(product)}
                            className="p-1.5 text-brand-dark/40 hover:text-red-600 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div className="text-center py-20 font-sans">
                  <Heart className="w-12 h-12 text-brand-dark/15 mx-auto mb-4 stroke-[1.2]" />
                  <h3 className="text-base font-serif font-light text-brand-dark mb-1">Your wishlist is empty</h3>
                  <p className="text-xs text-brand-dark/50 max-w-xs mx-auto mb-6">
                    Tap the heart icon on any design style to save it to your personal boutique wishlist.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-brand-dark text-brand-beige text-xs uppercase tracking-widest font-semibold hover:bg-brand-accent transition-colors"
                  >
                    Browse Collections
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
