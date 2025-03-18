import { Component, inject } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../task.service';
import { Task, createTaskFromObj } from '../task.model';

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
  taskCreateForm = new FormGroup({
    title: new FormControl("", {nonNullable: true}),
    description: new FormControl("", {nonNullable: true}),
    type: new FormControl("", {nonNullable: true}),
    status: new FormControl("", {nonNullable: true})
  });

  taskService = inject(TaskService);

  createTask() {
    let values : any = this.taskCreateForm.getRawValue();
    let task: Task = createTaskFromObj(values);

    this.taskService.addTask(task);
  }

}

