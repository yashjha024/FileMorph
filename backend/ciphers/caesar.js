/**
 * Caesar Cipher Implementation
 * Encrypts and decrypts text using the Caesar cipher algorithm
 */

/**
 * Encrypts text using Caesar cipher
 * @param {string} text - The text to encrypt
 * @param {number} shift - The number of positions to shift (0-25)
 * @returns {string} - The encrypted text
 */
function encryptCaesar(text, shift) {
  if (typeof text !== 'string') {
    throw new Error('Text must be a string');
  }
  
  if (typeof shift !== 'number' || shift < 0) {
    throw new Error('Shift must be a non-negative number');
  }
  
  // Normalize shift to 0-25 range
  shift = shift % 26;
  
  return text
    .split('')
    .map(char => {
      if (char >= 'a' && char <= 'z') {
        // Lowercase letters
        return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
      } else if (char >= 'A' && char <= 'Z') {
        // Uppercase letters
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      }
      // Non-alphabetic characters remain unchanged
      return char;
    })
    .join('');
}

/**
 * Decrypts text using Caesar cipher
 * @param {string} text - The text to decrypt
 * @param {number} shift - The number of positions to shift back (0-25)
 * @returns {string} - The decrypted text
 */
function decryptCaesar(text, shift) {
  if (typeof text !== 'string') {
    throw new Error('Text must be a string');
  }
  
  if (typeof shift !== 'number' || shift < 0) {
    throw new Error('Shift must be a non-negative number');
  }
  
  // Normalize shift to 0-25 range
  shift = shift % 26;
  
  return text
    .split('')
    .map(char => {
      if (char >= 'a' && char <= 'z') {
        // Lowercase letters
        return String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
      } else if (char >= 'A' && char <= 'Z') {
        // Uppercase letters
        return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
      }
      // Non-alphabetic characters remain unchanged
      return char;
    })
    .join('');
}

module.exports = {
  encryptCaesar,
  decryptCaesar
};
