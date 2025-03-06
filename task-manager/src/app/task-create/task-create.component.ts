import { Component, input, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-task-create',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, TaskListComponent, FormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss'
})
export class TaskCreateComponent {
  titleValue = "";
  descriptionValue = "";
  typeValue = "";
  createdOnValue = new Date("2000 January 1");
  statusValue = "";

  createTask() {
    // {{Title}} {{...}} {{...}}

  }
}
