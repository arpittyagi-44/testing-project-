/**
 * Todo module - Manages todo items
 */

class TodoManager {
    constructor() {
        this.todos = [];
        this.nextId = 1;
    }

    addTodo(text) {
        if (!text || typeof text !== 'string') {
            throw new Error('Todo text must be a non-empty string');
        }

        const todo = {
            id: this.nextId,
            text: text.trim(),
            completed: false,
            createdAt: new Date(),
        };

        this.todos.push(todo);
        this.nextId += 1;
        return todo;
    }

    removeTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) {
            throw new Error('Todo not found');
        }

        const removed = this.todos.splice(index, 1);
        return removed[0];
    }

    completeTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) {
            throw new Error('Todo not found');
        }

        todo.completed = !todo.completed;
        return todo;
    }

    getTodo(id) {
        return this.todos.find(todo => todo.id === id);
    }

    getAllTodos() {
        return [...this.todos];
    }

    getCompletedTodos() {
        return this.todos.filter(todo => todo.completed);
    }

    getPendingTodos() {
        return this.todos.filter(todo => !todo.completed);
    }

    clearCompleted() {
        const count = this.todos.filter(todo => todo.completed).length;
        this.todos = this.todos.filter(todo => !todo.completed);
        return count;
    }

    getTodoCount() {
        return this.todos.length;
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TodoManager;
}