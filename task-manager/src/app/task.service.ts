import { Injectable } from '@angular/core';
import { TaskComponent } from './task-item/task-item.component';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  protected taskList : TaskComponent[] = [];

  getTaskList() : TaskComponent[] {
    return this.taskList;
  }

  addTask(desc : string) {
    let task = new TaskComponent();
    task.description = desc;
    this.taskList.push(task);
  }

  constructor() { }
}
