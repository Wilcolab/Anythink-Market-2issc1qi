/**
 * Converts strings to camelCase format
 * Handles spaces, underscores, hyphens, and mixed case
 * 
 * Examples:
 * - "first name" → "firstName"
 * - "user_id" → "userId"
 * - "SCREEN_NAME" → "screenName"
 * - "mobile-number" → "mobileNumber"
 * 
 * @param {string} str - The string to convert
 * @returns {string} The camelCase version of the string
 */
function toCamelCase(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    
    return str
        // Split on spaces, underscores, or hyphens
        .split(/[\s_-]+/)
        // Filter out empty strings
        .filter(word => word.length > 0)
        // Convert each word
        .map((word, index) => {
            // Convert to lowercase first
            word = word.toLowerCase();
            
            // Capitalize first letter of all words except the first one
            if (index > 0) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            
            return word;
        })
        .join('');
}

/**
 * Adds two numbers and returns their sum
 * Includes strict error handling for non-numeric inputs
 * 
 * Examples:
 * - addNumbers(5, 3) → 8
 * - addNumbers(-2, 7) → 5
 * - addNumbers(0, 0) → 0
 * - addNumbers('5', 3) → throws Error
 * - addNumbers(null, 5) → throws Error
 * 
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @returns {number} The sum of a and b
 * @throws {Error} If either input is not a valid number
 */
function addNumbers(a, b) {
    // Check if inputs are null or undefined
    if (a === null || a === undefined) {
        throw new Error(`First parameter is ${a === null ? 'null' : 'undefined'}. Both parameters must be valid numbers.`);
    }
    
    if (b === null || b === undefined) {
        throw new Error(`Second parameter is ${b === null ? 'null' : 'undefined'}. Both parameters must be valid numbers.`);
    }
    
    // Check if inputs are numbers (not strings, objects, etc.)
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error(`Invalid input types: expected numbers, got ${typeof a} and ${typeof b}. Both parameters must be valid numbers.`);
    }
    
    // Check for NaN values
    if (isNaN(a) || isNaN(b)) {
        throw new Error('One or both parameters are NaN. Both parameters must be valid numbers.');
    }
    
    // Check for Infinity values
    if (!isFinite(a) || !isFinite(b)) {
        throw new Error('One or both parameters are Infinity. Both parameters must be finite numbers.');
    }
    
    return a + b;
}

// Export the functions
module.exports = {
    toCamelCase,
    addNumbers
};