import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Reviews = () => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing food quality and super fast delivery! The pizza was still hot when it arrived.',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Mike Chen',
      rating: 4,
      comment: 'Great variety of dishes. The pasta was delicious and the portion size was perfect.',
      date: '2024-01-12'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      rating: 5,
      comment: 'Best cloud kitchen in town! Fresh ingredients and excellent presentation.',
      date: '2024-01-10'
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      ...newReview,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowForm(false);
  };

  const StarRating = ({ rating, interactive = false, onChange }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type={interactive ? 'button' : undefined}
            whileHover={interactive ? { scale: 1.2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            onClick={interactive ? () => onChange(star) : undefined}
            className={`text-2xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
          >
            ⭐
          </motion.button>
        ))}
      </div>
    );
  };

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

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            {t.reviews.title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            {t.reviews.addReview}
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={itemVariants}
                layout
                className="card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-dark">
                    {review.name}
                  </h3>
                  <StarRating rating={review.rating} />
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  "{review.comment}"
                </p>
                
                <p className="text-xs text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Review Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
              >
                <h3 className="text-2xl font-bold text-dark mb-6">
                  {t.reviews.addReview}
                </h3>
                
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.reviews.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.reviews.rating}
                    </label>
                    <StarRating
                      rating={newReview.rating}
                      interactive={true}
                      onChange={(rating) => setNewReview({...newReview, rating})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.reviews.comment}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowForm(false)}
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
                      {t.reviews.submit}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Reviews;