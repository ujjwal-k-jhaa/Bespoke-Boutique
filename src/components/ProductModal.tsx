import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Color } from '../types';
import { REVIEWS } from '../data';

const INITIAL_PRODUCT_REVIEWS: { [productId: string]: any[] } = {
  'aura-silk-dress': [
    { id: '1', author: 'Eleonora M.', rating: 5, date: 'May 12, 2026', comment: 'The sand-washed silk has a beautiful heavy drape and feels absolutely luxurious on the skin. Sizing is spot on.' },
    { id: '2', author: 'Julianne P.', rating: 5, date: 'June 04, 2026', comment: 'An absolute masterpiece. Wore it to an opera in Florence and received countless compliments. Highly recommend!' },
    { id: '3', author: 'Charlotte S.', rating: 4, date: 'June 18, 2026', comment: 'Perfect flow and finish. Dropped a star only because it requires meticulous dry cleaning, but that’s expected for silk of this high quality.' }
  ],
  'sienna-shoulder-bag': [
    { id: '1', author: 'Liam H.', rating: 5, date: 'May 29, 2026', comment: 'Flawless craftsmanship—stitching is straight, the leather has that wonderful earthy tannery scent, and it holds its sculptural form perfectly.' },
    { id: '2', author: 'Genevieve R.', rating: 5, date: 'June 10, 2026', comment: 'Beautiful minimalistic design. The solid brass hardware has a wonderful heavy, premium feel. Fits my essentials perfectly.' }
  ],
  'l-ether-parfum': [
    { id: '1', author: 'Meredith K.', rating: 5, date: 'June 02, 2026', comment: 'L\'Éther Parfum is my new signature scent. It starts with a crisp citrus-spice pop and dries down into the most soothing, velvety cedar. Truly sophisticated.' },
    { id: '2', author: 'Tristan L.', rating: 5, date: 'June 15, 2026', comment: 'Perfect longevity. Not overpowering but leaves an incredibly elegant, clean, woody-iris aura. Received multiple compliments.' }
  ],
  'cashmere-mockneck': [
    { id: '1', author: 'Sebastian V.', rating: 5, date: 'January 14, 2026', comment: 'Unparalleled softness. I have cashmere from other luxury labels, but Bespoke\'s Mongolian knit is noticeably loftier and warmer.' },
    { id: '2', author: 'Victoria W.', rating: 4, date: 'February 03, 2026', comment: 'Beautiful tailored fit through the arms and neck. It drapes flat without any bulkiness. A wardrobe essential.' }
  ],
  'tailored-blazer': [
    { id: '1', author: 'Marcus D.', rating: 5, date: 'April 20, 2026', comment: 'Impeccable tailoring. The shoulder padding is structured but natural, and the cupro lining makes it feel incredibly smooth.' },
    { id: '2', author: 'Sophia A.', rating: 5, date: 'May 02, 2026', comment: 'Exquisite virgin wool weave. The slight sheen from the silk blend makes it look very luxurious under evening lighting.' }
  ],
  'soleil-sunglasses': [
    { id: '1', author: 'Olivia F.', rating: 4, date: 'June 01, 2026', comment: 'Very high quality bio-acetate frame. They have a good weight to them. Perfect tint level on the olive lenses.' },
    { id: '2', author: 'Harrison T.', rating: 5, date: 'June 22, 2026', comment: 'The tortoiseshell finish looks hand-crafted and unique. Fits my bridge comfortably without sliding down.' }
  ],
  'gold-hoop-earrings': [
    { id: '1', author: 'Chloe M.', rating: 5, date: 'March 11, 2026', comment: 'Delightfully lightweight! I can wear these all day long without any pull. The hand-hammered texture catches light perfectly.' },
    { id: '2', author: 'Isabella B.', rating: 5, date: 'April 28, 2026', comment: 'Very secure clicking clasp. High quality gold fill that hasn’t tarnished at all even after continuous daily wear.' }
  ],
  'linen-resort-shirt': [
    { id: '1', author: 'Julian K.', rating: 5, date: 'May 30, 2026', comment: 'Superb airflow. The camp collar design is relaxed but still looks crisp. Buttons are real mother-of-pearl.' },
    { id: '2', author: 'Adrian V.', rating: 4, date: 'June 14, 2026', comment: 'Extremely comfortable pre-washed flax linen. Has that perfect relaxed summer luxury vibe.' }
  ]
};

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: Color, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductModal({
  product: incomingProduct,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: ProductModalProps) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (incomingProduct) {
      setActiveProduct(incomingProduct);
    }
  }, [incomingProduct]);

  const product = incomingProduct || activeProduct;

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [bigImage, setBigImage] = useState('');
  const [reviewsByProduct, setReviewsByProduct] = useState<{ [productId: string]: any[] }>(INITIAL_PRODUCT_REVIEWS);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [sizeChartTab, setSizeChartTab] = useState<'apparel' | 'accessories' | 'footwear'>('apparel');
  const [sizeUnit, setSizeUnit] = useState<'in' | 'cm'>('in');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'One Size');
      setSelectedColor(product.colors[0] || null);
      setBigImage(product.image);
      setQuantity(1);
      setActiveTab('details');
      // Set default size guide tab based on current product category
      const cat = product.category.toLowerCase();
      if (cat.includes('apparel') || cat.includes('dress') || cat.includes('suit') || cat.includes('jacket') || cat.includes('coat')) {
        setSizeChartTab('apparel');
      } else if (cat.includes('shoe') || cat.includes('footwear') || cat.includes('boot')) {
        setSizeChartTab('footwear');
      } else {
        setSizeChartTab('accessories');
      }
    }
  }, [product]);

  if (!product) return null;

  const currentReviewsList = reviewsByProduct[product.id] || REVIEWS;

  const handleAddToCart = () => {
    if (!selectedColor) return;
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2500);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    const newReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: 'Today',
      comment: newReviewComment,
    };

    const currentProdReviews = reviewsByProduct[product.id] || [];
    setReviewsByProduct({
      ...reviewsByProduct,
      [product.id]: [newReview, ...currentProdReviews]
    });
    setNewReviewAuthor('');
    setNewReviewComment('');
    setNewReviewRating(5);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="product-quickview-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm"
          />

          {/* Modal Window Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ type: 'spring', damping: 28, stiffness: 190 }}
            className="relative bg-brand-beige w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row border border-brand-dark/10 rounded-3xl"
          >
          {/* Close button top right */}
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="fixed md:absolute top-6 right-6 md:top-4 md:right-4 p-2 bg-brand-beige/95 backdrop-blur-md rounded-full border border-brand-dark/15 text-brand-dark hover:bg-brand-dark hover:text-brand-beige transition-colors z-30 shadow-md"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Product Photos Gallery */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col gap-4 border-r border-brand-muted/40 bg-brand-muted/5">
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-muted/10">
              <img
                src={bigImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnail Carousel */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setBigImage(imgUrl)}
                    className={`w-16 h-20 flex-shrink-0 border overflow-hidden ${
                      bigImage === imgUrl ? 'border-brand-accent scale-[0.98]' : 'border-brand-dark/10 opacity-70 hover:opacity-100'
                    } transition-all`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Form Controls */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Product Category & Title */}
              <div className="space-y-1.5 mb-4">
                <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-sans font-medium">
                  {product.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-light text-brand-dark tracking-wide leading-tight">
                  {product.name}
                </h1>
                
                {/* Ratings block */}
                <div className="flex items-center space-x-2">
                  <div className="flex text-brand-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) ? 'fill-brand-accent' : 'text-brand-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-brand-dark/60 font-semibold">
                    {product.rating.toFixed(1)} rating ({currentReviewsList.length} reviews)
                  </span>
                </div>
              </div>

              {/* Price Tag */}
              <div className="text-xl font-sans font-medium text-brand-dark mb-6">
                ${product.price.toFixed(2)}
              </div>

              {/* Interactive Tabs Menu */}
              <div className="flex border-b border-brand-muted/80 mb-6 text-xs uppercase tracking-widest font-sans font-semibold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-3 pr-6 hover:text-brand-accent relative ${
                    activeTab === 'details' ? 'text-brand-dark' : 'text-brand-dark/40'
                  }`}
                >
                  Specs & Fit
                  {activeTab === 'details' && (
                    <motion.div layoutId="modal-tab-line" className="absolute bottom-0 left-0 right-6 h-[2px] bg-brand-accent" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-3 px-6 hover:text-brand-accent relative ${
                    activeTab === 'reviews' ? 'text-brand-dark' : 'text-brand-dark/40'
                  }`}
                >
                  Reviews ({currentReviewsList.length})
                  {activeTab === 'reviews' && (
                    <motion.div layoutId="modal-tab-line" className="absolute bottom-0 left-6 right-6 h-[2px] bg-brand-accent" />
                  )}
                </button>
              </div>

              {/* Tab: Specs and Details */}
              <div className="min-h-[160px] mb-8 font-sans">
                {activeTab === 'details' ? (
                  <div className="space-y-4">
                    <p className="text-sm font-light text-brand-dark/80 tracking-wide leading-relaxed">
                      {product.description}
                    </p>

                    {product.materials && (
                      <div className="text-xs text-brand-dark/60">
                        <span className="font-semibold text-brand-dark">Material Composition: </span>
                        {product.materials}
                      </div>
                    )}

                    <ul className="space-y-1.5 pt-2">
                      {product.details.map((detail, i) => (
                        <li key={i} className="flex items-start text-xs text-brand-dark/70 font-light leading-relaxed">
                          <span className="text-brand-accent mr-2.5 font-bold">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  /* Tab: Reviews Panel with Premium Customer Reviews and aggregate analysis */
                  <div className="space-y-6">
                    {/* Visual Rating Breakdown Chart */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 p-4.5 bg-brand-muted/20 border border-brand-dark/5 rounded-xl">
                      <div className="sm:col-span-4 flex flex-col items-center justify-center text-center border-b sm:border-b-0 sm:border-r border-brand-dark/10 pb-4 sm:pb-0 sm:pr-4">
                        <span className="text-4xl font-serif font-light text-brand-dark">{product.rating.toFixed(1)}</span>
                        <div className="flex text-brand-accent my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(product.rating) ? 'fill-brand-accent' : 'text-brand-dark/15'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-brand-dark/50 uppercase tracking-widest font-sans font-medium">
                          {currentReviewsList.length} verified reviews
                        </span>
                      </div>

                      <div className="sm:col-span-8 space-y-1.5 flex flex-col justify-center">
                        {[5, 4, 3, 2, 1].map((stars) => {
                          const count = currentReviewsList.filter((r) => r.rating === stars).length;
                          const pct = currentReviewsList.length > 0 ? (count / currentReviewsList.length) * 100 : 0;
                          return (
                            <div key={stars} className="flex items-center text-xs gap-3 font-sans">
                              <span className="w-12 text-right font-mono text-brand-dark/60 font-semibold">{stars} Star</span>
                              <div className="flex-1 h-1.5 bg-brand-dark/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.6, ease: 'easeOut' }}
                                  className="h-full bg-brand-accent rounded-full"
                                />
                              </div>
                              <span className="w-8 text-left font-mono text-brand-dark/40">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Write a review form with interactive stars selection */}
                    <form onSubmit={handleAddReview} className="p-5 border border-brand-dark/10 rounded-xl space-y-4 bg-brand-beige shadow-sm">
                      <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-brand-dark">Share your style perspective</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-wider text-brand-dark/60 font-semibold">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alexandra V."
                            value={newReviewAuthor}
                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                            className="w-full text-xs bg-brand-muted/20 border border-brand-dark/15 rounded-lg p-2.5 focus:outline-none focus:border-brand-accent focus:bg-white transition-all font-sans text-brand-dark"
                          />
                        </div>
                        
                        <div className="space-y-1 flex flex-col justify-end">
                          <label className="text-[10px] uppercase tracking-wider text-brand-dark/60 font-semibold mb-2">Your Rating</label>
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((starNum) => (
                              <button
                                key={starNum}
                                type="button"
                                onClick={() => setNewReviewRating(starNum)}
                                className="p-0.5 hover:scale-110 transition-transform cursor-pointer"
                                title={`${starNum} Stars`}
                              >
                                <Star
                                  className={`w-6 h-6 transition-colors ${
                                    starNum <= newReviewRating
                                      ? 'fill-brand-accent text-brand-accent'
                                      : 'text-brand-dark/20'
                                  }`}
                                />
                              </button>
                            ))}
                            <span className="text-xs font-semibold text-brand-accent ml-2 font-mono">{newReviewRating} / 5</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-brand-dark/60 font-semibold">Review details</label>
                        <textarea
                          required
                          rows={2.5}
                          placeholder="Tell us about the drape, the texture, and your overall aesthetic impression..."
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          className="w-full text-xs bg-brand-muted/20 border border-brand-dark/15 rounded-lg p-2.5 focus:outline-none focus:border-brand-accent focus:bg-white transition-all font-sans text-brand-dark"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-brand-dark text-brand-beige text-[10px] uppercase tracking-widest font-bold px-6 py-2.5 rounded-lg hover:bg-brand-accent transition-colors shadow-sm cursor-pointer"
                      >
                        Submit Style Review
                      </button>
                    </form>

                    {/* Customer Review Items list with interactive animations */}
                    <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">
                      {currentReviewsList.length === 0 ? (
                        <p className="text-xs text-center py-6 text-brand-dark/40 font-light">Be the first to share an immaculate review for this item.</p>
                      ) : (
                        currentReviewsList.map((rev, index) => (
                          <motion.div 
                            key={rev.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-brand-muted pb-4.5 space-y-2.5"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {/* Elegant letter avatar */}
                                <div className="w-8 h-8 rounded-full bg-brand-dark text-brand-beige flex items-center justify-center text-xs font-semibold uppercase tracking-wider">
                                  {rev.author.substring(0, 1)}
                                </div>
                                <div>
                                  <span className="text-xs font-semibold text-brand-dark block">{rev.author}</span>
                                  <div className="flex text-brand-accent mt-0.5">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-3 h-3 ${i < rev.rating ? 'fill-brand-accent text-brand-accent' : 'text-brand-dark/15'}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono text-brand-dark/40 uppercase tracking-wider">{rev.date}</span>
                            </div>
                            <p className="text-xs text-brand-dark/75 font-light leading-relaxed pl-11">
                              "{rev.comment}"
                            </p>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Color Selector Swatches */}
              {product.colors.length > 0 && (
                <div className="mb-5 space-y-2">
                  <span className="text-xs uppercase tracking-widest text-brand-dark/60 font-semibold font-sans">
                    Select Color: <span className="text-brand-dark font-medium">{selectedColor?.name}</span>
                  </span>
                  <div className="flex items-center space-x-3 pt-1">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor?.name === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            isSelected ? 'ring-2 ring-brand-accent ring-offset-2 scale-110 shadow-sm' : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {isSelected && (
                            <Check className={`w-3.5 h-3.5 ${color.hex === '#F3EFE9' || color.hex === '#F9F6F0' || color.hex === '#EBE0CC' ? 'text-brand-dark' : 'text-brand-beige'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sizes Selection Swatches */}
              {product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
                <div className="mb-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-brand-dark/60 font-semibold font-sans">
                      Select Size: <span className="text-brand-dark font-medium">{selectedSize}</span>
                    </span>
                    <button 
                      onClick={() => setShowSizeChart(true)} 
                      type="button"
                      className="text-[10px] uppercase tracking-wider text-brand-accent hover:text-brand-dark flex items-center gap-1 font-sans transition-colors cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" /> Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[42px] px-3.5 py-2 text-xs font-mono font-medium transition-all ${
                            isSelected
                              ? 'bg-brand-dark text-brand-beige border-brand-dark shadow'
                              : 'bg-transparent border border-brand-dark/15 text-brand-dark hover:border-brand-dark'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-6 border-t border-brand-muted/80 flex flex-col sm:flex-row gap-4 items-center font-sans">
              
              {/* Quantity selector */}
              {product.inStock && (
                <div className="flex items-center border border-brand-dark/15 rounded-none self-stretch sm:self-auto justify-between">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2.5 text-brand-dark/60 hover:text-brand-dark transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-mono font-medium text-brand-dark">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2.5 text-brand-dark/60 hover:text-brand-dark transition-colors"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Main Add to Cart CTA */}
              <button
                id="modal-add-to-cart-btn"
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center space-x-3 py-3.5 px-6 text-xs uppercase tracking-widest font-medium transition-all ${
                  product.inStock
                    ? 'bg-brand-dark text-brand-beige hover:bg-brand-accent shadow-md hover:shadow-lg'
                    : 'bg-brand-muted text-brand-dark/40 cursor-not-allowed'
                } self-stretch`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{product.inStock ? 'Add to Cart' : 'Temporarily Out of Stock'}</span>
              </button>

              {/* Wishlist Icon */}
              <button
                id="modal-wishlist-toggle-btn"
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 border shadow-sm transition-all self-stretch sm:self-auto flex justify-center items-center ${
                  isWishlisted
                    ? 'bg-brand-dark border-brand-dark text-brand-accent'
                    : 'bg-brand-beige border-brand-dark/15 text-brand-dark hover:bg-brand-dark hover:text-brand-beige'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-brand-accent' : ''}`} />
              </button>
            </div>
            
            {/* Safe shopping badges */}
            <div className="mt-4 flex items-center justify-center gap-6 text-[10px] text-brand-dark/50 tracking-wider font-light pt-2">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-brand-accent" /> Authentic Italian Crafts</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-brand-accent" /> 14-day Bespoke Returns</span>
            </div>
          </div>
        </motion.div>
      </div>
      )}

      {/* Adding feedback Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-brand-dark text-brand-beige px-6 py-4.5 border border-brand-accent/30 shadow-2xl flex items-center space-x-3 z-[60] font-sans"
          >
            <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-brand-beige" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide uppercase text-brand-accent">Ensemble Added</p>
              <p className="text-[11px] font-light text-brand-beige/85 mt-0.5">{product.name} ({selectedSize}) is secure in your bag.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Comprehensive Size Chart Overlay Modal */}
      <AnimatePresence>
        {showSizeChart && (
          <div id="size-chart-overlay" className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeChart(false)}
              className="fixed inset-0 bg-brand-dark/75 backdrop-blur-md"
            />

            {/* Panel Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative bg-brand-beige w-full max-w-3xl overflow-hidden shadow-2xl border border-white/20 rounded-2xl flex flex-col max-h-[85vh] font-sans"
            >
              {/* Header */}
              <div className="p-6 border-b border-brand-muted flex items-center justify-between bg-brand-muted/20">
                <div>
                  <h3 className="text-xl font-serif font-light tracking-wide text-brand-dark">Bespoke Sizing Guide</h3>
                  <p className="text-xs text-brand-dark/50 mt-1">Sizing standard and detailed measurements for an immaculate fit.</p>
                </div>
                <button
                  onClick={() => setShowSizeChart(false)}
                  className="p-2 bg-brand-beige rounded-full border border-brand-dark/10 text-brand-dark hover:bg-brand-dark hover:text-brand-beige transition-all shadow-sm cursor-pointer"
                  aria-label="Close Size Chart"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Subheader Options Bar */}
              <div className="px-6 py-4 bg-brand-beige border-b border-brand-muted/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Category Selector Tabs */}
                <div className="flex bg-brand-muted/40 p-1 rounded-xl border border-brand-dark/5 self-start">
                  <button
                    onClick={() => setSizeChartTab('apparel')}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg tracking-wider transition-all uppercase cursor-pointer ${
                      sizeChartTab === 'apparel'
                        ? 'bg-brand-dark text-brand-beige shadow-sm'
                        : 'text-brand-dark/60 hover:text-brand-dark'
                    }`}
                  >
                    Apparel
                  </button>
                  <button
                    onClick={() => setSizeChartTab('accessories')}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg tracking-wider transition-all uppercase cursor-pointer ${
                      sizeChartTab === 'accessories'
                        ? 'bg-brand-dark text-brand-beige shadow-sm'
                        : 'text-brand-dark/60 hover:text-brand-dark'
                    }`}
                  >
                    Accessories & Belts
                  </button>
                  <button
                    onClick={() => setSizeChartTab('footwear')}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg tracking-wider transition-all uppercase cursor-pointer ${
                      sizeChartTab === 'footwear'
                        ? 'bg-brand-dark text-brand-beige shadow-sm'
                        : 'text-brand-dark/60 hover:text-brand-dark'
                    }`}
                  >
                    Footwear
                  </button>
                </div>

                {/* Sizing Unit Switcher */}
                <div className="flex items-center space-x-2 border border-brand-dark/10 rounded-lg p-1 bg-white/40 self-end">
                  <button
                    onClick={() => setSizeUnit('in')}
                    className={`px-3 py-1 text-xs font-mono font-medium rounded cursor-pointer ${
                      sizeUnit === 'in' ? 'bg-brand-accent text-brand-beige' : 'text-brand-dark/60'
                    }`}
                  >
                    Inches (")
                  </button>
                  <button
                    onClick={() => setSizeUnit('cm')}
                    className={`px-3 py-1 text-xs font-mono font-medium rounded cursor-pointer ${
                      sizeUnit === 'cm' ? 'bg-brand-accent text-brand-beige' : 'text-brand-dark/60'
                    }`}
                  >
                    Metric (cm)
                  </button>
                </div>
              </div>

              {/* Scrollable Content Table */}
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                {sizeChartTab === 'apparel' && (
                  <div className="space-y-4">
                    <div className="overflow-x-auto rounded-lg border border-brand-dark/5 shadow-sm">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-brand-dark text-brand-beige uppercase tracking-wider font-semibold text-[10px]">
                            <th className="p-3">Standard Size</th>
                            <th className="p-3">US Size</th>
                            <th className="p-3">EU Size</th>
                            <th className="p-3">Chest / Bust</th>
                            <th className="p-3">Natural Waist</th>
                            <th className="p-3">Hip Circumference</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-muted bg-white/30">
                          {[
                            { std: 'XS', us: '0 - 2', eu: '32', chest: sizeUnit === 'in' ? '31" - 33"' : '79 - 84 cm', waist: sizeUnit === 'in' ? '24" - 25"' : '61 - 64 cm', hips: sizeUnit === 'in' ? '34" - 35"' : '86 - 89 cm' },
                            { std: 'S', us: '4 - 6', eu: '34 - 36', chest: sizeUnit === 'in' ? '34" - 35"' : '86 - 89 cm', waist: sizeUnit === 'in' ? '26" - 27"' : '66 - 69 cm', hips: sizeUnit === 'in' ? '36" - 37"' : '91 - 94 cm' },
                            { std: 'M', us: '8 - 10', eu: '38 - 40', chest: sizeUnit === 'in' ? '36" - 38"' : '91 - 97 cm', waist: sizeUnit === 'in' ? '28" - 29"' : '71 - 74 cm', hips: sizeUnit === 'in' ? '38" - 40"' : '97 - 102 cm' },
                            { std: 'L', us: '12 - 14', eu: '42 - 44', chest: sizeUnit === 'in' ? '39" - 41"' : '99 - 104 cm', waist: sizeUnit === 'in' ? '31" - 33"' : '79 - 84 cm', hips: sizeUnit === 'in' ? '41" - 43"' : '104 - 109 cm' },
                            { std: 'XL', us: '16', eu: '46', chest: sizeUnit === 'in' ? '42" - 44"' : '107 - 112 cm', waist: sizeUnit === 'in' ? '34" - 36"' : '86 - 91 cm', hips: sizeUnit === 'in' ? '44" - 46"' : '112 - 117 cm' },
                          ].map((row, i) => (
                            <tr key={i} className="hover:bg-brand-dark/[0.02] transition-colors font-sans">
                              <td className="p-3 font-semibold text-brand-dark">{row.std}</td>
                              <td className="p-3 font-mono text-brand-dark/80">{row.us}</td>
                              <td className="p-3 font-mono text-brand-dark/80">{row.eu}</td>
                              <td className="p-3 font-mono text-brand-dark/70">{row.chest}</td>
                              <td className="p-3 font-mono text-brand-dark/70">{row.waist}</td>
                              <td className="p-3 font-mono text-brand-dark/70">{row.hips}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-brand-muted/30 p-4 border-l-2 border-brand-accent text-[11px] font-light text-brand-dark/70 leading-relaxed rounded-r-lg">
                      <strong>Measuring Pro-Tip:</strong> Secure a flexible fabric measuring tape. When measuring bust/chest, level tape parallel to the floor around full circumference. For waist, measure around your natural indentation line.
                    </div>
                  </div>
                )}

                {sizeChartTab === 'accessories' && (
                  <div className="space-y-4">
                    <div className="overflow-x-auto rounded-lg border border-brand-dark/5 shadow-sm">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-brand-dark text-brand-beige uppercase tracking-wider font-semibold text-[10px]">
                            <th className="p-3">Standard Size</th>
                            <th className="p-3">Belt Length</th>
                            <th className="p-3">Corresponding Waist Size</th>
                            <th className="p-3">Adjustability Range</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-muted bg-white/30">
                          {[
                            { std: 'XS', len: sizeUnit === 'in' ? '30"' : '75 cm', waist: sizeUnit === 'in' ? '26" - 28"' : '65 - 70 cm', adj: '5 Holes (1" increments)' },
                            { std: 'S', len: sizeUnit === 'in' ? '32"' : '80 cm', waist: sizeUnit === 'in' ? '28" - 30"' : '70 - 75 cm', adj: '5 Holes (1" increments)' },
                            { std: 'M', len: sizeUnit === 'in' ? '34"' : '85 cm', waist: sizeUnit === 'in' ? '30" - 32"' : '75 - 80 cm', adj: '5 Holes (1" increments)' },
                            { std: 'L', len: sizeUnit === 'in' ? '36"' : '90 cm', waist: sizeUnit === 'in' ? '32" - 34"' : '80 - 85 cm', adj: '5 Holes (1" increments)' },
                            { std: 'XL', len: sizeUnit === 'in' ? '38"' : '95 cm', waist: sizeUnit === 'in' ? '34" - 36"' : '85 - 90 cm', adj: '5 Holes (1" increments)' },
                            { std: 'One Size', len: 'Universal', waist: 'Fits all silhouettes', adj: 'Premium Adjuster Slide' },
                          ].map((row, i) => (
                            <tr key={i} className="hover:bg-brand-dark/[0.02] transition-colors">
                              <td className="p-3 font-semibold text-brand-dark">{row.std}</td>
                              <td className="p-3 font-mono text-brand-dark/80">{row.len}</td>
                              <td className="p-3 font-mono text-brand-dark/70">{row.waist}</td>
                              <td className="p-3 text-brand-dark/60 font-light">{row.adj}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-brand-muted/30 p-4 border-l-2 border-brand-accent text-[11px] font-light text-brand-dark/70 leading-relaxed rounded-r-lg">
                      <strong>Accessories Guidance:</strong> Belts are engineered to measure from the base leather line to the middle notch. We advise procuring one sizing step larger than your standard apparel denim waistline.
                    </div>
                  </div>
                )}

                {sizeChartTab === 'footwear' && (
                  <div className="space-y-4">
                    <div className="overflow-x-auto rounded-lg border border-brand-dark/5 shadow-sm">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-brand-dark text-brand-beige uppercase tracking-wider font-semibold text-[10px]">
                            <th className="p-3">US Men's</th>
                            <th className="p-3">US Women's</th>
                            <th className="p-3">EU Equivalent</th>
                            <th className="p-3">UK Equivalent</th>
                            <th className="p-3">Foot Length</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-muted bg-white/30">
                          {[
                            { men: '4.5', women: '6.0', eu: '36', uk: '3.5', len: sizeUnit === 'in' ? '8.8"' : '22.5 cm' },
                            { men: '5.5', women: '7.0', eu: '37', uk: '4.5', len: sizeUnit === 'in' ? '9.2"' : '23.5 cm' },
                            { men: '6.5', women: '8.0', eu: '38', uk: '5.5', len: sizeUnit === 'in' ? '9.6"' : '24.5 cm' },
                            { men: '7.5', women: '9.0', eu: '39', uk: '6.5', len: sizeUnit === 'in' ? '10.0"' : '25.5 cm' },
                            { men: '8.5', women: '10.0', eu: '40', uk: '7.5', len: sizeUnit === 'in' ? '10.4"' : '26.5 cm' },
                            { men: '9.5', women: '11.0', eu: '41', uk: '8.5', len: sizeUnit === 'in' ? '10.8"' : '27.5 cm' },
                            { men: '10.5', women: '12.0', eu: '42', uk: '9.5', len: sizeUnit === 'in' ? '11.2"' : '28.5 cm' },
                          ].map((row, i) => (
                            <tr key={i} className="hover:bg-brand-dark/[0.02] transition-colors">
                              <td className="p-3 font-mono text-brand-dark/80">{row.men}</td>
                              <td className="p-3 font-mono text-brand-dark/80">{row.women}</td>
                              <td className="p-3 font-semibold text-brand-dark">{row.eu}</td>
                              <td className="p-3 font-mono text-brand-dark/70">{row.uk}</td>
                              <td className="p-3 font-mono text-brand-dark/70">{row.len}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Info Bar */}
              <div className="p-4 bg-brand-dark text-brand-beige/80 text-center text-[10px] uppercase tracking-widest font-sans font-light border-t border-white/5">
                Have atypical proportions? <span className="text-brand-accent font-medium">Bespoke custom tailors</span> are available. Schedule via the Style Lounge.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
