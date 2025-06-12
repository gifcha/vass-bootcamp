export type Task = {
  id: string;
  title: string;
  type: string;
  description: string;
  status: string;
  createdOn: string;
}


export function createTaskFromObj(valueObj: { title: string, type: string, description: string, status: string } ): Task {
  return {
    id: "",
    title: valueObj.title,
    type: valueObj.type,
    description: valueObj.description,
    status: valueObj.status,
    createdOn: new Date().toLocaleDateString("en-GB"),
  }
}
