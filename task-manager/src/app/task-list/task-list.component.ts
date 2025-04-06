import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TaskService } from '../task.service';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../task.model';
import { MatButtonModule } from '@angular/material/button';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { routes } from '../app.routes';

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
  taskList: Task[] = [];
  taskService = inject(TaskService);

  private dialog = inject(Dialog);

  constructor(private router: Router) {
    this.taskList = this.taskService.getTaskList();
    if (this.router.url === '/task-create') {
      this.openCreateTask();
    }
  }

  removeTaskById(id: number) {
    this.taskService.removeTaskById(id);
  }

  openCreateTask() {
      let d = this.dialog.open(TaskCreateComponent);
      if (d.componentRef) {
          d.componentRef.instance.dialog = d;
      }
  }
}
