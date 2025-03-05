import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskCreateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-manager';
}
