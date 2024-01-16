import { Component } from '@angular/core';
import { Todo } from '../../models/todo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  title = 'ngTodo';

  todos: Todo[] = [
    new Todo(1, 'Go round mums', '', false),
    new Todo(2, 'Get Liz back', '', false),
    new Todo(3, 'Sort life out', '', false)
  ];

  selected: Todo | null = null;
  newTodo: Todo = new Todo();
  editTodo: Todo | null = null;

  /////////////////

  getTodoCount(): number {
    return this.todos.length;
  }

  displayTodo(todo: Todo | null) {
    this.selected = todo;
  }

  displayTable() {
    this.selected = null;
  }

  addTodo(todo:Todo) {
    todo.id = this.generateId();
    todo.completed = false;
    todo.description ='';
    this.todos.push(todo);
    this.newTodo = new Todo();
    // this.todos.push({...todo});
  }

  generateId() {
    return this.todos[this.todos.length - 1].id + 1;
  }

  setEditTodo() {
    this.editTodo = Object.assign({}, this.selected);
  }

  updateTodo(todo: Todo) {
    console.log(todo);
    for (let i = 0; i < this.todos.length; i++) {
      if ( this.todos[i].id === todo.id) {
        this.todos[i].task = todo.task;
        this.todos[i].description = todo.description;
        this.todos[i].completed = todo.completed;
        break;
      }
    }
    this.editTodo = null;
  }

}
