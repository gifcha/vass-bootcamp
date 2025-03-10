import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { TaskService, Task} from '../task.service';

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
  titleInput = "";
  descriptionInput = "";
  typeInput = "";
  statusInput = "";

  taskService = inject(TaskService);

  createTask() {
    let task = new Task(this.titleInput, this.typeInput, this.descriptionInput, this.statusInput);
    this.taskService.addTask(task);
  }
}
