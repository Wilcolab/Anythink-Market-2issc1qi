// basic_prompt.js
// Convert a string to camelCase.
//
// Rules:
// - Splits on any non-alphanumeric characters (spaces, -, _, ., etc).
// - Lowercases words before joining, capitalizes each subsequent word's first letter.
// - If input has no separators:
//   - If it's ALL UPPERCASE -> lowercases whole string.
//   - If it starts with an uppercase letter -> lowercases only the first letter (PascalCase -> camelCase).
//   - Otherwise returns the string unchanged.
//
// Examples at the bottom.

function camelCase(input) {
    if (typeof input !== 'string') return '';
    const str = input.trim();
    if (!str) return '';

    // If contains separators (non-alphanumeric), perform typical split-and-join algorithm.
    const hasSeparator = /[^0-9A-Za-z]+/u.test(str);
    if (hasSeparator) {
        const parts = str.split(/[^0-9A-Za-z]+/u).filter(Boolean);
        if (parts.length === 0) return '';
        const first = parts[0].toLowerCase();
        const rest = parts.slice(1).map(p => {
            const lower = p.toLowerCase();
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        });
        return first + rest.join('');
    }

    // No separators: handle common cases
    // All uppercase -> lowercase all
    if (/^[A-Z0-9]+$/.test(str)) {
        return str.toLowerCase();
    }

    // PascalCase (starts with uppercase) -> lowercase first character only
    const firstChar = str.charAt(0);
    if (firstChar >= 'A' && firstChar <= 'Z') {
        return firstChar.toLowerCase() + str.slice(1);
    }

    // Already (likely) camelCase or other -> return as-is
    return str;
}

// Examples
console.log(camelCase('hello world'));        // "helloWorld"
console.log(camelCase('  This_is-an.example')); // "thisIsAnExample"
console.log(camelCase('XML HTTP REQUEST'));   // "xmlHttpRequest"
console.log(camelCase('PascalCase'));         // "pascalCase"
console.log(camelCase('alreadyCamelCase'));   // "alreadyCamelCase"
console.log(camelCase('FOOBAR'));             // "foobar"

// Export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = camelCase;
}