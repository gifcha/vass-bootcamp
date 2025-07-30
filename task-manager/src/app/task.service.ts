import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, shareReplay, switchMap, throwError } from 'rxjs';
import { environment } from '../environments/environment.dev';


@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private taskUrl = environment.apiBaseUrl + environment.taskApiUrl;
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  taskTypes: string[] = ["Normal", "Optional", "Urgent"]
  taskStatuses: string[] = ["To do", "In progress", "Completed"]

  // Fetch tasks when observable is assigned
  public tasks$: Observable<Task[]> = this.tasksSubject.pipe(
    switchMap(() => this.http.get<Task[]>(this.taskUrl).pipe(
      catchError(this.handleError)
    )),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private http: HttpClient) {

  }

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

  updateTask(task: Task) {
    this.http.put<Task>(`${this.taskUrl}/${task.id}`, task).subscribe(
      updatedTask => {
        this.refreshTasks();
      });
  }
}
