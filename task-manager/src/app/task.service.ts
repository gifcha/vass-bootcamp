import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, defer, Observable, shareReplay, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment.dev';


@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private taskUrl = environment.apiBaseUrl + environment.taskApiUrl;
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  // Fetch tasks when observable is assigned
  public tasks$: Observable<Task[]> = defer(() => this.http.get<Task[]>(this.taskUrl).pipe(
    tap(tasks => this.tasksSubject.next(tasks)),
    catchError(this.handleError),
    shareReplay(1)
  ));

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error(`Error occurred Status: ${error.status}, Message: ${error.message}`);
    return throwError(() => error);
  }

  refreshTasks(): void {
    this.http.get<Task[]>(this.taskUrl)
      .pipe(catchError(this.handleError))
      .subscribe(tasks => {
        this.tasksSubject.next(tasks);
      });
  }

  addTask(task: Task): void {
    this.http.post<Task>(this.taskUrl, task).subscribe(
      createdTask => {
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next([...currentTasks, createdTask]);
      });
  }

  removeTaskById(id: string): void {
    this.http.delete<Task[]>(`${this.taskUrl}/${id}`)
      .pipe(catchError(this.handleError))
      .subscribe(tasks => {
        this.tasksSubject.next(tasks);
      });
  }
}
