/**
 * Columnar Transposition Cipher Implementation
 * The Columnar Transposition cipher is a form of transposition cipher
 * that arranges the plaintext in a grid and then reads off the columns
 * in a specific order determined by a keyword.
 */

/**
 * Encrypts text using the Columnar Transposition cipher
 * @param {string} plaintext - The text to encrypt
 * @param {string} key - The keyword to determine column order
 * @returns {string} The encrypted text
 */
function encryptColumnar(plaintext, key) {
  if (!plaintext || !key) {
    throw new Error('Both plaintext and key are required');
  }

  // Remove spaces and convert to uppercase for consistency
  const cleanText = plaintext.replace(/\s/g, '').toUpperCase();
  const cleanKey = key.toUpperCase();
  
  const keyLength = cleanKey.length;
  const numRows = Math.ceil(cleanText.length / keyLength);
  
  // Create the grid
  const grid = [];
  let textIndex = 0;
  
  for (let row = 0; row < numRows; row++) {
    grid[row] = [];
    for (let col = 0; col < keyLength; col++) {
      if (textIndex < cleanText.length) {
        grid[row][col] = cleanText[textIndex];
        textIndex++;
      } else {
        grid[row][col] = 'X'; // Padding character
      }
    }
  }
  
  // Create column order based on alphabetical order of key characters
  const keyOrder = Array.from({ length: keyLength }, (_, i) => i)
    .sort((a, b) => cleanKey[a].localeCompare(cleanKey[b]));
  
  // Read columns in the determined order
  let ciphertext = '';
  for (const colIndex of keyOrder) {
    for (let row = 0; row < numRows; row++) {
      ciphertext += grid[row][colIndex];
    }
  }
  
  return ciphertext;
}

/**
 * Decrypts text using the Columnar Transposition cipher
 * @param {string} ciphertext - The text to decrypt
 * @param {string} key - The keyword used for encryption
 * @returns {string} The decrypted text
 */
function decryptColumnar(ciphertext, key) {
  if (!ciphertext || !key) {
    throw new Error('Both ciphertext and key are required');
  }

  const cleanCipher = ciphertext.replace(/\s/g, '').toUpperCase();
  const cleanKey = key.toUpperCase();
  
  const keyLength = cleanKey.length;
  const numRows = Math.ceil(cleanCipher.length / keyLength);
  
  // Create column order based on alphabetical order of key characters
  const keyOrder = Array.from({ length: keyLength }, (_, i) => i)
    .sort((a, b) => cleanKey[a].localeCompare(cleanKey[b]));
  
  // Create reverse mapping to know original positions
  const reverseOrder = new Array(keyLength);
  for (let i = 0; i < keyLength; i++) {
    reverseOrder[keyOrder[i]] = i;
  }
  
  // Fill the grid column by column in the key order
  const grid = Array.from({ length: numRows }, () => new Array(keyLength));
  let cipherIndex = 0;
  
  for (const colIndex of keyOrder) {
    for (let row = 0; row < numRows; row++) {
      if (cipherIndex < cleanCipher.length) {
        grid[row][colIndex] = cleanCipher[cipherIndex];
        cipherIndex++;
      }
    }
  }
  
  // Read the grid row by row to get the original text
  let plaintext = '';
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < keyLength; col++) {
      if (grid[row][col] && grid[row][col] !== 'X') {
        plaintext += grid[row][col];
      }
    }
  }
  
  return plaintext;
}

// Export the functions for use in other modules
module.exports = {
  encryptColumnar,
  decryptColumnar
};
