import { Injectable } from '@angular/core';
import { User } from './user.model';
import { environment } from '../environments/environment.dev';
import { BehaviorSubject, catchError, defer, Observable, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = environment.apiBaseUrl + environment.userApiUrl;
  private usersSubject = new BehaviorSubject<User[]>([]);

  // Fetch users when observable is assigned
  public users$: Observable<User[]> = defer(() => this.http.get<User[]>(this.userUrl).pipe(
    tap(users => this.usersSubject.next(users)),
    catchError(this.handleError),
    shareReplay(1)
  ));


  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error(`Error occurred Status: ${error.status}, Message: ${error.message}`);
    return throwError(() => error);
  }


  refreshUsers(): void {
    this.http.get<User[]>(this.userUrl)
      .pipe(catchError(this.handleError))
      .subscribe(users => {
        this.usersSubject.next(users);
      });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  addUser(user: User): void {
    this.http.post<User>(this.userUrl, user).subscribe(
      createdUser => {
        console.log(createdUser);
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next([...currentUsers, createdUser]);
      });
  }
}
