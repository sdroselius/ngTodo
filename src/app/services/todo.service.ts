import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl = 'http://localhost:8085/';
  private url = this.baseUrl + 'api/todos';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  index(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.index(): error retrieving todos: ' + err)
        );
      })
    );
  }

  show(todoId: number): Observable<Todo> {
    return this.http.get<Todo>(this.url + '/' + todoId).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.show(): error retrieving todo: ' + err)
        );
      })
    );
  }

  create(newTodo: Todo): Observable<Todo> {
    newTodo.completed = false;
    newTodo.description ='';
    return this.http.post<Todo>(this.url, newTodo).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.create(): error creating todo: ' + err)
        );
      })
    );
  }

  update(todo: Todo): Observable<Todo> {
    if (todo.completed) {
      todo.completeDate = this.datePipe.transform(Date.now(), 'shortDate')
    }
    else {
      todo.completeDate = '';
    }
    return this.http.put<Todo>(`${this.url}/${todo.id}`, todo).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.update(): error on PUT: ' + err)
        );
      })
    );
  }

  destroy(todoId: number): Observable<void> {
   // return this.http.delete<void>(this.url + "/" + todoId).pipe(
      return this.http.delete<void>(`${this.url}/${todoId}`).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.delete(): error on DELETE: ' + err)
        );
      })
    );
  }

}
