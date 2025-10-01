import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'task-list',
    component: TaskListComponent,
    canMatch: [authGuard]
  },
  {
    path: 'task-create',
    component: TaskListComponent,
    canMatch: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];
