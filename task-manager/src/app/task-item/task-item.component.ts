import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-task-item',
  imports: [MatListModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskComponent {
  Title : string = ""
  Description : string = ""
  Type : string = ""
  CreatedOn : string = ""
  Satus : string = ""
}
