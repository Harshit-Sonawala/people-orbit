import { SocialLinks } from '.';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  age?: number;
  designation: string;
  email: string;
  phone: string;
  bio?: string;
  skills?: string[];
  socialLinks?: SocialLinks;
  profilePic?: string;
  bgImage?: string;
  createdOn: number;
  updatedOn: number;
};
