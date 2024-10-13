export type UserDto = {
  id: string;
  photo: string;
  names: string;
  username: string;
  numberWhatsapp: string;
  about: string;
  createdAt: string;
}

export type UserRegisterRequestDto = {
  names: string;
  username: string;
  password: string;
}

export type UserLoginRequestDto = {
  username: string;
  password: string;
}

export type AccessToken = {
  accessToken: string;
}