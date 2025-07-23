import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../task.model';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-task-details',
  imports: [
    MatCardModule,
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  assignedUser: User | null = null;

  constructor(
    public dialogRef: DialogRef<TaskDetailsComponent>,
    @Inject(DIALOG_DATA) public data: {task: Task, user: User | undefined},
    public userService: UserService
  )
  {
    console.log("In component: ", data.user);
  }
}
