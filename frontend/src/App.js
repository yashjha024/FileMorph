import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CipherForm from './components/CipherForm';
import ResultDisplay from './components/ResultDisplay';
import ErrorAlert from './components/ErrorAlert';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [cipherType, setCipherType] = useState('caesar');
  const [cipherKey, setCipherKey] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastOperation, setLastOperation] = useState('');

  // API base URL - adjust based on your backend
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleCipherOperation = async (operation) => {
    if (!inputText.trim()) {
      setError('Please enter some text to process');
      return;
    }
    
    // Fix: Only caesar and transposition require keys, not polybius
    if (!cipherKey.trim() && ['caesar', 'transposition'].includes(cipherType)) {
      setError('Please enter a key for this cipher type');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult('');
    setLastOperation(operation);

    try {
      const endpoint = operation === 'encrypt' ? '/encrypt' : '/decrypt';
      const payload = {
        text: inputText,
        cipher_type: cipherType,
        ...(cipherKey.trim() && { key: cipherKey })
      };

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data.result || data.text || 'Operation completed successfully');
    } catch (err) {
      console.error('API Error:', err);
      setError(`Failed to ${operation}: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearError = () => {
    setError('');
  };

  const handleClearAll = () => {
    setInputText('');
    setCipherKey('');
    setResult('');
    setError('');
    setLastOperation('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            FileMorph Cipher
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Secure text encryption and decryption with modern cryptographic algorithms
          </motion.p>
        </motion.header>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <ErrorAlert
              message={error}
              onClose={handleClearError}
            />
          )}
        </AnimatePresence>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <CipherForm
              inputText={inputText}
              setInputText={setInputText}
              cipherType={cipherType}
              setCipherType={setCipherType}
              cipherKey={cipherKey}
              setCipherKey={setCipherKey}
              onEncrypt={() => handleCipherOperation('encrypt')}
              onDecrypt={() => handleCipherOperation('decrypt')}
              onClear={handleClearAll}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Right Column - Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <ResultDisplay
              result={result}
              isLoading={isLoading}
              operation={lastOperation}
              cipherType={cipherType}
            />
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {[
            {
              name: 'Caesar Cipher',
              description: 'Classic substitution cipher with shift key',
              icon: '🔐'
            },
            {
              name: 'Polybius Cipher',
              description: 'Grid-based substitution cipher system',
              icon: '📊'
            },
            {
              name: 'Rail Fence',
              description: 'Transposition cipher using zigzag pattern',
              icon: '🚂'
            },
            {
              name: 'Transposition',
              description: 'Rearrange characters based on key pattern',
              icon: '🔄'
            }
          ].map((cipher, index) => (
            <motion.div
              key={cipher.name}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-3xl mb-3">{cipher.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{cipher.name}</h3>
              <p className="text-sm text-gray-600">{cipher.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-center mt-16 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <p className="text-gray-500">
            Built with React, Framer Motion & modern web technologies
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
