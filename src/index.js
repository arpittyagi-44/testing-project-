/**
 * Main entry point - DOM interactions and event listeners
 */

// Initialize counter instance
let counter = new Counter();

// Initialize todo manager
let todoManager = new TodoManager();

// ===== CALCULATOR FUNCTIONS =====
document.getElementById('addBtn').addEventListener('click', () => {
    performCalculation(add);
});

document.getElementById('subtractBtn').addEventListener('click', () => {
    performCalculation(subtract);
});

document.getElementById('multiplyBtn').addEventListener('click', () => {
    performCalculation(multiply);
});

document.getElementById('divideBtn').addEventListener('click', () => {
    performCalculation(divide);
});

function performCalculation(operation) {
    try {
        const num1 = parseFloat(document.getElementById('num1').value);
        const num2 = parseFloat(document.getElementById('num2').value);

        validateNumbers(num1, num2);
        const result = operation(num1, num2);
        const formattedResult = formatResult(result);

        document.getElementById('resultValue').textContent = formattedResult;
    } catch (error) {
        document.getElementById('resultValue').textContent = `Error: ${error.message}`;
    }
}

// ===== COUNTER FUNCTIONS =====
document.getElementById('incrementBtn').addEventListener('click', () => {
    counter.increment();
    updateCounterDisplay();
});

document.getElementById('decrementBtn').addEventListener('click', () => {
    counter.decrement();
    updateCounterDisplay();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    counter.reset();
    updateCounterDisplay();
});

function updateCounterDisplay() {
    document.getElementById('counterValue').textContent = counter.getValue();
}

// ===== TODO FUNCTIONS =====
document.getElementById('addTodoBtn').addEventListener('click', () => {
    addNewTodo();
});

document.getElementById('todoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addNewTodo();
    }
});

function addNewTodo() {
    try {
        const input = document.getElementById('todoInput');
        const text = input.value;

        if (!text.trim()) {
            alert('Please enter a task');
            return;
        }

        const todo = todoManager.addTodo(text);
        renderTodoList();
        input.value = '';
        input.focus();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function renderTodoList() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todoManager.getAllTodos().forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span class="todo-item-text">${escapeHtml(todo.text)}</span>
            <div class="todo-item-actions">
                <button class="todo-btn-complete" data-id="${todo.id}">
                    ${todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="todo-btn-delete" data-id="${todo.id}">Delete</button>
            </div>
        `;

        const completeBtn = li.querySelector('.todo-btn-complete');
        const deleteBtn = li.querySelector('.todo-btn-delete');

        completeBtn.addEventListener('click', () => {
            todoManager.completeTodo(todo.id);
            renderTodoList();
        });

        deleteBtn.addEventListener('click', () => {
            todoManager.removeTodo(todo.id);
            renderTodoList();
        });

        todoList.appendChild(li);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize displays
updateCounterDisplay();
renderTodoList();