export interface CurrentUser {
  name: string;
  email: string;
  id: number;
}

export interface AuthError {
  message: string;
  errors: {
    [key: string]: Array<string>;
  };
}
