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
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-task-list',
  imports: [
    MatListModule,
    MatCardModule,
    MatButtonModule,
    AsyncPipe,
    MatRippleModule
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
    this.tasks$ = this.taskService.tasks$;
    this.users$ = this.userService.users$;

    // fill userMap
    this.users$.subscribe(users => {
      for (let user of users) {
        this.userMap.set(user.id, user);
      }
    }).unsubscribe();



    if (this.router.url === '/task-create') {
      this.openCreateTask();
    }
  }

  removeTaskById(id: string) {
    this.taskService.removeTaskById(id);
  }

  openCreateTask() {
    this.dialog.open(TaskCreateComponent);
  }

  openTaskDetails(task: Task) {
    let user: User | undefined = this.userMap.get(task.assignedto);
    console.log("In open", user);
    this.dialog.open(TaskDetailsComponent, {data: {task, user}});
  }

  getAssignedUsername(id: string): string {
    let username = this.userMap.get(id)?.username;
    if (username) {
      return username;
    }
    else { return ""; }
  }
}
