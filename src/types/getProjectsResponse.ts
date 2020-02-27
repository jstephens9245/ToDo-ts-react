import Account from "./account";
import { WorkOrder } from "./workOrder";

interface WorkOrderList {
  workOrders: WorkOrder[];
}

export type projectsListItem = Account & WorkOrderList;

export interface GetProjectsResponse {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  projectsList: projectsListItem[];
  projectsListSanitized?: projectsListItem[];
}
