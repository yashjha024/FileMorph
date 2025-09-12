import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CipherForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    text: '',
    operation: 'encrypt',
    algorithm: 'caesar',
    key: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.text.trim() && formData.key.trim()) {
      onSubmit(formData);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="cipher-form-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="form-title"
        variants={itemVariants}
      >
        FileMorph Cipher Tool
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="cipher-form"
        variants={itemVariants}
      >
        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="text" className="form-label">
            Input Text
          </label>
          <motion.textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            placeholder="Enter text to encrypt or decrypt..."
            className="form-textarea"
            rows={4}
            required
            whileFocus={{ scale: 1.02, borderColor: '#4f46e5' }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        <motion.div className="form-row" variants={itemVariants}>
          <div className="form-group">
            <label htmlFor="operation" className="form-label">
              Operation
            </label>
            <motion.select
              id="operation"
              name="operation"
              value={formData.operation}
              onChange={handleInputChange}
              className="form-select"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="encrypt">Encrypt</option>
              <option value="decrypt">Decrypt</option>
            </motion.select>
          </div>

          <div className="form-group">
            <label htmlFor="algorithm" className="form-label">
              Algorithm
            </label>
            <motion.select
              id="algorithm"
              name="algorithm"
              value={formData.algorithm}
              onChange={handleInputChange}
              className="form-select"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="caesar">Caesar Cipher</option>
              <option value="vigenere">Vigenère Cipher</option>
              <option value="base64">Base64</option>
            </motion.select>
          </div>
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="key" className="form-label">
            Key/Shift Value
          </label>
          <motion.input
            id="key"
            name="key"
            type="text"
            value={formData.key}
            onChange={handleInputChange}
            placeholder="Enter key or shift value..."
            className="form-input"
            required
            whileFocus={{ scale: 1.02, borderColor: '#4f46e5' }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        <motion.button
          type="submit"
          className="submit-button"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          disabled={isLoading || !formData.text.trim() || !formData.key.trim()}
        >
          <motion.span
            animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
          >
            {isLoading ? '⟳' : '🔐'}
          </motion.span>
          {isLoading ? 'Processing...' : `${formData.operation.charAt(0).toUpperCase() + formData.operation.slice(1)} Text`}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default CipherForm;
