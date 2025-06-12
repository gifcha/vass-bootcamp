import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment.dev';


@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private taskUrl = environment.apiBaseUrl + environment.taskApiUrl;
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();


  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error(`Error occurred Status: ${error.status}, Message: ${error.message}`);
    return throwError(() => error);
  }


  getTaskList(): void {
    this.http.get<Task[]>(this.taskUrl)
    .pipe(catchError(this.handleError))
    .subscribe(tasks => {
      this.tasksSubject.next(tasks);
    });
  }

  addTask(task: Task): void {
    this.http.post<Task>(this.taskUrl, task).subscribe(
      createdTask => {
        console.log(createdTask);
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next([...currentTasks, createdTask]);
      });
  }

  removeTaskById(id: string): void {
    this.http.delete<Task[]>(this.taskUrl + "/" + id)
    .pipe(catchError(this.handleError))
    .subscribe(tasks => {
      this.tasksSubject.next(tasks);
    });
  }
}
