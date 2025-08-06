import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { createTaskFromObj, Task } from '../task.model';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../task.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-details',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {

  isEditMode = false;
  users$: Observable<User[]>;

  formBuilder = new FormBuilder().nonNullable;
  taskDetailsForm = new FormGroup({
      title: this.formBuilder.control("", Validators.required),
      description: this.formBuilder.control("", Validators.required),
      type: this.formBuilder.control("", Validators.required),
      status: this.formBuilder.control("", Validators.required),
      assignedTo: this.formBuilder.control("")
    });

  constructor(
    public dialogRef: DialogRef<TaskDetailsComponent>,
    @Inject(DIALOG_DATA) public data: {task: Task, user: User | undefined},
    public userService: UserService,
    public taskService: TaskService
  )
  {
    this.users$ = this.userService.users$;

    let assignedTo = "";
    if (data.user) { // if there is an assignedUser
      assignedTo = data.user.id;
    }

    // set initial detail values
    this.taskDetailsForm.setValue({
      title: data.task.title,
      description: data.task.description,
      type: data.task.type,
      status: data.task.status,
      assignedTo: assignedTo
    })

  }

  toggleEditing() {
    this.isEditMode = !this.isEditMode;
  }

  updateTask(id: string) {
    if (this.taskDetailsForm.valid) {
      let values = this.taskDetailsForm.getRawValue()
      let task: Task = createTaskFromObj(values);
      task.id = id;

      this.taskService.updateTask(task);

      this.dialogRef.close();
    }
  }

}
