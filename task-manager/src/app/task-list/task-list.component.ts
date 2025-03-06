import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TaskComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  imports: [MatListModule, TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

}
