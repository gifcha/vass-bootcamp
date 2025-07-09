import { Component } from '@angular/core';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TaskService } from '../task.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { Task } from '../task.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-task-list',
  imports: [
    MatListModule,
    MatCardModule,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})


export class TaskListComponent {
  tasks$: Observable<Task[]>;
  users$: Observable<User[]>;
  userMap = new Map<string, User>();

  constructor(
    private router: Router,
    private dialog: Dialog,
    public taskService: TaskService,
    public userService: UserService
  )
  {
    // get task list
    this.tasks$ = this.taskService.tasks$;
    this.taskService.getTaskList();

    this.users$ = this.userService.users$;
    this.userService.getUserList();

    this.users$.subscribe(users => {
      for (let user of users) {
        this.userMap.set(user.id, user);
      }
    });



    if (this.router.url === '/task-create') {
      this.openCreateTask();
    }
  }

  removeTaskById(id: string) {
    this.taskService.removeTaskById(id);
  }

  openCreateTask() {
      let d = this.dialog.open(TaskCreateComponent);
      if (d.componentRef) {
          d.componentRef.instance.dialog = d;
      }
  }

  getAssignedUsername(id: string): string {
    let username = this.userMap.get(id)?.username;
    if (username) {
      return username;
    }
    else { return ""; }
  }
}
