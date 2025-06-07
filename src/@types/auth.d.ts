interface IAuth extends IUser {
  userInfo: string;
  userId: string;
  userToken: string;
  confirmPassword: string;
  maskedContact: string;
  token: string;
  activationToken: string | undefined;
  activationCode: string;
  message: string
}
