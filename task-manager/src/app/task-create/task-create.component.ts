import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { TaskComponent } from '../task-item/task-item.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss'
})

export class TaskCreateComponent {
  titleValue = "";
  descriptionValue = "Val";
  typeValue = "";
  statusValue = "";

  taskService = inject(TaskService);

  createTask() {
    this.taskService.addTask(this.descriptionValue);
  }
}
