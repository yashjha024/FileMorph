/**
 * Rail Fence Cipher Implementation
 * The Rail Fence cipher is a form of transposition cipher that arranges
 * the plaintext in a zigzag pattern across multiple "rails" (rows).
 */

/**
 * Encrypts text using the Rail Fence cipher
 * @param {string} text - The text to encrypt
 * @param {number} rails - Number of rails (rows) to use
 * @returns {string} - The encrypted text
 */
function encryptRailFence(text, rails) {
    if (rails <= 1 || rails >= text.length) {
        return text;
    }
    
    // Create rails array
    const fence = Array(rails).fill().map(() => []);
    
    let rail = 0;
    let direction = 1; // 1 for down, -1 for up
    
    // Place characters in zigzag pattern
    for (let i = 0; i < text.length; i++) {
        fence[rail].push(text[i]);
        
        // Change direction at top and bottom rails
        if (rail === 0) {
            direction = 1;
        } else if (rail === rails - 1) {
            direction = -1;
        }
        
        rail += direction;
    }
    
    // Read rails to get encrypted text
    return fence.map(rail => rail.join('')).join('');
}

/**
 * Decrypts text using the Rail Fence cipher
 * @param {string} ciphertext - The encrypted text to decrypt
 * @param {number} rails - Number of rails used for encryption
 * @returns {string} - The decrypted text
 */
function decryptRailFence(ciphertext, rails) {
    if (rails <= 1 || rails >= ciphertext.length) {
        return ciphertext;
    }
    
    // Create fence structure to determine positions
    const fence = Array(rails).fill().map(() => Array(ciphertext.length).fill(''));
    
    let rail = 0;
    let direction = 1;
    
    // Mark positions in the fence
    for (let i = 0; i < ciphertext.length; i++) {
        fence[rail][i] = '*';
        
        if (rail === 0) {
            direction = 1;
        } else if (rail === rails - 1) {
            direction = -1;
        }
        
        rail += direction;
    }
    
    // Fill the fence with ciphertext characters
    let index = 0;
    for (let r = 0; r < rails; r++) {
        for (let c = 0; c < ciphertext.length; c++) {
            if (fence[r][c] === '*') {
                fence[r][c] = ciphertext[index++];
            }
        }
    }
    
    // Read the fence in zigzag pattern to get plaintext
    let result = '';
    rail = 0;
    direction = 1;
    
    for (let i = 0; i < ciphertext.length; i++) {
        result += fence[rail][i];
        
        if (rail === 0) {
            direction = 1;
        } else if (rail === rails - 1) {
            direction = -1;
        }
        
        rail += direction;
    }
    
    return result;
}

module.exports = {
    encryptRailFence,
    decryptRailFence
};
