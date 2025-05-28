import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.dev';


@Injectable({
  providedIn: 'root'
})

export class TaskService {
  public taskList: Task[] = [];

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error:', error.error.message);
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      // Server-side error
      console.error(`Server error (${error.status}):`, error.error);
      errorMessage = `Server returned code ${error.status}, message was: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }


  getTaskList(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.taskApiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(environment.taskApiUrl, task).pipe(
      catchError(this.handleError));
  }

  removeTaskById(id: string): Observable<Object>{
    return this.http.delete(environment.taskApiUrl + "/" + id).pipe(
      catchError(this.handleError));
  }
}
