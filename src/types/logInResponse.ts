export interface LogInResponse {
  user: User;
  accessToken: AccessToken;
}
export interface User {
  uid: string;
  id: string;
  profileName: string;
  displayName: string;
  // TODO: convert this into a union of possible values
  type: string;
  numberOfActiveAccounts: string;
  isConstructionAccount?: string;
  numberOfActiveConstructionAccounts?: string;
}
export interface AccessToken {
  webSecurityToken: string;
  webSecurityTokenExpiry: string;
}
