import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [
    new Todo(1, 'Go round mums', '', false),
    new Todo(2, 'Get Liz back', '', false),
    new Todo(3, 'Sort life out', '', false)
  ];

  constructor() { }

  index() {
    return [...this.todos];
  }

  generateId() {
    return this.todos[this.todos.length - 1].id + 1;
  }

  create(newTodo: Todo) {
    newTodo.id = this.generateId();
    newTodo.completed = false;
    newTodo.description ='';
    this.todos.push(newTodo);
  }

  update(todo: Todo) {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id === todo.id) {
        this.todos[i].task = todo.task;
        this.todos[i].description = todo.description;
        this.todos[i].completed = todo.completed;
        break;
      }
    }
  }

  destroy(todoId: number) {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id === todoId) {
        this.todos.splice(i,1);
        break;
      }
    }
  }
}
