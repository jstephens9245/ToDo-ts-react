import { AccessLevel } from "./accessLevel";

export default interface Account {
  projectID?: string;
  premiseID?: string;
  projectName?: string;
  projectAddress: string;
  userRole: AccessLevel;
}
