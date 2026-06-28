import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CheckCircle2, Ticket, Sparkles, CreditCard, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal: e.g. 0.2 for 20%
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');

  // Checkout shipping state
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Calculations
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const deliveryFee = subtotal > 200 || subtotal === 0 ? 0 : 25;
  const taxesAmount = (subtotal - discountAmount) * 0.08; // 8% local tax
  const finalTotal = subtotal - discountAmount + deliveryFee + taxesAmount;

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    if (promoCode.trim().toUpperCase() === 'ELEGANCE20') {
      setAppliedDiscount(0.2); // 20% discount
      setPromoSuccess('Promo code ELEGANCE20 applied successfully! Enjoy 20% off.');
    } else if (promoCode.trim() === '') {
      setPromoError('Please enter a valid promo code.');
    } else {
      setPromoError('Invalid coupon code. Try ELEGANCE20.');
    }
  };

  const handleStartCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('shipping');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate high-end card verification & payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('success');
      onClearCart();
    }, 2000);
  };

  const handleReturnToShopping = () => {
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <AnimatePresence>
      <div id="cart-drawer-overlay-wrapper" className="fixed inset-0 z-50 overflow-hidden">
        
        {/* Backdrop background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
        />

        {/* Sliding Right Drawer Container */}
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
                <ShoppingBag className="w-5 h-5 text-brand-dark" />
                <h2 className="text-lg font-serif font-light tracking-wide text-brand-dark">
                  {checkoutStep === 'cart' && 'Your Shopping Bag'}
                  {checkoutStep === 'shipping' && 'Curated Checkout'}
                  {checkoutStep === 'success' && 'Order Confirmed'}
                </h2>
              </div>
              <button
                id="cart-drawer-close"
                onClick={onClose}
                className="p-1.5 text-brand-dark/60 hover:text-brand-dark hover:bg-brand-muted transition-colors rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Workflow steps views */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
              {checkoutStep === 'cart' && (
                <>
                  {cart.length > 0 ? (
                    <div className="space-y-6">
                      {/* Cart Items list */}
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 pb-4 border-b border-brand-muted/70 items-start font-sans"
                          >
                            {/* Product thumb */}
                            <div className="w-20 aspect-[3/4] bg-brand-muted/20 flex-shrink-0 overflow-hidden">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover object-center"
                              />
                            </div>

                            {/* Details & controls */}
                            <div className="flex-1 flex flex-col justify-between h-full min-h-[100px]">
                              <div className="space-y-0.5">
                                <h3 className="text-sm font-serif font-light tracking-wide text-brand-dark">
                                  {item.product.name}
                                </h3>
                                <p className="text-[11px] text-brand-dark/40 font-light tracking-wider uppercase">
                                  Category: {item.product.category}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-[11px] bg-brand-muted text-brand-dark/75 px-1.5 py-0.5 font-medium rounded-xs">
                                    Size: {item.selectedSize}
                                  </span>
                                  <span className="flex items-center gap-1 text-[11px] bg-brand-muted text-brand-dark/75 px-1.5 py-0.5 font-medium rounded-xs">
                                    Color:
                                    <span
                                      className="w-2 h-2 rounded-full border border-brand-dark/10 inline-block"
                                      style={{ backgroundColor: item.selectedColor.hex }}
                                    />
                                    {item.selectedColor.name}
                                  </span>
                                </div>
                              </div>

                              {/* Quantity & Trash */}
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center border border-brand-dark/10 rounded-xs bg-brand-beige">
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                    className="p-1.5 text-brand-dark/60 hover:text-brand-dark"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="px-3 text-xs font-mono font-medium text-brand-dark">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                    className="p-1.5 text-brand-dark/60 hover:text-brand-dark"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <div className="flex items-center space-x-3">
                                  <span className="text-xs font-semibold text-brand-dark">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                  </span>
                                  <button
                                    onClick={() => onRemoveItem(item.id)}
                                    className="text-brand-dark/40 hover:text-red-600 transition-colors"
                                    title="Remove Item"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Promo Code input wrapper */}
                      <div className="p-4 border border-brand-muted rounded-none bg-brand-muted/5 font-sans">
                        <div className="flex items-center gap-2 mb-2">
                          <Ticket className="w-4 h-4 text-brand-accent" />
                          <span className="text-xs uppercase tracking-widest font-semibold text-brand-dark">Promo Code</span>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter ELEGANCE20"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1 text-xs uppercase font-mono tracking-widest bg-brand-beige border border-brand-dark/10 p-2 focus:outline-none focus:border-brand-accent text-brand-dark"
                          />
                          <button
                            onClick={handleApplyPromo}
                            className="bg-brand-dark text-brand-beige px-4 py-2 text-xs uppercase tracking-widest font-semibold hover:bg-brand-accent transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        {promoSuccess && <p className="text-[11px] text-green-700 mt-2 font-medium">{promoSuccess}</p>}
                        {promoError && <p className="text-[11px] text-red-600 mt-2 font-medium">{promoError}</p>}
                      </div>
                    </div>
                  ) : (
                    /* Empty Bag State */
                    <div className="text-center py-20 font-sans">
                      <ShoppingBag className="w-12 h-12 text-brand-dark/20 mx-auto mb-4 stroke-[1.2]" />
                      <h3 className="text-base font-serif font-light text-brand-dark mb-1">Your bag is empty</h3>
                      <p className="text-xs text-brand-dark/50 max-w-xs mx-auto mb-6">
                        Explore our curated collections of artisanal apparel, accessories, and fragrance.
                      </p>
                      <button
                        onClick={onClose}
                        className="px-6 py-3 bg-brand-dark text-brand-beige text-xs uppercase tracking-widest font-semibold hover:bg-brand-accent transition-colors"
                      >
                        Keep Exploring
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Step: Shipping & Credit Details */}
              {checkoutStep === 'shipping' && (
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-6 font-sans">
                  
                  {/* Delivery details section */}
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-dark border-b border-brand-muted pb-1.5">
                      1. Courier Delivery Details
                    </h3>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-brand-dark/50 font-semibold block">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="E.g. Olivia Sterling"
                        className="w-full text-xs bg-brand-beige border border-brand-dark/10 p-2.5 focus:outline-none focus:border-brand-accent"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-brand-dark/50 font-semibold block">Shipping Address</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="182 Bel-Air Drive, Apt 4C"
                        className="w-full text-xs bg-brand-beige border border-brand-dark/10 p-2.5 focus:outline-none focus:border-brand-accent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-brand-dark/50 font-semibold block">City & Country</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Los Angeles, USA"
                          className="w-full text-xs bg-brand-beige border border-brand-dark/10 p-2.5 focus:outline-none focus:border-brand-accent"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-brand-dark/50 font-semibold block">Postal Code</label>
                        <input
                          type="text"
                          required
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="90077"
                          className="w-full text-xs bg-brand-beige border border-brand-dark/10 p-2.5 focus:outline-none focus:border-brand-accent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment details section */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between border-b border-brand-muted pb-1.5">
                      <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-dark">
                        2. Premium Payment Method
                      </h3>
                      <div className="flex gap-1.5 text-brand-dark/40">
                        <CreditCard className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-brand-dark/50 font-semibold block">Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4111 8888 2222 5555"
                        maxLength={19}
                        className="w-full text-xs font-mono bg-brand-beige border border-brand-dark/10 p-2.5 focus:outline-none focus:border-brand-accent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-brand-dark/50 font-semibold block">Expiry Date</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full text-xs font-mono bg-brand-beige border border-brand-dark/10 p-2.5 focus:outline-none focus:border-brand-accent"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-brand-dark/50 font-semibold block">CVV Secure</label>
                        <input
                          type="password"
                          required
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="***"
                          maxLength={3}
                          className="w-full text-xs font-mono bg-brand-beige border border-brand-dark/10 p-2.5 focus:outline-none focus:border-brand-accent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-center gap-2 text-[10px] text-brand-dark/40 tracking-wider">
                    <Shield className="w-3.5 h-3.5 text-brand-accent" />
                    <span>Your checkout details are encrypted & secured by SSL</span>
                  </div>

                  {/* Submission and back buttons */}
                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold border border-brand-dark/15 text-brand-dark hover:bg-brand-muted transition-colors text-center"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-[2] bg-brand-dark text-brand-beige py-3 text-xs uppercase tracking-widest font-semibold hover:bg-brand-accent transition-colors flex items-center justify-center space-x-2"
                    >
                      {isProcessing ? (
                        <div className="w-4 h-4 border-2 border-brand-beige border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>Simulate Purchase</span>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Step: Success screen */}
              {checkoutStep === 'success' && (
                <div className="text-center py-10 font-sans space-y-6">
                  <div className="w-16 h-16 bg-brand-accent/15 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-brand-accent" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-accent block">Order Confirmed</span>
                    <h3 className="text-2xl font-serif font-light text-brand-dark">Awaiting Delivery</h3>
                    <p className="text-xs text-brand-dark/60 leading-relaxed max-w-xs mx-auto">
                      Thank you for choosing Bespoke. We have sent a simulated purchase receipt to your registered inbox.
                    </p>
                  </div>

                  {/* Order Details box */}
                  <div className="p-5 bg-brand-muted/20 border border-brand-muted rounded-none text-left space-y-3.5">
                    <div className="flex justify-between text-xs pb-2 border-b border-brand-muted/70">
                      <span className="text-brand-dark/40 uppercase tracking-widest">Order ID:</span>
                      <span className="font-mono font-semibold text-brand-dark">#BSPK-2026-{(Math.floor(Math.random() * 90000) + 10000)}</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-brand-dark/70 font-light">
                      <p><strong className="font-medium text-brand-dark">Recipient:</strong> {fullName || 'Olivia Sterling'}</p>
                      <p><strong className="font-medium text-brand-dark">Delivery Courier:</strong> premium Express Courier</p>
                      <p><strong className="font-medium text-brand-dark">Est. Arrival:</strong> 3-4 Business Days</p>
                      <p><strong className="font-medium text-brand-dark">Address:</strong> {address}, {city}</p>
                    </div>

                    <div className="pt-2 border-t border-brand-muted/70 flex justify-between items-center text-xs">
                      <span className="text-brand-dark/50 uppercase tracking-widest">Total Charged:</span>
                      <strong className="font-semibold text-brand-dark font-sans text-sm">${finalTotal.toFixed(2)}</strong>
                    </div>
                  </div>

                  <button
                    onClick={handleReturnToShopping}
                    className="w-full py-4.5 bg-brand-dark text-brand-beige text-xs uppercase tracking-widest font-semibold hover:bg-brand-accent transition-colors block"
                  >
                    Return to Storefront
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Footer block for Cart totals */}
            {cart.length > 0 && checkoutStep === 'cart' && (
              <div className="p-6 border-t border-brand-muted/80 bg-brand-muted/5 space-y-4 font-sans">
                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs text-brand-dark/60 font-light">
                    <span>Subtotal</span>
                    <span className="font-medium text-brand-dark">${subtotal.toFixed(2)}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-xs text-green-700 font-light">
                      <span>Boutique Discount (20%)</span>
                      <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xs text-brand-dark/60 font-light">
                    <span>Shipping Courier</span>
                    {deliveryFee === 0 ? (
                      <span className="text-brand-accent font-medium uppercase tracking-wider text-[10px]">Complimentary</span>
                    ) : (
                      <span className="font-medium text-brand-dark">${deliveryFee.toFixed(2)}</span>
                    )}
                  </div>

                  <div className="flex justify-between text-xs text-brand-dark/60 font-light">
                    <span>Local Taxes (8%)</span>
                    <span className="font-medium text-brand-dark">${taxesAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm font-semibold text-brand-dark pt-3 border-t border-brand-muted/50">
                    <span className="uppercase tracking-widest text-xs">Total Bag Sum</span>
                    <span className="text-base">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  id="cart-checkout-trigger-btn"
                  onClick={handleStartCheckout}
                  className="w-full py-4 bg-brand-dark text-brand-beige text-xs uppercase tracking-widest font-medium hover:bg-brand-accent transition-colors flex items-center justify-center space-x-3 group shadow"
                >
                  <span>Secure Checkout</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-[10px] text-brand-dark/40 tracking-wider text-center">
                  Enjoy complimentary courier shipping on all purchases above $200.
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
