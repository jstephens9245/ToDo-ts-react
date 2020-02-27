// eslint-disable-next-line import/prefer-default-export
export type StepStatus =
  | "Not Started"
  | "In Progress"
  | "Completed"
  | "Not Required"
  | "Cancelled"
  | "On Hold";

export interface Step {
  step_id                       : string;
  step_status                   : string;
  display_order                 : number;
  step_label                    : string;
  typical_time_to_complete      : string;
  completed_date                : string;
  start_date                    : string;
  last_updated                  : string;
  contacts                      : any[];
  meeting                       : any[];
  customer_documents            : any;
  deliverables                  : any;
  customer_approval_and_payments: any;
  tasks                         : any;
}