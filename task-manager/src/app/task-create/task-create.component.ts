import { Component, inject } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../task.service';
import { Task, createTask } from '../task.model';

@Component({
  selector: 'app-task-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss'
})

export class TaskCreateComponent {
  taskCreateForm = new FormGroup({
    title : new FormControl(""),
    description : new FormControl(""),
    type : new FormControl(""),
    status : new FormControl("")
  });

  taskService = inject(TaskService);

  formHasEmptyFields() : boolean {
    for (const field in this.taskCreateForm.controls) { // field is a string
      const control = this.taskCreateForm.get(field);
      if (control !== null && (control.value === null || control.value === "")) { // control !== null seems to be redundant but IDE complains
        return true;
      }
    }

    return false;
  }

  createTask() {
    if (this.formHasEmptyFields() === false) {
      let task : Task = createTask(
        this.taskCreateForm.controls.title.value,
        this.taskCreateForm.controls.type.value,
        this.taskCreateForm.controls.description.value,
        this.taskCreateForm.controls.status.value
      );

      this.taskService.addTask(task);
    }
    else {
      alert("Please fill in all fields");
    }
  }

}

