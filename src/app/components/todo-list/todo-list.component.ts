import { Component, OnInit } from "@angular/core";
import { Todo } from "../../models/todo";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TodoService } from "../../services/todo.service";
import { IncompletePipe } from "../../pipes/incomplete.pipe";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [CommonModule, FormsModule, IncompletePipe],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.css",
})
export class TodoListComponent implements OnInit {
  title = "ngTodo";

  todos: Todo[] = [];

  selected: Todo | null = null;
  newTodo: Todo = new Todo();
  editTodo: Todo | null = null;
  showComplete: boolean = false;

  /////////////////

  constructor(
    private todoService: TodoService,
    private incompletePipe: IncompletePipe,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reload();
    this.activatedRoute.paramMap.subscribe( {
      next: (params: ParamMap) => {
        let todoIdStr = params.get('todoId');
        console.log('todoIdStr: ' + todoIdStr);
        if (todoIdStr) {
          let todoId = Number.parseInt(todoIdStr);
          if ( isNaN(todoId) ) {
            this.router.navigateByUrl('invalidTodoId');
          }
          else {
            this.todoService.show(todoId).subscribe( {
              next: (todo) => {
                this.selected = todo;
              },
              error: (nojoy) => {
                console.error('TodoComponent.ngOnInit: error retrieving todo');
                this.router.navigateByUrl('todoNotFound')
              }
            } );
          }
        }
      }
    } );
  }

  reload() {
    this.todoService.index().subscribe({
      next: (todoList) => {
        this.todos = todoList;
      },
      error: (fail) => {
        console.error("TodoListComponent.reload: error getting todos");
        console.error(fail);
      },
    });
  }

  getTodoCount(): number {
    return this.incompletePipe.transform(this.todos).length;
  }

  displayTodo(todo: Todo | null) {
    this.selected = todo;
  }

  displayTable() {
    this.selected = null;
  }

  addTodo(todo: Todo) {
    this.todoService.create(todo).subscribe({
      next: (createdTodo) => {
        this.reload();
        this.newTodo = new Todo();
      },
      error: (oops) => {
        console.error("TodoListComponent.addTodo: error creating todo");
        console.error(oops);
      },
    });
  }

  setEditTodo() {
    this.editTodo = Object.assign({}, this.selected);
  }

  updateTodo(todo: Todo, setSelected: boolean = true) {
    console.log(todo);
    this.todoService.update(todo).subscribe({
      next: (updatedTodo) => {
        this.reload();
        this.editTodo = null;
        if (setSelected) {
          this.selected = updatedTodo;
        }
      },
      error: (yikes) => {
        console.error("TodoListComponent.updateTodo: error on update");
        console.error(yikes);
      },
    });
  }

  deleteTodo(todoId: number) {
    this.todoService.destroy(todoId).subscribe({
      next: () => {
        this.reload();
      },
      error: (fail) => {
        console.error("TodoListComponent.deleteTodo: error on delete");
        console.error(fail);
      },
    });
  }
}
