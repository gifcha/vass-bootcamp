import { Injectable } from '@angular/core';
import { Task } from './task.model';


@Injectable({
  providedIn: 'root'
})

export class TaskService {
  protected taskList: Task[] = [];

  getTaskList(): Task[] {
    return this.taskList;
  }

  addTask(task: Task) {
    this.taskList.push(task);
  }

  removeTaskById(id: number) {
    let index = this.taskList.findIndex((task) => task.id === id)
    this.taskList.splice(index, 1);
  }

  constructor() { }
}
