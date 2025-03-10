import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TaskComponent } from '../task-item/task-item.component';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  imports: [MatListModule, TaskComponent, TaskCreateComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})


export class TaskListComponent {
  taskList : TaskComponent[] = [];
  taskService = inject(TaskService);

  constructor() {
    this.taskList = this.taskService.getTaskList();
  }
}
