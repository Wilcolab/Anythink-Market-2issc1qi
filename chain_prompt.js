function toKebabCase(input) {
    // Step 1: Normalize the input
    if (input === null || input === undefined) {
        throw new Error('Input cannot be null or undefined');
    }
    
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    
    const trimmed = input.trim();
    
    if (trimmed === '') {
        throw new Error('Input cannot be empty or contain only whitespace');
    }
    
    // Step 2: Split the string into words
    // First, handle camelCase by inserting spaces before uppercase letters
    const withSpaces = trimmed.replace(/([a-z])([A-Z])/g, '$1 $2');
    
    // Replace spaces, underscores, and hyphens with a single space
    const normalized = withSpaces.replace(/[\s_-]+/g, ' ');
    
    // Split into words and filter out empty strings
    const words = normalized.split(' ').filter(word => word.length > 0);
    
    if (words.length === 0) {
        throw new Error('Input contains only separators');
    }
    
    // Step 3: Join the words
    return words.map(word => word.toLowerCase()).join('-');
}

// Examples:
// toKebabCase('firstName') → 'first-name'
// toKebabCase('user_id') → 'user-id'
// toKebabCase('SCREEN NAME') → 'screen-name'
// toKebabCase('mobile-number') → 'mobile-number'