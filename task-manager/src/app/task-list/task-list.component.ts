import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TaskService } from '../task.service';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  imports: [MatListModule, TaskCreateComponent, MatCardModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})


export class TaskListComponent {
  taskList: Task[] = [];
  taskService = inject(TaskService);

  constructor() {
    this.taskList = this.taskService.getTaskList();
  }

  removeTaskById(id: number) {
    this.taskService.removeTaskById(id);
  }
}
