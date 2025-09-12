import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ErrorAlert = ({ 
  error, 
  isVisible = false, 
  onClose, 
  autoClose = true, 
  duration = 5000,
  type = 'error' 
}) => {
  useEffect(() => {
    if (isVisible && autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, onClose, duration]);

  const getAlertStyles = () => {
    switch (type) {
      case 'warning':
        return {
          backgroundColor: '#fef3c7',
          borderColor: '#f59e0b',
          textColor: '#92400e',
          icon: '⚠️'
        };
      case 'success':
        return {
          backgroundColor: '#d1fae5',
          borderColor: '#10b981',
          textColor: '#065f46',
          icon: '✓️'
        };
      case 'info':
        return {
          backgroundColor: '#dbeafe',
          borderColor: '#3b82f6',
          textColor: '#1e40af',
          icon: 'ℹ️'
        };
      default: // error
        return {
          backgroundColor: '#fee2e2',
          borderColor: '#ef4444',
          textColor: '#991b1b',
          icon: '⛔'
        };
    }
  };

  const alertStyles = getAlertStyles();

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 600,
        damping: 20
      }
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.6,
        repeat: 1
      }
    }
  };

  const closeButtonVariants = {
    hover: {
      scale: 1.1,
      rotate: 90,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 }
  };

  const progressBarVariants = {
    hidden: { width: '100%' },
    visible: {
      width: '0%',
      transition: {
        duration: duration / 1000,
        ease: 'linear'
      }
    }
  };

  if (!error) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="error-alert-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="error-alert-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: alertStyles.backgroundColor,
              borderColor: alertStyles.borderColor
            }}
            layout
          >
            <div className="alert-content">
              <motion.div 
                className="alert-icon"
                variants={iconVariants}
                initial="hidden"
                animate={['visible', 'pulse']}
                style={{ color: alertStyles.textColor }}
              >
                {alertStyles.icon}
              </motion.div>

              <motion.div 
                className="alert-text-content"
                variants={contentVariants}
                style={{ color: alertStyles.textColor }}
              >
                <motion.h4 
                  className="alert-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {type === 'error' ? 'Error Occurred' : 
                   type === 'warning' ? 'Warning' :
                   type === 'success' ? 'Success' : 'Information'}
                </motion.h4>
                
                <motion.p 
                  className="alert-message"
                  variants={contentVariants}
                >
                  {typeof error === 'string' ? error : error.message || 'An unexpected error occurred'}
                </motion.p>

                {error.details && (
                  <motion.details 
                    className="error-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.4 }}
                  >
                    <summary>Technical Details</summary>
                    <motion.pre 
                      className="error-details-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {JSON.stringify(error.details, null, 2)}
                    </motion.pre>
                  </motion.details>
                )}
              </motion.div>

              {onClose && (
                <motion.button
                  className="alert-close-button"
                  onClick={onClose}
                  variants={closeButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label="Close alert"
                  style={{ color: alertStyles.textColor }}
                >
                  ×
                </motion.button>
              )}
            </div>

            {autoClose && (
              <motion.div 
                className="alert-progress-bar"
                variants={progressBarVariants}
                initial="hidden"
                animate="visible"
                style={{ backgroundColor: alertStyles.borderColor }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Additional utility component for toast-style notifications
export const ErrorToast = ({ errors = [], onDismiss }) => {
  return (
    <div className="error-toast-container">
      <AnimatePresence>
        {errors.map((error, index) => (
          <ErrorAlert
            key={error.id || index}
            error={error}
            isVisible={true}
            onClose={() => onDismiss && onDismiss(index)}
            autoClose={true}
            duration={4000}
            type={error.type || 'error'}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ErrorAlert;
