import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResultDisplay = ({ result, isVisible = false }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  const contentVariants = {
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
      backgroundColor: '#3b82f6',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  };

  if (!result) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="result-display-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          layout
        >
          <motion.div 
            className="result-header"
            variants={contentVariants}
          >
            <motion.h3 
              className="result-title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              🎉 Operation Result
            </motion.h3>
            
            <motion.div 
              className="result-stats"
              variants={contentVariants}
            >
              <span className="stat-item">
                <strong>Algorithm:</strong> {result.algorithm}
              </span>
              <span className="stat-item">
                <strong>Operation:</strong> {result.operation}
              </span>
              <span className="stat-item">
                <strong>Length:</strong> {result.output?.length || 0} chars
              </span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="result-content"
            variants={contentVariants}
          >
            <motion.div className="input-section">
              <label className="result-label">Original Text:</label>
              <motion.div 
                className="text-display input-text"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {result.input}
              </motion.div>
            </motion.div>

            <motion.div 
              className="arrow-container"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
            >
              <span className="transform-arrow">→</span>
            </motion.div>

            <motion.div className="output-section">
              <label className="result-label">Processed Text:</label>
              <motion.div 
                className="text-display output-text"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {result.output}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="result-actions"
            variants={contentVariants}
          >
            <motion.button
              className="copy-button"
              onClick={() => copyToClipboard(result.output)}
              variants={copied ? pulseVariants : buttonVariants}
              whileHover="hover"
              whileTap="tap"
              animate={copied ? "pulse" : ""}
            >
              <motion.span
                initial={false}
                animate={{ rotate: copied ? 360 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {copied ? '✓' : '📋'}
              </motion.span>
              {copied ? 'Copied!' : 'Copy Result'}
            </motion.button>

            <motion.button
              className="download-button"
              onClick={() => {
                const element = document.createElement('a');
                const file = new Blob([result.output], { type: 'text/plain' });
                element.href = URL.createObjectURL(file);
                element.download = `filemorph-${result.operation}-${Date.now()}.txt`;
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span>💾</span>
              Download
            </motion.button>
          </motion.div>

          {result.metadata && (
            <motion.div 
              className="result-metadata"
              variants={contentVariants}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.6 }}
            >
              <details className="metadata-details">
                <summary>Additional Information</summary>
                <div className="metadata-content">
                  {Object.entries(result.metadata).map(([key, value]) => (
                    <motion.div 
                      key={key}
                      className="metadata-item"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <strong>{key}:</strong> {value}
                    </motion.div>
                  ))}
                </div>
              </details>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultDisplay;
