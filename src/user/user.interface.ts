import { Document, ObjectId } from "mongoose";

export type UserPublicData = Readonly<{
  _id: ObjectId;
  name: string;
  bio: string;
  isCreator: boolean;
  socialLinks: {
    instagram: string;
    facebook: string;
    snapchat: string;
  };
  phoneNo: string;
  provider: string;
  profilePicture: string;
  coverPicture: string;
  email: string;
  isActive: boolean;
}>;

export type UserMethods = {
  getPublicData: () => UserPublicData;
};

export type User = Readonly<{
  _id: ObjectId;
  name: string;
  bio: string;
  isCreator: boolean;
  socialLinks: {
    instagram: string;
    facebook: string;
    snapchat: string;
  };
  phoneNo: string;
  provider: string;
  profilePicture: string;
  coverPicture: string;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: string;
  isActive: boolean;
  activationExpires: string;
  activationToken: string;
}> &
  UserMethods &
  Document;
