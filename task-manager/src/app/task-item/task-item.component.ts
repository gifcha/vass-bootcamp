import { Component } from '@angular/core';

@Component({
  selector: 'app-task-item',
  imports: [],
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
