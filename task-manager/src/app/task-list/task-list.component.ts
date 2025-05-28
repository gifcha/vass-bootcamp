import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TaskService } from '../task.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private dialog: Dialog, public taskService: TaskService) {
    // get task list
    this.taskService.getTaskList().subscribe({
      next: (tasks) => {
        this.taskService.taskList = tasks;
      },

      error: (err) => {
        console.error("getTaskList failed: " + err.message)
      }
    });

    if (this.router.url === '/task-create') {
      this.openCreateTask();
    }
  }

  removeTaskById(id: string) {
    this.taskService.removeTaskById(id).subscribe({
      next: (res) => {
        let index = this.taskService.taskList.findIndex((task) => task.id === id)
        this.taskService.taskList.splice(index, 1);
      },

      error: (err) => {
        console.error("getTaskList failed: " + err.message)
      }
    });
  }

  openCreateTask() {
      let d = this.dialog.open(TaskCreateComponent);
      if (d.componentRef) {
          d.componentRef.instance.dialog = d;
      }
  }
}
