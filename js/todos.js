export default class Todos {
  constructor(todosInput) {
    this.todos = todosInput;
  }

  getAll() {
    return this.todos;
  }
  getCount() {
    return this.todos.length;
  }
  add(id, title, category) {
    this.todos.push({ id, title, category });
  }
  getWork() {
    return this.todos.filter((todo) => todo.category === 'work');
  }
  getWorkCount() {
    return this.getWork().length;
  }
  getPersonal() {
    return this.todos.filter((todo) => todo.category === 'personal');
  }
  getPersonalCount() {
    return this.getPersonal().length;
  }
  reset() {
    this.todos.length = 0;
  }
  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
