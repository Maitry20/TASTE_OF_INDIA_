import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  const translations = {
    en: {
      nav: {
        home: 'Home',
        menu: 'Menu',
        cart: 'Cart',
        reviews: 'Reviews',
        signup: 'Sign Up'
      },
      hero: {
        title: 'Every Meal is a Happy Meal',
        subtitle: 'Experience the finest Indian cuisine with traditional spices and authentic recipes from our kitchen.',
        cta: 'Order Now'
      },
      menu: {
        title: 'Our Menu',
        addToCart: 'Add to Cart'
      },
      cart: {
        title: 'Your Cart',
        empty: 'Your cart is empty',
        total: 'Total',
        checkout: 'Checkout',
        remove: 'Remove'
      },
      checkout: {
        title: 'Order Details',
        name: 'Full Name',
        phone: 'Phone Number',
        email: 'Email Address',
        placeOrder: 'Place Order'
      },
      reviews: {
        title: 'Customer Reviews',
        addReview: 'Add Review',
        name: 'Your Name',
        rating: 'Rating',
        comment: 'Your Comment',
        submit: 'Submit Review'
      },
      signup: {
        title: 'Sign Up',
        name: 'Full Name',
        phone: 'Phone Number',
        submit: 'Sign Up',
        success: 'Successfully signed up!'
      }
    },
    fr: {
      nav: {
        home: 'Accueil',
        menu: 'Menu',
        cart: 'Panier',
        reviews: 'Avis',
        signup: 'S\'inscrire'
      },
      hero: {
        title: 'Chaque Repas est un Repas Heureux',
        subtitle: 'Découvrez la meilleure cuisine indienne avec des épices traditionnelles et des recettes authentiques.',
        cta: 'Commander Maintenant'
      },
      menu: {
        title: 'Notre Menu',
        addToCart: 'Ajouter au Panier'
      },
      cart: {
        title: 'Votre Panier',
        empty: 'Votre panier est vide',
        total: 'Total',
        checkout: 'Commander',
        remove: 'Supprimer'
      },
      checkout: {
        title: 'Détails de la Commande',
        name: 'Nom Complet',
        phone: 'Numéro de Téléphone',
        email: 'Adresse Email',
        placeOrder: 'Passer Commande'
      },
      reviews: {
        title: 'Avis Clients',
        addReview: 'Ajouter un Avis',
        name: 'Votre Nom',
        rating: 'Note',
        comment: 'Votre Commentaire',
        submit: 'Soumettre Avis'
      },
      signup: {
        title: 'S\'inscrire',
        name: 'Nom Complet',
        phone: 'Numéro de Téléphone',
        submit: 'S\'inscrire',
        success: 'Inscription réussie!'
      }
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};