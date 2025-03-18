export type Task = {
  id: number;
  title: string;
  type: string;
  description: string;
  status: string;
  createdOn: string;
}

// lastTaskId is temporary
// will be refactored when database is implemented
let lastTaskId = 0;

export function createTaskFromObj(valueObj: { title: string, type: string, description: string, status: string } ): Task {
  lastTaskId += 1;
  return {
    id: lastTaskId,
    title: valueObj.title,
    type: valueObj.type,
    description: valueObj.description,
    status: valueObj.status,
    createdOn: new Date().toLocaleDateString("en-GB"),
  }
}
