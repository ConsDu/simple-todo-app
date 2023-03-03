import Todos from './todos.js';
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';

const form = document.querySelector('#todo-form');
const title = document.querySelector('#todo-title');
const category = document.querySelector('#todo-category');
const list = document.querySelector('#todo-list');
const filter = document.querySelector('#todo-filter');
const count = document.querySelector('#todo-count');
const reset = document.querySelector('#reset');

let todos = new Todos(JSON.parse(localStorage.getItem('todos'))?.todos ?? []);

const renderTodos = (items, itemsCount) => {
  count.textContent = `(${itemsCount})`;

  list.innerHTML = items
    .map(
      (todo) =>
        `<li><span>${todo.title}</span>
          <span id="remove-todo" data-id=${todo.id}>x</span>
        </li>`
    )
    .join('');

  addRemoveTodoEvent();

  localStorage.setItem('todos', JSON.stringify(todos));
};

const addRemoveTodoEvent = () => {
  document.querySelectorAll('#remove-todo').forEach((todo) => {
    todo.addEventListener('click', (event) => {
      todos.removeTodo(event.currentTarget.dataset.id);
      renderTodos(todos.getAll(), todos.getCount());
    });
  });
};

try {
  renderTodos(todos.getAll(), todos.getCount());
  addRemoveTodoEvent();
} catch (error) {
  console.error(error);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    todos.add(nanoid(), title.value, category.value);
    renderTodos(todos.getAll(), todos.getCount());
    addRemoveTodoEvent();
  } catch (error) {
    console.error(error);
  }
  title.value = '';
});

reset.addEventListener('click', (event) => {
  todos.reset();
  renderTodos(todos.getAll(), todos.getCount());
});

filter.addEventListener('change', () => {
  try {
    if (filter.value === 'work') {
      // filter work
      renderTodos(todos.getWork(), todos.getWorkCount());
    } else if (filter.value === 'personal') {
      // filter personal
      renderTodos(todos.getPersonal(), todos.getPersonalCount());
    } else {
      // show all
      renderTodos(todos.getAll(), todos.getCount());
    }
  } catch (error) {
    console.error(error);
  }
});
