import { Step } from "../types/getWorkOrderResponse"

export interface WorkOrder {
  num: string;
  serviceType: string;
  date_requested: string;
  date_completed: string;
  steps: Step[];
  latestStepInProgress?: string;
  PWO?: string;
  address?: string;
  service_type_label?: "electric" | "gas";
}

export interface workOrderContactType {
  title: string;
  status: string;
  name?: string;
  email?: string;
  phone?: string;
}
export interface workOrderMeetingType {
  title: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  status: string;
}

export interface workOrderDocumentType {
  name: string;
  status: string;
}

export interface workOrderTaskType {
  task: string;
  name: string;
  status: string;
  duedate?: string;
}

export interface workOrderStepType {
  step_id: string;
  display_order: number;
  step_label: string;
  step_status: string;
  start_date: string;
  completed_date: string;
  typical_time_to_complete: string;
  display_to_user: string;
  last_updated: string;
  child_work_orders: any[];
  contacts?: workOrderContactType[]
  meeting?: workOrderMeetingType[]
  customer_documents?: {
    status: string;
    duedate: string;
    document: workOrderDocumentType[];
  }
  deliverables?: {
    status: string;
    document: workOrderDocumentType[]
  }
  tasks?: workOrderTaskType[]

}
export interface workOrderTwoPointOhType {
  NCC_service_info: string;
  NCC_service_version: string;
  PWO: string;
  address: string;
  serviceOrder: string;
  service_type_id: string;
  service_type_label: string;
  sub_service_type_id: string;
  sub_service_type_label: string;
  date_requested: string;
  steps: any[]; //workOrderStepType[]
}