/**
 * Calculator unit tests
 */

const {
    add,
    subtract,
    multiply,
    divide,
    validateNumbers,
    formatResult,
} = require('../src/calculator');

describe('Calculator Functions', () => {
    describe('add', () => {
        test('should add two positive numbers correctly', () => {
            expect(add(2, 3)).toBe(5);
        });

        test('should add two negative numbers correctly', () => {
            expect(add(-2, -3)).toBe(-5);
        });

        test('should add positive and negative numbers correctly', () => {
            expect(add(10, -5)).toBe(5);
        });

        test('should handle decimal numbers', () => {
            expect(add(2.5, 3.5)).toBe(6);
        });

        test('should return 0 when adding 0 + 0', () => {
            expect(add(0, 0)).toBe(0);
        });
    });

    describe('subtract', () => {
        test('should subtract two positive numbers correctly', () => {
            expect(subtract(5, 3)).toBe(2);
        });

        test('should subtract and return negative result', () => {
            expect(subtract(3, 5)).toBe(-2);
        });

        test('should handle decimal numbers', () => {
            expect(subtract(5.5, 2.5)).toBe(3);
        });

        test('should subtract zero correctly', () => {
            expect(subtract(10, 0)).toBe(10);
        });
    });

    describe('multiply', () => {
        test('should multiply two positive numbers correctly', () => {
            expect(multiply(4, 5)).toBe(20);
        });

        test('should multiply negative numbers correctly', () => {
            expect(multiply(-4, -5)).toBe(20);
        });

        test('should multiply positive and negative numbers correctly', () => {
            expect(multiply(4, -5)).toBe(-20);
        });

        test('should return 0 when multiplying by 0', () => {
            expect(multiply(100, 0)).toBe(0);
        });

        test('should handle decimal multiplication', () => {
            expect(multiply(2.5, 4)).toBe(10);
        });
    });

    describe('divide', () => {
        test('should divide two positive numbers correctly', () => {
            expect(divide(10, 2)).toBe(5);
        });

        test('should divide and return decimal result', () => {
            expect(divide(10, 3)).toBeCloseTo(3.333, 2);
        });

        test('should throw error when dividing by zero', () => {
            expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
        });

        test('should handle negative division', () => {
            expect(divide(-10, 2)).toBe(-5);
        });

        test('should handle 0 divided by number', () => {
            expect(divide(0, 5)).toBe(0);
        });
    });

    describe('validateNumbers', () => {
        test('should return true for valid numbers', () => {
            expect(validateNumbers(5, 10)).toBe(true);
        });

        test('should throw error for non-numeric strings', () => {
            expect(() => validateNumbers('abc', 10)).toThrow();
        });

        test('should throw error when both are NaN', () => {
            expect(() => validateNumbers(NaN, NaN)).toThrow();
        });

        test('should return true for negative numbers', () => {
            expect(validateNumbers(-5, -10)).toBe(true);
        });

        test('should return true for zero', () => {
            expect(validateNumbers(0, 0)).toBe(true);
        });
    });

    describe('formatResult', () => {
        test('should format result to 2 decimal places', () => {
            expect(formatResult(3.14159)).toBe(3.14);
        });

        test('should handle whole numbers', () => {
            expect(formatResult(5.00)).toBe(5);
        });

        test('should round correctly', () => {
            expect(formatResult(3.14599)).toBe(3.15);
        });

        test('should handle zero', () => {
            expect(formatResult(0)).toBe(0);
        });

        test('should handle negative numbers', () => {
            expect(formatResult(-3.14159)).toBe(-3.14);
        });
    });
});