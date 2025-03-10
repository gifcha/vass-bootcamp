import { Component, inject, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-item',
  imports: [MatListModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})

export class TaskComponent {
  title = "";
  type = "";
  description : String = '';
  createdOn = Date();
  status = "";
}
