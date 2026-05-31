/**
 * Counter unit tests
 */

const Counter = require('../src/counter');

describe('Counter Class', () => {
    let counter;

    beforeEach(() => {
        counter = new Counter();
    });

    describe('initialization', () => {
        test('should initialize with default value of 0', () => {
            expect(counter.getValue()).toBe(0);
        });

        test('should initialize with custom initial value', () => {
            const customCounter = new Counter(10);
            expect(customCounter.getValue()).toBe(10);
        });

        test('should initialize with negative initial value', () => {
            const customCounter = new Counter(-5);
            expect(customCounter.getValue()).toBe(-5);
        });
    });

    describe('increment', () => {
        test('should increment value by 1', () => {
            counter.increment();
            expect(counter.getValue()).toBe(1);
        });

        test('should increment multiple times', () => {
            counter.increment();
            counter.increment();
            counter.increment();
            expect(counter.getValue()).toBe(3);
        });

        test('should return the new value after increment', () => {
            expect(counter.increment()).toBe(1);
        });

        test('should increment from negative value', () => {
            counter = new Counter(-5);
            counter.increment();
            expect(counter.getValue()).toBe(-4);
        });
    });

    describe('decrement', () => {
        test('should decrement value by 1', () => {
            counter.decrement();
            expect(counter.getValue()).toBe(-1);
        });

        test('should decrement multiple times', () => {
            counter.decrement();
            counter.decrement();
            counter.decrement();
            expect(counter.getValue()).toBe(-3);
        });

        test('should return the new value after decrement', () => {
            expect(counter.decrement()).toBe(-1);
        });

        test('should decrement from positive value', () => {
            counter = new Counter(5);
            counter.decrement();
            expect(counter.getValue()).toBe(4);
        });
    });

    describe('reset', () => {
        test('should reset value to 0', () => {
            counter = new Counter(10);
            counter.reset();
            expect(counter.getValue()).toBe(0);
        });

        test('should return 0 after reset', () => {
            counter = new Counter(5);
            expect(counter.reset()).toBe(0);
        });

        test('should reset negative value to 0', () => {
            counter = new Counter(-10);
            counter.reset();
            expect(counter.getValue()).toBe(0);
        });
    });

    describe('getValue', () => {
        test('should return current value', () => {
            counter = new Counter(42);
            expect(counter.getValue()).toBe(42);
        });

        test('should return updated value after operations', () => {
            counter.increment();
            counter.increment();
            expect(counter.getValue()).toBe(2);
        });
    });

    describe('setValue', () => {
        test('should set counter to new value', () => {
            counter.setValue(100);
            expect(counter.getValue()).toBe(100);
        });

        test('should set counter to negative value', () => {
            counter.setValue(-50);
            expect(counter.getValue()).toBe(-50);
        });

        test('should set counter to zero', () => {
            counter.setValue(0);
            expect(counter.getValue()).toBe(0);
        });

        test('should return the new value after setting', () => {
            expect(counter.setValue(25)).toBe(25);
        });

        test('should throw error for non-numeric value', () => {
            expect(() => counter.setValue('abc')).toThrow();
        });

        test('should throw error for undefined value', () => {
            expect(() => counter.setValue(undefined)).toThrow();
        });

        test('should throw error for null value', () => {
            expect(() => counter.setValue(null)).toThrow();
        });
    });

    describe('add', () => {
        test('should add positive amount to counter', () => {
            counter.add(5);
            expect(counter.getValue()).toBe(5);
        });

        test('should add negative amount to counter', () => {
            counter.add(-3);
            expect(counter.getValue()).toBe(-3);
        });

        test('should add multiple times', () => {
            counter.add(5);
            counter.add(3);
            counter.add(2);
            expect(counter.getValue()).toBe(10);
        });

        test('should return new value after add', () => {
            expect(counter.add(7)).toBe(7);
        });

        test('should throw error for non-numeric amount', () => {
            expect(() => counter.add('5')).toThrow();
        });

        test('should throw error for undefined amount', () => {
            expect(() => counter.add(undefined)).toThrow();
        });
    });

    describe('chaining operations', () => {
        test('should handle complex sequences', () => {
            counter = new Counter(10);
            counter.increment();
            counter.increment();
            counter.decrement();
            counter.add(5);
            expect(counter.getValue()).toBe(17);
        });

        test('should handle increment and reset', () => {
            counter.increment();
            counter.increment();
            counter.reset();
            counter.increment();
            expect(counter.getValue()).toBe(1);
        });
    });
});