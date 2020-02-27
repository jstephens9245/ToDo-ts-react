import { AccessLevel } from "./accessLevel";

export default interface Project {
  projectId?: string;
  projectID?: string;
  premiseID?: string;
  premiseId?: string;
  operation?: string;
  projectName?: string;
  projectAddress: string;
  userRole: string;
  className?: string;

  // This is an optional type because we are not sure if we will have this property or not
  // and making it optional prevents more refactoring once we reach that decision
  // TODO: make this required if this property is part of the data contract
  completionDate?: string;
}
