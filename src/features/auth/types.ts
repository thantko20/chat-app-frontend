export interface IRegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  handleName: string;
  password: string;
  profileImage?: any;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: string;
  profileImage: string;
  handleName: string;
}
