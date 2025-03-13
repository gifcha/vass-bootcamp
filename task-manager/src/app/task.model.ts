export type Task = {
  id : number;
  title : string | null;
  type : string | null;
  description : string | null;
  status : string | null;
  createdOn : string | null;
}

// lastTaskId is temporary
// will be refactored when database is implemented
let lastTaskId = 0;

export function createTask(title : string | null, type : string | null, description : string | null, status : string | null) : Task {
  lastTaskId += 1;
  return {
    id: lastTaskId,
    title,
    type,
    description,
    status,
    createdOn: new Date().toLocaleDateString("en-GB"),
  }
}
