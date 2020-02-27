import { AccessLevel } from "./accessLevel";
import { WorkOrder } from "./workOrder";

export interface ProjectListItemProps {
  projectAddress: string;
  projectID?: string;
  projectName?: string;
  userRole: AccessLevel;
  electricNum?: string;
  gasNum?: string;
  selected?: boolean;
  workOrders?: WorkOrder[];
  premiseID?: string;
  operation?: string;
  premiseId?: string;
}
