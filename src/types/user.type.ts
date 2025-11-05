export type TBlockStatus = "blocked" | "unblocked";

export type IUser = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImg: string;
  status: string;
};


export type TProfile = {
  name: string;
  email: string;
  image: string;
}

export type IUserDataSource = {
  key: number;
  serial: number;
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImg: string;
  status: string;
}


export type IBuyer = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: 'ACTIVE' | 'INACTIVE';
  address: string;
};

