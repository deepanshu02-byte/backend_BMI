export type TRoles = "admin" | "user";

export type TCreateUserBody = {
  name: string;
  email: string;
  password: string;
  role: TRoles;
  mobileNumber: string;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: TRoles;
  mobileNumber: string;
};

export type TUserLoginBody = {
  email: string;
  password: string;
};
