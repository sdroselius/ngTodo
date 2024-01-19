import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "../models/todo";

@Pipe({
  name: "incomplete",
  standalone: true,
})
export class IncompletePipe implements PipeTransform {
  transform(todos: Todo[], showComplete: boolean = false): Todo[] {
    if (showComplete) {
      return todos;
    }
    let incompleteTodos: Todo[] = [];

    for (const todo of todos) {
      if ( ! todo.completed ) {
        incompleteTodos.push(todo);
      }
    }
    // incompleteTodos = todos.filter( t => ! t.completed);

    return incompleteTodos;
  }
}
