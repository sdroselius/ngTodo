import { Component, OnInit } from "@angular/core";
import { Todo } from "../../models/todo";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.css",
})
export class TodoListComponent implements OnInit {
  title = "ngTodo";

  todos: Todo[] = [
    new Todo(1, "Go round mums", "", false),
    new Todo(2, "Get Liz back", "", false),
    new Todo(3, "Sort life out", "", false),
  ];

  selected: Todo | null = null;
  newTodo: Todo = new Todo();
  editTodo: Todo | null = null;

  /////////////////

  ngOnInit(): void {
    this.todos = this.todoService.index();
  }
  constructor(private todoService: TodoService) {}

  getTodoCount(): number {
    return this.todos.length;
  }

  displayTodo(todo: Todo | null) {
    this.selected = todo;
  }

  displayTable() {
    this.selected = null;
  }

  addTodo(todo: Todo) {
    this.todoService.create(todo);
    this.todos = this.todoService.index();
    this.newTodo = new Todo();
  }

  setEditTodo() {
    this.editTodo = Object.assign({}, this.selected);
  }

  updateTodo(todo: Todo) {
    console.log(todo);
    this.todoService.update(todo);
    this.todos = this.todoService.index();
    this.editTodo = null;
  }

  deleteTodo(todoId: number) {
    this.todoService.destroy(todoId);
    this.todos = this.todoService.index();
  }
}
