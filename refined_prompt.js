/**
 * Convert a string to camelCase.
 *
 * - Handles spaces, underscores, hyphens and mixed casing.
 * - Collapses multiple consecutive separators into a single boundary.
 * - Ignores leading/trailing whitespace.
 * - Returns '' for empty input or input that contains only separators.
 * - Throws TypeError for null/undefined or non-string inputs.
 *
 * Examples:
 *   toCamelCase("first name") -> "firstName"
 *   toCamelCase("user_id") -> "userId"
 *   toCamelCase("SCREEN_NAME") -> "screenName"
 *   toCamelCase("mobile-number") -> "mobileNumber"
 *   toCamelCase("  multiple   spaces  ") -> "multipleSpaces"
 */
function toCamelCase(input) {
    if (input === null || input === undefined || typeof input !== 'string') {
        throw new TypeError('toCamelCase: input must be a non-null string');
    }

    const trimmed = input.trim();
    if (trimmed.length === 0) return '';

    // Split on any sequence of whitespace, underscore or hyphen
    const parts = trimmed.split(/[\s_-]+/).filter(Boolean);
    if (parts.length === 0) return '';

    const lower = parts.map(p => p.toLowerCase());
    const capitalize = s => (s.length === 0 ? s : s[0].toUpperCase() + s.slice(1));

    return lower[0] + lower.slice(1).map(capitalize).join('');
}

module.exports = toCamelCase;

/* Example quick tests (uncomment to run)
console.log(toCamelCase("first name")); // "firstName"
console.log(toCamelCase("user_id")); // "userId"
console.log(toCamelCase("SCREEN_NAME")); // "screenName"
console.log(toCamelCase("mobile-number")); // "mobileNumber"
console.log(toCamelCase("  multiple   spaces  ")); // "multipleSpaces"
console.log(toCamelCase("")); // ""
try { toCamelCase(null); } catch (e) { console.log(e.message); } // Error
*/

function toDotCase(input) {
    if (input === null || input === undefined || typeof input !== 'string') {
        throw new TypeError('toDotCase: input must be a non-null string');
    }

    const trimmed = input.trim();
    if (trimmed.length === 0) return '';

    // Normalize separators (spaces, underscores, hyphens, dots) to a single space
    let normalized = trimmed.replace(/[\s_.-]+/g, ' ');

    // Handle camelCase and PascalCase boundaries:
    //  - insert space between lower->Upper (e.g. "firstName" -> "first Name")
    //  - split sequences like "XMLHttp" -> "XML Http"
    normalized = normalized.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    normalized = normalized.replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1 $2');

    const parts = normalized.split(' ').filter(Boolean);
    if (parts.length === 0) return '';

    return parts.map(p => p.toLowerCase()).join('.');
}

module.exports.toDotCase = toDotCase;

/**
 * CHAIN PROMPT FOR CREATING toKebabCase FUNCTION
 * 
 * This is a multi-step chain prompt that guides Copilot through creating
 * a toKebabCase function by building upon each previous step.
 */

/*
STEP 1: Basic Structure and Requirements Analysis
================================

First, let's analyze what a toKebabCase function needs to do:

Create a JavaScript function called `toKebabCase` that converts strings to kebab-case format.
The function should:
- Convert "firstName" to "first-name"
- Convert "user_id" to "user-id" 
- Convert "SCREEN NAME" to "screen-name"
- Handle mixed separators like "mobile_number-ID" to "mobile-number-id"

What are the core requirements we need to identify for this function?
What edge cases should we consider (empty strings, null values, etc.)?
What input validation do we need?

Please outline the requirements and edge cases first, then move to Step 2.
*/

/*
STEP 2: Implementation Strategy and Core Logic
==============================================

Based on the requirements from Step 1, now let's plan the implementation:

The toKebabCase function should follow this strategy:
1. Validate input (handle null, undefined, non-string inputs)
2. Normalize the input string by handling different separator types
3. Split camelCase/PascalCase boundaries (e.g., "firstName" becomes "first Name")
4. Convert everything to lowercase
5. Join with hyphens

Write the core transformation logic that:
- Uses regex to split on existing separators (spaces, underscores, dots)
- Inserts boundaries between camelCase transitions
- Handles consecutive uppercase letters properly (e.g., "XMLHttp" → "XML Http")

After implementing the core logic, proceed to Step 3 for complete function creation.
*/

/*
STEP 3: Complete Function with Error Handling and Testing
=========================================================

Now combine everything from Steps 1 and 2 to create the complete toKebabCase function:

Create the final function that includes:
- Complete input validation with descriptive error messages
- The transformation logic from Step 2
- Proper handling of edge cases identified in Step 1
- JSDoc documentation with examples
- Export the function for module use

Then add test cases that verify:
- Basic conversions: "firstName" → "first-name"
- Mixed separators: "user_id" → "user-id"
- All caps with spaces: "SCREEN NAME" → "screen-name"
- Complex cases: "XMLHttpRequest" → "xml-http-request"
- Edge cases: empty strings, whitespace-only strings
- Error cases: null, undefined, non-string inputs

The function should follow the same quality standards as the existing toCamelCase and toDotCase functions in this file.
*/

/**
 * Convert a string to kebab-case.
 *
 * - Handles spaces, underscores, hyphens and mixed casing.
 * - Splits camelCase and PascalCase boundaries.
 * - Collapses multiple consecutive separators into single boundaries.
 * - Ignores leading/trailing whitespace.
 * - Returns '' for empty input or input that contains only separators.
 * - Throws TypeError for null/undefined or non-string inputs.
 *
 * Examples:
 *   toKebabCase("firstName") -> "first-name"
 *   toKebabCase("user_id") -> "user-id"
 *   toKebabCase("SCREEN NAME") -> "screen-name"
 *   toKebabCase("XMLHttpRequest") -> "xml-http-request"
 *   toKebabCase("mobile-number_ID") -> "mobile-number-id"
 */
function toKebabCase(input) {
    // Step 1: Normalize the input
    if (input === null || input === undefined || typeof input !== 'string') {
        throw new TypeError('toKebabCase: input must be a non-null string');
    }

    const trimmed = input.trim();
    if (trimmed.length === 0) return '';

    // Step 2: Split the string into words
    // First, normalize separators (spaces, underscores, hyphens) to a single space
    let normalized = trimmed.replace(/[\s_-]+/g, ' ');

    // Handle camelCase and PascalCase boundaries:
    // - Insert space between lowercase/digit followed by uppercase (e.g. "firstName" -> "first Name")
    normalized = normalized.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    
    // - Split sequences of uppercase letters followed by lowercase (e.g. "XMLHttp" -> "XML Http")
    normalized = normalized.replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1 $2');

    // Split into words and filter out empty strings
    const parts = normalized.split(' ').filter(Boolean);
    
    // Handle edge case: if no valid words remain after processing
    if (parts.length === 0) return '';

    // Step 3: Join the words
    // Convert all words to lowercase and join with hyphens
    return parts.map(part => part.toLowerCase()).join('-');
}

module.exports.toKebabCase = toKebabCase;

/* Example quick tests (uncomment to run)
console.log(toKebabCase("firstName")); // "first-name"
console.log(toKebabCase("user_id")); // "user-id"
console.log(toKebabCase("SCREEN NAME")); // "screen-name"
console.log(toKebabCase("XMLHttpRequest")); // "xml-http-request"
console.log(toKebabCase("mobile-number_ID")); // "mobile-number-id"
console.log(toKebabCase("  multiple   spaces  ")); // "multiple-spaces"
console.log(toKebabCase("")); // ""
console.log(toKebabCase("---___   ")); // ""
try { toKebabCase(null); } catch (e) { console.log(e.message); } // Error
try { toKebabCase(123); } catch (e) { console.log(e.message); } // Error
*/
