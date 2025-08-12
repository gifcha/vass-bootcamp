export type Task = {
  id: string; // uuid4
  title: string;
  type: string;
  description: string;
  status: string;
  createdOn: string;
  assignedTo: string; // uuid4
}


export function createTaskFromObj(
  valueObj: {
    title: string,
    type: string,
    description: string,
    status: string ,
    assignedTo: string
  }): Task {

    return {
      id: "",
      title: valueObj.title,
      type: valueObj.type,
      description: valueObj.description,
      status: valueObj.status,
      createdOn: new Date().toISOString(),
      assignedTo: valueObj.assignedTo
    }
  }
