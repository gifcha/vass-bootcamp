import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-list',
  imports: [
    MatListModule,
    MatCardModule,
    AsyncPipe
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})

export class UserListComponent {
  users$: Observable<User[]>;

  constructor(public userService: UserService) {
    this.users$ = this.userService.users$;
    this.userService.getUserList();
  }
}
