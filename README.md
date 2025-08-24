# Cloud Kitchen Website

A modern, responsive Cloud Kitchen website built with React, Tailwind CSS, and Framer Motion.

## Features

- 🌐 **Multilingual Support**: English and French with easy language toggle
- 🍕 **Interactive Menu**: Browse food items with smooth animations
- 🛒 **Shopping Cart**: Add/remove items with real-time updates
- 📱 **WhatsApp Integration**: Orders are automatically forwarded to WhatsApp
- ⭐ **Reviews System**: Customers can leave ratings and comments
- 📱 **Mobile Responsive**: Optimized for all device sizes
- ✨ **Smooth Animations**: Framer Motion powered transitions and effects

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Emoji-based for universal compatibility

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cloud-kitchen
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Configuration

### WhatsApp Integration

To configure WhatsApp order forwarding:

1. Open `src/components/Cart.js`
2. Find the `whatsappNumber` variable in the `CheckoutForm` component
3. Replace `'33758460381'` with your actual WhatsApp number (include country code without + sign)

Example:
```javascript
const whatsappNumber = '33758460381'; // Replace with your WhatsApp number
```

### Menu Items

To customize menu items:

1. Edit `src/data/menuData.js`
2. Add/modify items with the following structure:
```javascript
{
  id: unique_id,
  name: { en: 'English Name', fr: 'French Name' },
  description: { en: 'English Description', fr: 'French Description' },
  price: 12.99,
  image: 'image_url'
}
```

### Translations

To add more languages or modify translations:

1. Edit `src/context/LanguageContext.js`
2. Add new language objects to the `translations` object
3. Update the language toggle logic in the `toggleLanguage` function

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.js       # Navigation with language toggle
│   ├── Hero.js         # Hero section with parallax effects
│   ├── Menu.js         # Menu display with animations
│   ├── Cart.js         # Shopping cart and checkout
│   └── Reviews.js      # Customer reviews system
├── context/            # React contexts
│   ├── LanguageContext.js  # Multilingual support
│   └── CartContext.js      # Shopping cart state
├── data/               # Static data
│   └── menuData.js     # Menu items data
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Features in Detail

### Multilingual Support
- Toggle between English 🇬🇧 and French 🇫🇷
- All text content is translated
- Language preference is maintained during session

### Shopping Cart
- Add items with quantity management
- Real-time price calculations
- Persistent cart state
- Smooth animations for add/remove actions

### WhatsApp Integration
- Automatic order formatting
- Customer details collection
- Direct WhatsApp message with order summary
- Order format:
  ```
  New Order Received!
  Customer: John Doe
  Phone: +1234567890
  Email: johndoe@email.com
  Items: 2x Pizza, 1x Pasta
  Total: $25
  ```

### Reviews System
- 5-star rating system
- Customer comments
- Real-time review addition
- Animated review cards

### Responsive Design
- Mobile-first approach
- Optimized for tablets and desktops
- Touch-friendly interface
- Smooth scrolling navigation

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: '#FF6B35',    // Main brand color
  secondary: '#F7931E',  // Secondary color
  dark: '#2C3E50',       // Dark text
  light: '#ECF0F1'       // Light background
}
```

### Animations
Modify animation settings in individual components using Framer Motion variants.

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.