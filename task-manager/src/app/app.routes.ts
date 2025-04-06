import { Routes } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  {
    path: 'task-create',
    component: TaskListComponent

  },
  { path: 'task-details', component: TaskDetailsComponent },
  {
    path: '',
    redirectTo: 'task-list',
    pathMatch: 'full'
  },
];
