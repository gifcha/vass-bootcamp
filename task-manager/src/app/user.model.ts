export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}


export function createUserFromObj(valueObj: { username: string, firstName: string, lastName: string } ): User {
  return {
    id: "",
    username: valueObj.username,
    firstName: valueObj.firstName,
    lastName: valueObj.lastName,
  }
}
