import { Routes } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

export const routes: Routes = [
  { path: 'task-create', component: TaskCreateComponent },
  { path: 'task-list', component: TaskListComponent },
  { path: 'task-details', component: TaskDetailsComponent },
];
