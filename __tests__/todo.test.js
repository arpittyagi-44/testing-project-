/**
 * Todo Manager unit tests
 */

const TodoManager = require('../src/todo');

describe('TodoManager Class', () => {
    let todoManager;

    beforeEach(() => {
        todoManager = new TodoManager();
    });

    describe('initialization', () => {
        test('should initialize with empty todos array', () => {
            expect(todoManager.getAllTodos()).toEqual([]);
        });

        test('should initialize with nextId of 1', () => {
            const todo = todoManager.addTodo('Test');
            expect(todo.id).toBe(1);
        });
    });

    describe('addTodo', () => {
        test('should add a new todo with valid text', () => {
            const todo = todoManager.addTodo('Buy groceries');
            expect(todo.text).toBe('Buy groceries');
            expect(todo.completed).toBe(false);
        });

        test('should assign incremental IDs', () => {
            const todo1 = todoManager.addTodo('Task 1');
            const todo2 = todoManager.addTodo('Task 2');
            expect(todo1.id).toBe(1);
            expect(todo2.id).toBe(2);
        });

        test('should trim whitespace from todo text', () => {
            const todo = todoManager.addTodo('  Buy milk  ');
            expect(todo.text).toBe('Buy milk');
        });

        test('should set createdAt timestamp', () => {
            const beforeTime = new Date();
            const todo = todoManager.addTodo('Test task');
            const afterTime = new Date();
            
            expect(todo.createdAt.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
            expect(todo.createdAt.getTime()).toBeLessThanOrEqual(afterTime.getTime());
        });

        test('should throw error for empty string', () => {
            expect(() => todoManager.addTodo('')).toThrow();
        });

        test('should throw error for null', () => {
            expect(() => todoManager.addTodo(null)).toThrow();
        });

        test('should throw error for undefined', () => {
            expect(() => todoManager.addTodo(undefined)).toThrow();
        });

        test('should throw error for non-string input', () => {
            expect(() => todoManager.addTodo(123)).toThrow();
        });

        test('should add todo to todos array', () => {
            todoManager.addTodo('Task 1');
            expect(todoManager.getTodoCount()).toBe(1);
        });
    });

    describe('removeTodo', () => {
        test('should remove todo by ID', () => {
            const todo = todoManager.addTodo('Task to delete');
            todoManager.removeTodo(todo.id);
            expect(todoManager.getTodoCount()).toBe(0);
        });

        test('should return the removed todo', () => {
            const added = todoManager.addTodo('Task');
            const removed = todoManager.removeTodo(added.id);
            expect(removed.id).toBe(added.id);
            expect(removed.text).toBe('Task');
        });

        test('should throw error when todo not found', () => {
            expect(() => todoManager.removeTodo(999)).toThrow('Todo not found');
        });

        test('should remove only the specified todo', () => {
            todoManager.addTodo('Task 1');
            const todo2 = todoManager.addTodo('Task 2');
            todoManager.addTodo('Task 3');
            
            todoManager.removeTodo(2);
            expect(todoManager.getTodoCount()).toBe(2);
            expect(todoManager.getTodo(2)).toBeUndefined();
        });
    });

    describe('completeTodo', () => {
        test('should toggle completed status from false to true', () => {
            const todo = todoManager.addTodo('Task');
            todoManager.completeTodo(todo.id);
            expect(todoManager.getTodo(todo.id).completed).toBe(true);
        });

        test('should toggle completed status from true to false', () => {
            const todo = todoManager.addTodo('Task');
            todoManager.completeTodo(todo.id);
            todoManager.completeTodo(todo.id);
            expect(todoManager.getTodo(todo.id).completed).toBe(false);
        });

        test('should return the todo after completion', () => {
            const todo = todoManager.addTodo('Task');
            const result = todoManager.completeTodo(todo.id);
            expect(result.completed).toBe(true);
        });

        test('should throw error when todo not found', () => {
            expect(() => todoManager.completeTodo(999)).toThrow('Todo not found');
        });
    });

    describe('getTodo', () => {
        test('should return todo by ID', () => {
            const added = todoManager.addTodo('Find me');
            const found = todoManager.getTodo(added.id);
            expect(found.text).toBe('Find me');
        });

        test('should return undefined for non-existent ID', () => {
            expect(todoManager.getTodo(999)).toBeUndefined();
        });
    });

    describe('getAllTodos', () => {
        test('should return empty array when no todos', () => {
            expect(todoManager.getAllTodos()).toEqual([]);
        });

        test('should return all todos', () => {
            todoManager.addTodo('Task 1');
            todoManager.addTodo('Task 2');
            todoManager.addTodo('Task 3');
            expect(todoManager.getAllTodos()).toHaveLength(3);
        });

        test('should return copy of todos array', () => {
            todoManager.addTodo('Original');
            const todos = todoManager.getAllTodos();
            todos[0].text = 'Modified';
            expect(todoManager.getTodo(1).text).toBe('Original');
        });
    });

    describe('getCompletedTodos', () => {
        test('should return only completed todos', () => {
            const todo1 = todoManager.addTodo('Task 1');
            const todo2 = todoManager.addTodo('Task 2');
            const todo3 = todoManager.addTodo('Task 3');

            todoManager.completeTodo(todo1.id);
            todoManager.completeTodo(todo3.id);

            const completed = todoManager.getCompletedTodos();
            expect(completed).toHaveLength(2);
            expect(completed[0].text).toBe('Task 1');
            expect(completed[1].text).toBe('Task 3');
        });

        test('should return empty array when no completed todos', () => {
            todoManager.addTodo('Task 1');
            expect(todoManager.getCompletedTodos()).toEqual([]);
        });
    });

    describe('getPendingTodos', () => {
        test('should return only pending todos', () => {
            const todo1 = todoManager.addTodo('Task 1');
            const todo2 = todoManager.addTodo('Task 2');
            const todo3 = todoManager.addTodo('Task 3');

            todoManager.completeTodo(todo2.id);

            const pending = todoManager.getPendingTodos();
            expect(pending).toHaveLength(2);
            expect(pending[0].text).toBe('Task 1');
            expect(pending[1].text).toBe('Task 3');
        });

        test('should return all todos when none are completed', () => {
            todoManager.addTodo('Task 1');
            todoManager.addTodo('Task 2');
            expect(todoManager.getPendingTodos()).toHaveLength(2);
        });
    });

    describe('clearCompleted', () => {
        test('should remove all completed todos', () => {
            const todo1 = todoManager.addTodo('Task 1');
            const todo2 = todoManager.addTodo('Task 2');
            todoManager.completeTodo(todo1.id);

            todoManager.clearCompleted();
            expect(todoManager.getTodoCount()).toBe(1);
            expect(todoManager.getTodo(todo1.id)).toBeUndefined();
            expect(todoManager.getTodo(todo2.id)).toBeDefined();
        });

        test('should return count of cleared todos', () => {
            const todo1 = todoManager.addTodo('Task 1');
            const todo2 = todoManager.addTodo('Task 2');
            todoManager.completeTodo(todo1.id);
            todoManager.completeTodo(todo2.id);

            const count = todoManager.clearCompleted();
            expect(count).toBe(2);
        });

        test('should return 0 when no completed todos', () => {
            todoManager.addTodo('Task 1');
            const count = todoManager.clearCompleted();
            expect(count).toBe(0);
        });
    });

    describe('getTodoCount', () => {
        test('should return 0 for empty list', () => {
            expect(todoManager.getTodoCount()).toBe(0);
        });

        test('should return correct count', () => {
            todoManager.addTodo('Task 1');
            todoManager.addTodo('Task 2');
            expect(todoManager.getTodoCount()).toBe(2);
        });

        test('should update count after adding and removing', () => {
            const todo = todoManager.addTodo('Task');
            expect(todoManager.getTodoCount()).toBe(1);
            
            todoManager.removeTodo(todo.id);
            expect(todoManager.getTodoCount()).toBe(0);
        });
    });

    describe('integration tests', () => {
        test('should handle complex todo operations', () => {
            const todo1 = todoManager.addTodo('Buy groceries');
            const todo2 = todoManager.addTodo('Finish project');
            const todo3 = todoManager.addTodo('Call mom');

            todoManager.completeTodo(todo1.id);
            expect(todoManager.getPendingTodos()).toHaveLength(2);
            expect(todoManager.getCompletedTodos()).toHaveLength(1);

            todoManager.removeTodo(todo2.id);
            expect(todoManager.getTodoCount()).toBe(2);

            todoManager.clearCompleted();
            expect(todoManager.getTodoCount()).toBe(1);
            expect(todoManager.getTodo(todo3.id).text).toBe('Call mom');
        });
    });
});