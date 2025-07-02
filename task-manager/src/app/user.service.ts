import { Injectable } from '@angular/core';
import { User } from './user.model';
import { environment } from '../environments/environment.dev';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = environment.apiBaseUrl + environment.userApiUrl;
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();


  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error(`Error occurred Status: ${error.status}, Message: ${error.message}`);
    return throwError(() => error);
  }


  getUserList(): void {
    this.http.get<User[]>(this.userUrl)
    .pipe(catchError(this.handleError))
    .subscribe(tasks => {
      this.usersSubject.next(tasks);
    });
  }

  addUser(task: User): void {
    this.http.post<User>(this.userUrl, task).subscribe(
      createdUser => {
        console.log(createdUser);
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next([...currentUsers, createdUser]);
      });
  }

}
