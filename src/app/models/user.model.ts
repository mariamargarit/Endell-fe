export class User{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  constructor(firstName: string, lastname: string, email: string, phoneNumber: string, password: string) {
      this.firstName = firstName;
      this.lastName = lastname;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.password = password;
  }
}