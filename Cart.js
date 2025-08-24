import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

const Cart = ({ setActiveSection }) => {
  const { language, t } = useLanguage();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (cartItems.length === 0) {
    return (
      <section className="py-20 bg-white min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold text-dark mb-4">{t.cart.empty}</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('menu')}
            className="btn-primary"
          >
            {t.menu.title}
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-dark mb-4">{t.cart.title}</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="space-y-6 mb-8">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="card p-6 flex items-center space-x-4"
              >
                <img
                  src={item.image}
                  alt={item.name[language]}
                  className="w-20 h-20 object-cover rounded-2xl"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-dark">
                    {item.name[language]}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    €{item.price} each
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </motion.button>
                  
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </motion.button>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    {t.cart.remove}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 text-center"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-bold text-dark">{t.cart.total}:</span>
            <span className="text-3xl font-bold text-primary">
              €{getTotalPrice().toFixed(2)}
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCheckout(true)}
            className="btn-primary w-full text-lg py-4"
          >
            {t.cart.checkout}
          </motion.button>
        </motion.div>

        {showCheckout && (
          <CheckoutForm 
            setShowCheckout={setShowCheckout} 
            cartItems={cartItems}
            total={getTotalPrice()}
          />
        )}
      </div>
    </section>
  );
};

const CheckoutForm = ({ setShowCheckout, cartItems, total }) => {
  const { language, t } = useLanguage();
  const { clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format order for WhatsApp
    const orderItems = cartItems.map(item => 
      `${item.quantity}x ${item.name[language]}`
    ).join(', ');
    
    clearCart();
    setShowCheckout(false);
    alert('Order placed successfully! Please contact +33 7 58 46 03 81 to complete your order.');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full"
      >
        <h3 className="text-2xl font-bold text-dark mb-6">{t.checkout.title}</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.checkout.name}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.checkout.phone}
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.checkout.email}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCheckout(false)}
              className="flex-1 py-3 px-6 border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </motion.button>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 btn-primary"
            >
              {t.checkout.placeOrder}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Cart;