import React, { useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, CheckCircle, RefreshCw, Layers, ArrowRight, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Color } from '../types';
import { PRODUCTS } from '../data';

interface StylistGuideProps {
  onAddLookToCart: (items: { product: Product; size: string; color: Color }[]) => void;
  onClose: () => void;
  isOpen: boolean;
}

interface StylistSlot {
  id: 'apparel' | 'accessory' | 'fragrance';
  name: string;
  category: string;
  icon: string;
}

const SLOTS: StylistSlot[] = [
  { id: 'apparel', name: 'Luxury Outfit', category: 'Apparel', icon: '👗' },
  { id: 'accessory', name: 'Curated Accessory', category: 'Accessories', icon: '👜' },
  { id: 'fragrance', name: 'Sensory Layer', category: 'Fragrance', icon: '✨' },
];

const PRESETS = [
  {
    name: 'Tuscan Soirée',
    description: 'Effortless silk and rich leather paired with crisp aromatic wood tones.',
    items: ['aura-silk-dress', 'sienna-shoulder-bag', 'l-ether-parfum'],
  },
  {
    name: 'Urban Minimalist',
    description: 'Mongolian cashmere mockneck combined with dark acetate frames.',
    items: ['cashmere-mockneck', 'soleil-sunglasses', 'l-ether-parfum'],
  },
  {
    name: 'Classic Tailoring',
    description: 'Immaculate structured blazer paired with genuine hand-hammered 14k gold hoops.',
    items: ['tailored-blazer', 'gold-hoop-earrings', 'l-ether-parfum'],
  },
];

export default function StylistGuide({ onAddLookToCart, onClose, isOpen }: StylistGuideProps) {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: Product | null }>({
    apparel: null,
    accessory: null,
    fragrance: null,
  });
  const [activeSlot, setActiveSlot] = useState<'apparel' | 'accessory' | 'fragrance'>('apparel');
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Initialize with the first preset "Tuscan Soirée" on load
  useEffect(() => {
    applyPreset(PRESETS[0]);
  }, []);

  if (!isOpen) return null;

  // Filter items available for the active slot category
  const availableItemsForSlot = PRODUCTS.filter(
    (product) => product.category === SLOTS.find((s) => s.id === activeSlot)?.category
  );

  const handleSelectItem = (slotId: string, product: Product) => {
    setSelectedItems((prev) => ({
      ...prev,
      [slotId]: product,
    }));
  };

  function applyPreset(preset: typeof PRESETS[0]) {
    const newSelection: { [key: string]: Product | null } = {
      apparel: null,
      accessory: null,
      fragrance: null,
    };

    preset.items.forEach((id) => {
      const match = PRODUCTS.find((p) => p.id === id);
      if (match) {
        if (match.category === 'Apparel') newSelection.apparel = match;
        if (match.category === 'Accessories') newSelection.accessory = match;
        if (match.category === 'Fragrance') newSelection.fragrance = match;
      }
    });

    setSelectedItems(newSelection);
  }

  const handleClearSelection = () => {
    setSelectedItems({
      apparel: null,
      accessory: null,
      fragrance: null,
    });
  };

  // Calculations for total look
  const activeItemsList = Object.values(selectedItems).filter((item): item is Product => item !== null);
  const compositePrice = activeItemsList.reduce((sum, item) => sum + item.price, 0);

  const handleAddLook = () => {
    if (activeItemsList.length === 0) return;

    const itemsToCart = activeItemsList.map((product) => ({
      product,
      size: product.sizes[0] || 'One Size',
      color: product.colors[0],
    }));

    onAddLookToCart(itemsToCart);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div id="style-lounge-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        
        {/* Backdrop glass */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-dark/75 backdrop-blur-sm"
        />

        {/* Lounge Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 24, stiffness: 150 }}
          className="relative bg-brand-beige w-full max-w-6xl h-[92vh] md:h-[85vh] shadow-2xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden border border-brand-dark/10 rounded-3xl"
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="fixed md:absolute top-4 right-4 p-2 bg-brand-beige/90 backdrop-blur-md rounded-full border border-brand-dark/15 text-brand-dark hover:bg-brand-dark hover:text-brand-beige transition-colors z-30 shadow-md"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Preset Look Picker & Visual Composition */}
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-brand-muted/20 border-r border-brand-muted/80 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-semibold flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Interactive Style Lounge
                </span>
                <h3 className="text-2xl font-serif font-light text-brand-dark tracking-wide">
                  Curate Your Custom Ensemble
                </h3>
                <p className="text-xs text-brand-dark/50 leading-relaxed font-light mt-1">
                  Blend our signature apparel, leather designs, and organic sensory layers to discover your customized bespoke ensemble look.
                </p>
              </div>

              {/* Presets List */}
              <div className="space-y-2.5">
                <span className="text-[10px] uppercase tracking-widest text-brand-dark/40 font-bold block">
                  Select Signature Curations:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRESETS.map((preset) => {
                    const isPresetActive = preset.items.every((presetId) => {
                      const matchItem = PRODUCTS.find((p) => p.id === presetId);
                      if (!matchItem) return false;
                      if (matchItem.category === 'Apparel') return selectedItems.apparel?.id === presetId;
                      if (matchItem.category === 'Accessories') return selectedItems.accessory?.id === presetId;
                      if (matchItem.category === 'Fragrance') return selectedItems.fragrance?.id === presetId;
                      return false;
                    });

                    return (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset)}
                        className={`p-3 text-left border transition-all ${
                          isPresetActive
                            ? 'border-brand-accent bg-brand-beige ring-1 ring-brand-accent shadow'
                            : 'border-brand-dark/10 hover:border-brand-dark bg-transparent'
                        }`}
                      >
                        <h4 className="text-xs font-semibold text-brand-dark tracking-wide">{preset.name}</h4>
                        <p className="text-[10px] text-brand-dark/50 font-light leading-snug mt-0.5 line-clamp-2">
                          {preset.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Mannequin / Outfit Slots Card */}
              <div className="p-6 border border-brand-muted/80 bg-brand-beige shadow-inner space-y-4 relative overflow-hidden">
                <h4 className="text-[10px] uppercase tracking-widest text-brand-dark/40 font-bold text-center">
                  Composite Ensembles Look
                </h4>

                {/* Slots Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {SLOTS.map((slot) => {
                    const selectedProduct = selectedItems[slot.id];
                    const isActive = activeSlot === slot.id;

                    return (
                      <div
                        key={slot.id}
                        onClick={() => setActiveSlot(slot.id)}
                        className={`aspect-[3/4] border-2 cursor-pointer flex flex-col justify-center items-center p-2 text-center transition-all relative overflow-hidden ${
                          isActive
                            ? 'border-brand-accent bg-brand-beige shadow'
                            : selectedProduct
                            ? 'border-brand-dark/15 hover:border-brand-dark bg-brand-beige'
                            : 'border-dashed border-brand-dark/10 hover:border-brand-accent hover:bg-brand-accent/5'
                        }`}
                      >
                        {selectedProduct ? (
                          <>
                            <img
                              src={selectedProduct.image}
                              alt={selectedProduct.name}
                              className="absolute inset-0 w-full h-full object-cover brightness-[0.93]"
                            />
                            {/* Overlay text */}
                            <div className="absolute inset-x-0 bottom-0 bg-brand-dark/70 text-[9px] text-brand-beige py-1 px-1 tracking-wide font-light truncate">
                              {selectedProduct.name}
                            </div>
                          </>
                        ) : (
                          <div className="space-y-1">
                            <span className="text-xl filter grayscale opacity-45">{slot.icon}</span>
                            <span className="text-[10px] text-brand-dark/40 tracking-wider font-semibold block uppercase">
                              {slot.name}
                            </span>
                          </div>
                        )}

                        {/* Active highlight */}
                        {isActive && (
                          <div className="absolute top-1 right-1 w-2 h-2 bg-brand-accent rounded-full animate-ping" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Reset button inside composer */}
                {activeItemsList.length > 0 && (
                  <button
                    onClick={handleClearSelection}
                    className="mx-auto flex items-center space-x-1 text-[10px] uppercase tracking-widest text-brand-dark/40 hover:text-brand-accent font-semibold mt-2"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Clear Composition</span>
                  </button>
                )}
              </div>
            </div>

            {/* Price block and add CTA */}
            <div className="pt-6 border-t border-brand-muted/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-dark/40 block">Composite Outfit Sum</span>
                  <span className="text-2xl font-sans font-semibold text-brand-dark">${compositePrice.toFixed(2)}</span>
                </div>
                <span className="text-xs font-light text-brand-dark/50 tracking-wider">
                  {activeItemsList.length} items styled
                </span>
              </div>

              <button
                disabled={activeItemsList.length === 0 || addedSuccess}
                onClick={handleAddLook}
                className={`w-full py-4 text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-3 transition-colors ${
                  activeItemsList.length > 0
                    ? 'bg-brand-dark text-brand-beige hover:bg-brand-accent shadow-md'
                    : 'bg-brand-muted text-brand-dark/35 cursor-not-allowed'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-brand-accent" />
                    <span>Ensemble Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Styled Look to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Item Selector Drawer */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Category Tab Indicator */}
              <div className="flex items-center justify-between border-b border-brand-muted pb-3">
                <span className="text-xs uppercase tracking-widest text-brand-dark/40 font-bold">
                  Bespoke Options for:
                </span>
                <span className="text-xs font-semibold text-brand-accent uppercase tracking-widest">
                  {SLOTS.find((s) => s.id === activeSlot)?.name}
                </span>
              </div>

              {/* Slot selector options grid list */}
              <div className="grid grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
                {availableItemsForSlot.map((item) => {
                  const isSelected = selectedItems[activeSlot]?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(activeSlot, item)}
                      className={`group border cursor-pointer p-2.5 transition-all flex flex-col justify-between h-full bg-brand-beige ${
                        isSelected
                          ? 'border-brand-accent bg-brand-accent/5 ring-1 ring-brand-accent shadow'
                          : 'border-brand-dark/10 hover:border-brand-dark'
                      }`}
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-brand-muted/20 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-brand-accent text-brand-beige p-1 rounded-full shadow">
                            <CheckCircle className="w-3 h-3 fill-brand-accent text-brand-beige" />
                          </div>
                        )}
                      </div>

                      <div className="mt-3 space-y-1">
                        <h4 className="text-xs font-serif font-light text-brand-dark line-clamp-1 leading-snug">
                          {item.name}
                        </h4>
                        <div className="flex justify-between items-center mt-1 pt-1 border-t border-brand-muted/50">
                          <span className="text-xs font-sans font-medium text-brand-dark">
                            ${item.price.toFixed(2)}
                          </span>
                          {!item.inStock && (
                            <span className="text-[8px] uppercase tracking-widest font-semibold text-red-600 bg-red-50 px-1 py-0.5 rounded-xs">
                              Out
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Helper tips */}
            <div className="pt-6 border-t border-brand-muted/80 text-[10px] text-brand-dark/40 tracking-wider leading-relaxed">
              *Pro Stylist Tip: Layering with our bespoke glass Eau de Parfum grounds natural linen textures and dense organic wool weights for a truly cohesive aura presentation.
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
