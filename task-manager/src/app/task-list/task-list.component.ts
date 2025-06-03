import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TaskService } from '../task.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  imports: [
    MatListModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})


export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private router: Router, private dialog: Dialog, public taskService: TaskService) {
    // get task list
    this.taskService.tasks.subscribe(data => this.tasks = data);
    this.taskService.getTaskList();

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
}
