export class Todo {
  id: number;
  task: string;
  description: string;
  completed: boolean;

  constructor(
    id: number = 0,
    task: string = '',
    description: string = '',
    completed: boolean = false
  ) {
    this.id = id;
    this.task = task;
    this.description = description;
    this.completed = completed;
  }

}
