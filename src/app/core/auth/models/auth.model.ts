

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    emailVerified: boolean;
  };
  token: string;
}

export interface iSignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface iSignUpResponse {
  user: {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    emailVerified: boolean;
  };
}


