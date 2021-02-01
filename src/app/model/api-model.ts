export interface ChangeAccountStatusRequest {
  id: string;
}

export interface Account {
  id: string;
  login: string;
  email: string;
  active: boolean;
  version: number;
}

export interface EditAccountData {
  id: string;
  email: string;
  version: number;
}

export interface AccountDetailsForList {
  id: string;
  name: string;
  surname: string;
  email: string;
  login: string;
  active: boolean;

}

export interface GetAccountsResponse {
  accounts: AccountDetailsForList[];
}

export interface PersonalData {
  id: string;
  name: string;
  surname: string;
  birthDate: Date;
  version: number;
}

export interface Address {
  id: string;
  city: string;
  street: string;
  houseNumber: number;
  version: number;
}

export interface AccountDetails {
  account: Account;
  personalData: PersonalData;
  address: Address;
}

export interface SignUp {
  login: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  birthDate: Date;
  city: string;
  street: string;
  houseNumber: number;
}

export interface SignIn {
  login: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  type: string;
  id: string;
  login: string;
  email: string;
  roles: string[];
}

export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_DRIVER = 'ROLE_DRIVER',
  ROLE_ADMIN = 'ROLE_ADMIN'
}

export interface NavLink {
  label: string;
  link: string;
  forRoles: Role[];
}

export interface ChangePasswordRequest {
  accountId: string;
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

export interface ChangePasswordAsAdminRequest {
  accountId: string;
  password: string;
  repeatPassword: string;
}

export interface ConfirmAccountRequest {
  token: string;
}

export interface SendResetPasswordEmailRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  repeatPassword: string;
}

export interface VerifyResetPasswordTokenRequest {
  token: string;
}

export interface GetAccountsSearchCriteriaRequest {
  searchCriteria: string;
}

export interface UpdateVehicleRequest {
  id: string;
  model: string;
  brand: string;
  productionYear: number;
  numberOfSeats: number;
  description: string;
  version: number;
}

export interface VehicleDetailsToUpdateResponse {
  id: string;
  model: string;
  brand: string;
  productionYear: number;
  numberOfSeats: number;
  description: string;
  version: number;
}

export interface VehicleDetailsForList {
  id: string;
  brand: string;
  model: string;
}

export interface VehicleAssignedToAccountResponse {
  vehicles: VehicleDetailsForList[];
}

export interface CreateVehicleRequest {
  brand: string;
  model: string;
  productionYear: number;
  description: string;
  numberOfSeats: number;
}

