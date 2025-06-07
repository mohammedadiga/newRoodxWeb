interface IUser {
  accountType: 'personal' | 'company';
  firstname: string;
  lastname: string;
  username: string;
  companyname: string;
  phone: string;
  email: string;
  password: string;
  cover: string;
  avatar: string;
  comparePassword(password: string): Promise<boolean>;
  role: string;
  birthday: string;
  date: string;
}
