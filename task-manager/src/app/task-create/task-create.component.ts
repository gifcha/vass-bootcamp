import { Component, inject } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../task.service';
import { Task, createTaskFromObj } from '../task.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-task-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss'
})

export class TaskCreateComponent {
  showValidatorError = false;

  taskCreateForm = new FormGroup({
    title: new FormControl("", {nonNullable: true}),
    description: new FormControl("", {nonNullable: true}),
    type: new FormControl("", {nonNullable: true}),
    status: new FormControl("", {nonNullable: true})
  });


  taskService = inject(TaskService);

  createTask() {
    if (this.taskCreateForm.valid) {
      let values = this.taskCreateForm.getRawValue();
      let task: Task = createTaskFromObj(values);
      this.taskService.addTask(task);

      this.showValidatorError = false;
    }
    else {
      this.showValidatorError = true;
    }
  }

  constructor() {
    this.taskCreateForm.addValidators(Validators.required)
  }

}

