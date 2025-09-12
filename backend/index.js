// FileMorph Backend - Main Entry Point
const express = require('express');
const cors = require('cors');

// Import cipher modules
const caesarCipher = require('./ciphers/caesar');
const polybiusCipher = require('./ciphers/polybius');
const railFenceCipher = require('./ciphers/railFence');
const transpositionCipher = require('./ciphers/transposition');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Available cipher types
const CIPHER_MODULES = {
  caesar: caesarCipher,
  polybius: polybiusCipher,
  railfence: railFenceCipher,
  transposition: transpositionCipher
};

// Input validation middleware
const validateCipherInput = (req, res, next) => {
  const { cipherType, text, key } = req.body;
  
  // Check required fields
  if (!cipherType || !text) {
    return res.status(400).json({
      error: 'Missing required fields: cipherType and text are required'
    });
  }
  
  // Check if cipher type is supported
  if (!CIPHER_MODULES[cipherType.toLowerCase()]) {
    return res.status(400).json({
      error: `Unsupported cipher type: ${cipherType}. Supported types: ${Object.keys(CIPHER_MODULES).join(', ')}`
    });
  }
  
  // Check if text is a string
  if (typeof text !== 'string') {
    return res.status(400).json({
      error: 'Text must be a string'
    });
  }
  
  // Check if key is provided when required
  const cipherModule = CIPHER_MODULES[cipherType.toLowerCase()];
  const requiresKey = ['caesar', 'transposition'].includes(cipherType.toLowerCase());
  
  if (requiresKey && !key) {
    return res.status(400).json({
      error: `Cipher type '${cipherType}' requires a key parameter`
    });
  }
  
  next();
};

// POST /encrypt route
app.post('/encrypt', validateCipherInput, (req, res) => {
  try {
    const { cipherType, text, key } = req.body;
    const cipherModule = CIPHER_MODULES[cipherType.toLowerCase()];
    
    let result;
    if (key !== undefined) {
      result = cipherModule.encrypt(text, key);
    } else {
      result = cipherModule.encrypt(text);
    }
    
    res.json({
      success: true,
      cipherType: cipherType.toLowerCase(),
      originalText: text,
      encryptedText: result,
      key: key || null
    });
  } catch (error) {
    res.status(500).json({
      error: 'Encryption failed',
      message: error.message
    });
  }
});

// POST /decrypt route
app.post('/decrypt', validateCipherInput, (req, res) => {
  try {
    const { cipherType, text, key } = req.body;
    const cipherModule = CIPHER_MODULES[cipherType.toLowerCase()];
    
    let result;
    if (key !== undefined) {
      result = cipherModule.decrypt(text, key);
    } else {
      result = cipherModule.decrypt(text);
    }
    
    res.json({
      success: true,
      cipherType: cipherType.toLowerCase(),
      encryptedText: text,
      decryptedText: result,
      key: key || null
    });
  } catch (error) {
    res.status(500).json({
      error: 'Decryption failed',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'FileMorph Backend Server is running',
    supportedCiphers: Object.keys(CIPHER_MODULES)
  });
});

// Get supported cipher types
app.get('/ciphers', (req, res) => {
  res.json({
    supportedCiphers: Object.keys(CIPHER_MODULES),
    descriptions: {
      caesar: 'Caesar cipher with customizable shift value',
      polybius: 'Polybius square cipher',
      railfence: 'Rail fence cipher with customizable rail count',
      transposition: 'Columnar transposition cipher'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
  });
});

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The route ${req.method} ${req.path} does not exist`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`FileMorph Backend Server Started on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET  /health - Health check`);
  console.log(`  GET  /ciphers - Get supported cipher types`);
  console.log(`  POST /encrypt - Encrypt text`);
  console.log(`  POST /decrypt - Decrypt text`);
  console.log(`Supported ciphers: ${Object.keys(CIPHER_MODULES).join(', ')}`);
});

module.exports = app;
