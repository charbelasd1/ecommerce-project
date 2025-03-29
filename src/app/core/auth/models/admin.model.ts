export interface IAdminUser extends firebase.default.User {
  isAdmin?: boolean;
}

export interface IAdminClaims {
  admin: boolean;
}

export interface IAdminResponse {
  success: boolean;
  message: string;
  user?: IAdminUser;
}