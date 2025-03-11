import { Injectable } from '@angular/core';

export class Task {
  static lastTaskId = 0;
  id : number;
  title : string;
  type : string;
  description : string;
  status : string;
  createdOn : string;

  constructor(title = "", type = "", description = "", status = "") {
    this.title = title;
    this.type = type;
    this.description = description;
    this.status = status;
    this.createdOn = (new Date()).toLocaleDateString('en-GB');
    Task.lastTaskId += 1;
    this.id = Task.lastTaskId;
  }
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  protected taskList : Task[] = [];

  getTaskList() : Task[] {
    return this.taskList;
  }

  addTask(task : Task) {
    this.taskList.push(task);
  }

  removeTask(id : number) {
    let index = this.taskList.findIndex(function(task) {
      return task.id == id;
    })
    this.taskList.splice(index, 1);
  }

  constructor() { }
}
