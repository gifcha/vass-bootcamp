export type Task = {
  id: string; // uuid4
  title: string;
  type: string;
  description: string;
  status: string;
  createdon: string;
  assignedto: string; // uuid4
}


export function createTaskFromObj(
  valueObj: {
    title: string,
    type: string,
    description: string,
    status: string ,
    assignedto: string
  }): Task {

    return {
      id: "",
      title: valueObj.title,
      type: valueObj.type,
      description: valueObj.description,
      status: valueObj.status,
      createdon: new Date().toLocaleDateString("en-GB"),
      assignedto: valueObj.assignedto
    }
  }
