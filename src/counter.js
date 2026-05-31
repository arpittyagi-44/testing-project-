/**
 * Counter module - Manages counter state and operations
 */

class Counter {
    constructor(initialValue = 0) {
        this.value = initialValue;
    }

    increment() {
        this.value += 1;
        return this.value;
    }

    decrement() {
        this.value -= 1;
        return this.value;
    }

    reset() {
        this.value = 0;
        return this.value;
    }

    getValue() {
        return this.value;
    }

    setValue(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('Counter value must be a number');
        }
        this.value = newValue;
        return this.value;
    }

    add(amount) {
        if (typeof amount !== 'number') {
            throw new Error('Amount must be a number');
        }
        this.value += amount;
        return this.value;
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Counter;
}