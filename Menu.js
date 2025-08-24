import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { menuItems } from '../data/menuData';

const Menu = () => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();
  const [items, setItems] = useState(menuItems);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: { en: '', fr: '' },
    description: { en: '', fr: '' },
    price: '',
    image: ''
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const addItem = () => {
    const id = Date.now();
    setItems([...items, { ...newItem, id, price: parseFloat(newItem.price) }]);
    setNewItem({ name: { en: '', fr: '' }, description: { en: '', fr: '' }, price: '', image: '' });
    setShowAddForm(false);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            {t.menu.title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        {isAdmin && (
          <div className="text-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className="btn-secondary"
            >
              Add New Item
            </motion.button>
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="card p-6 group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={item.image}
                  alt={item.name[language]}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-xl font-semibold text-dark mb-2">
                {item.name[language]}
              </h3>
              
              <p className="text-gray-600 mb-4 text-sm">
                {item.description[language]}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  €{item.price}
                </span>
                
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(item)}
                    className="btn-primary text-sm px-4 py-2 flex-1"
                  >
                    {t.menu.addToCart}
                  </motion.button>
                  
                  {isAdmin && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeItem(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-2xl"
                    >
                      Remove
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add Item Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-6">Add New Item</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name (English)</label>
                  <input
                    type="text"
                    value={newItem.name.en}
                    onChange={(e) => setNewItem({...newItem, name: {...newItem.name, en: e.target.value}})}
                    className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Name (French)</label>
                  <input
                    type="text"
                    value={newItem.name.fr}
                    onChange={(e) => setNewItem({...newItem, name: {...newItem.name, fr: e.target.value}})}
                    className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description (English)</label>
                  <textarea
                    value={newItem.description.en}
                    onChange={(e) => setNewItem({...newItem, description: {...newItem.description, en: e.target.value}})}
                    className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-primary"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description (French)</label>
                  <textarea
                    value={newItem.description.fr}
                    onChange={(e) => setNewItem({...newItem, description: {...newItem.description, fr: e.target.value}})}
                    className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-primary"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Price (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    value={newItem.image}
                    onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                    className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-3 px-6 border rounded-2xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addItem}
                    className="flex-1 btn-primary"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;