/**
 * Polybius Square Cipher Implementation
 * The Polybius cipher uses a 5x5 grid to encode letters into pairs of numbers.
 * Letters I and J share the same position (2,4) in the traditional implementation.
 */

/**
 * Creates a standard Polybius square (5x5 grid)
 * @returns {Object} - Object with char-to-coordinates and coordinates-to-char mappings
 */
function createPolybiusSquare() {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // Note: J is omitted, I/J share position
    const charToCoords = {};
    const coordsToChar = {};
    
    let index = 0;
    for (let row = 1; row <= 5; row++) {
        for (let col = 1; col <= 5; col++) {
            const char = alphabet[index];
            const coords = `${row}${col}`;
            
            charToCoords[char] = coords;
            coordsToChar[coords] = char;
            
            // Handle I/J sharing the same position
            if (char === 'I') {
                charToCoords['J'] = coords;
            }
            
            index++;
        }
    }
    
    return { charToCoords, coordsToChar };
}

/**
 * Encrypts text using the Polybius cipher
 * @param {string} text - The text to encrypt
 * @returns {string} - The encrypted text as pairs of numbers
 */
function encryptPolybius(text) {
    if (!text) return '';
    
    const { charToCoords } = createPolybiusSquare();
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toUpperCase();
        
        if (charToCoords[char]) {
            result += charToCoords[char];
            if (i < text.length - 1) {
                result += ' '; // Space between coordinate pairs
            }
        } else if (char === ' ') {
            result += '/ '; // Forward slash for spaces
        } else {
            // Non-alphabetic characters are preserved
            result += char;
            if (i < text.length - 1) {
                result += ' ';
            }
        }
    }
    
    return result.trim();
}

/**
 * Decrypts text using the Polybius cipher
 * @param {string} ciphertext - The encrypted text (pairs of numbers)
 * @returns {string} - The decrypted text
 */
function decryptPolybius(ciphertext) {
    if (!ciphertext) return '';
    
    const { coordsToChar } = createPolybiusSquare();
    const tokens = ciphertext.split(' ');
    let result = '';
    
    for (const token of tokens) {
        if (token === '/') {
            result += ' '; // Forward slash represents space
        } else if (token.length === 2 && /^\d{2}$/.test(token)) {
            // Valid coordinate pair
            const char = coordsToChar[token];
            if (char) {
                result += char;
            } else {
                result += token; // Invalid coordinates, keep as is
            }
        } else {
            // Non-coordinate tokens (punctuation, etc.)
            result += token;
        }
    }
    
    return result;
}

module.exports = {
    encryptPolybius,
    decryptPolybius,
    createPolybiusSquare
};
