/**
 * Calculator module - Handles basic arithmetic operations
 */

// Add two numbers
function add(a, b) {
    return a + b;
}

// Subtract two numbers
function subtract(a, b) {
    return a - b;
}

// Multiply two numbers
function multiply(a, b) {
    return a * b;
}

// Divide two numbers
function divide(a, b) {
    if (b === 0) {
        throw new Error('Cannot divide by zero');
    }
    return a / b;
}

// Validate input numbers
function validateNumbers(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Invalid input: Both values must be numbers');
    }
    return true;
}

// Format result to 2 decimal places
function formatResult(result) {
    return Number(result.toFixed(2));
}

// Export functions for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        add,
        subtract,
        multiply,
        divide,
        validateNumbers,
        formatResult,
    };
}