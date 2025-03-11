import { Component, inject } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../task.service';
import { Task, createTask } from '../task.module';

@Component({
  selector: 'app-task-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss'
})

export class TaskCreateComponent {
  titleInput = new FormControl("");
  descriptionInput = new FormControl("");
  typeInput = new FormControl("");
  statusInput = new FormControl("");

  taskService = inject(TaskService);

  createTask() {
    let task : Task = createTask(
      this.titleInput.value!,
      this.typeInput.value!,
      this.descriptionInput.value!,
      this.statusInput.value!
    );

    this.taskService.addTask(task);
  }
}
