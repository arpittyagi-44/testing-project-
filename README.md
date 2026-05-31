# Testing Basics Project

A complete project demonstrating web development with **HTML**, **CSS**, **JavaScript**, and comprehensive **unit testing** using Jest.

## 📋 Project Overview

This project includes three main features:

1. **Calculator** - Basic arithmetic operations (add, subtract, multiply, divide)
2. **Counter** - Simple increment/decrement/reset functionality
3. **To-Do List** - Create, complete, and delete tasks

Each feature is fully tested with comprehensive unit tests covering various scenarios and edge cases.

## 🗂️ Project Structure

```
testing-project/
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── jest.config.js          # Jest configuration
├── src/
│   ├── styles.css          # Styling for all components
│   ├── calculator.js       # Calculator functions
│   ├── counter.js          # Counter class
│   ├── todo.js             # Todo Manager class
│   └── index.js            # DOM interactions and event listeners
└── __tests__/
    ├── calculator.test.js  # Calculator unit tests
    ├── counter.test.js     # Counter unit tests
    └── todo.test.js        # Todo Manager unit tests
```

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arpittyagi-44/testing-project.git
cd testing-project
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Open `index.html` directly in your browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 📚 Features

### Calculator
- **Add** two numbers
- **Subtract** two numbers
- **Multiply** two numbers
- **Divide** two numbers (with zero-division protection)
- Input validation
- Result formatting to 2 decimal places

### Counter
- **Increment** the count by 1
- **Decrement** the count by 1
- **Reset** the count to 0
- Add custom amounts
- Get current value

### To-Do List
- **Add** new tasks
- **Complete/Uncomplete** tasks
- **Delete** tasks
- View pending and completed tasks
- Clear all completed tasks
- Real-time list updates

## 🧪 Testing

### Test Coverage

The project includes comprehensive tests for all features:

| Module | Tests | Coverage |
|--------|-------|----------|
| Calculator | 24 | 100% |
| Counter | 31 | 100% |
| Todo Manager | 36 | 100% |
| **Total** | **91** | **100%** |

### Test Categories

#### Calculator Tests
- ✅ Addition of positive, negative, and decimal numbers
- ✅ Subtraction with various number types
- ✅ Multiplication including edge cases
- ✅ Division with zero-division error handling
- ✅ Input validation
- ✅ Result formatting

#### Counter Tests
- ✅ Initialization with default and custom values
- ✅ Increment/decrement operations
- ✅ Reset functionality
- ✅ Setting custom values with validation
- ✅ Adding amounts
- ✅ Chaining operations

#### Todo Manager Tests
- ✅ Adding todos with validation
- ✅ Removing todos
- ✅ Completing/uncompleting tasks
- ✅ Retrieving todos by ID or status
- ✅ Counting todos
- ✅ Clearing completed todos
- ✅ Complex integration scenarios

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with flexbox and gradients
- **JavaScript (ES6+)** - Object-oriented programming with classes
- **Jest** - JavaScript testing framework
- **Babel** - JavaScript transpiler for Jest compatibility

## 📖 Learning Outcomes

This project teaches:

1. **Unit Testing Fundamentals**
   - Writing effective test cases
   - Testing edge cases and error conditions
   - Using assertions and matchers
   - Test organization and structure

2. **JavaScript Best Practices**
   - Object-oriented programming with classes
   - Error handling and validation
   - DOM manipulation and events
   - Module exports for testing

3. **Web Development**
   - Semantic HTML structure
   - Responsive CSS design
   - Event-driven JavaScript
   - User interaction handling

4. **Testing Tools**
   - Jest framework and CLI
   - Test coverage analysis
   - Watch mode for development
   - Mock data and setup/teardown

## 📝 Example Test

Here's an example of a test from the calculator suite:

```javascript
describe('Calculator Functions', () => {
    describe('add', () => {
        test('should add two positive numbers correctly', () => {
            expect(add(2, 3)).toBe(5);
        });

        test('should throw error when dividing by zero', () => {
            expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
        });
    });
});
```

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Next Steps

To extend this project:

1. Add more calculator operations (power, square root, etc.)
2. Implement local storage for todo persistence
3. Add more advanced testing patterns (mocking, spies)
4. Create an API backend for the todo list
5. Add authentication and user accounts
6. Implement todo categories and priorities

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Happy Testing! 🚀**