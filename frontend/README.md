# FileMorph Frontend

A modern React application for cipher encryption and decryption operations. This frontend provides an intuitive user interface for various cryptographic operations including Caesar cipher, Polybius square, Rail Fence cipher, and Transposition cipher.

## Features

- **Modern React Interface**: Built with React for responsive and interactive user experience
- **Multiple Cipher Support**: 
  - Caesar Cipher encryption/decryption
  - Polybius Square cipher operations
  - Rail Fence cipher with customizable rails
  - Transposition cipher with key-based permutation
- **Interactive UI Components**: Smooth animations powered by Framer Motion
- **Real-time Validation**: Key validation and error handling for different cipher types
- **Responsive Design**: Mobile-friendly interface that works across devices
- **Error Feedback**: User-friendly error messages and alerts

## Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template with React root div
├── src/
│   ├── components/         # Reusable React components
│   ├── App.js              # Main application component
│   ├── App.css             # Application styles
│   ├── index.js            # React DOM rendering entry point
│   ├── index.css           # Global styles
│   └── reportWebVitals.js  # Performance monitoring
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Setup and Installation

### Prerequisites
- Node.js (version 14.0 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/yashjha024/FileMorph.git
   cd FileMorph/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Build for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build/` directory.

## HTML Template

The `public/index.html` file serves as the HTML template for the React application. It includes:

- **SEO Meta Tags**: Description, viewport, and theme color for better search engine optimization
- **React Root Element**: A `<div id="root"></div>` where the React application mounts
- **Progressive Web App Support**: Links to manifest.json and app icons
- **Responsive Design**: Viewport meta tag for mobile compatibility
- **Accessibility**: Proper HTML5 structure and noscript fallback

### Key Features of the HTML Template:
- Responsive viewport configuration
- SEO-friendly meta description
- PWA manifest and icon references
- Fallback message for users with JavaScript disabled
- Clean, semantic HTML5 structure

## Usage

1. **Select Cipher Type**: Choose from available cipher algorithms
2. **Enter Text**: Input the text you want to encrypt or decrypt
3. **Provide Key**: Enter the required key/parameters for the selected cipher
4. **Process**: Click encrypt or decrypt to see the results
5. **View Results**: The processed text will be displayed with any relevant feedback

## Development

### Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App (irreversible)

### Code Structure

- **Components**: Modular React components in `/src/components/`
- **Styling**: CSS modules and styled components
- **State Management**: React hooks for local state management
- **API Integration**: Axios for backend communication

## Technologies Used

- **React**: Frontend framework
- **Framer Motion**: Animation library
- **CSS3**: Styling and responsive design
- **HTML5**: Semantic markup
- **JavaScript ES6+**: Modern JavaScript features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the FileMorph cipher application suite.
