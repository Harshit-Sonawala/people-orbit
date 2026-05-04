import { SocialLinks } from "./";

export type People = {
  id: string;
  firstName: string;
  lastName: string;
  age?: number;
  designation: string;
  email: string;
  phone: string;
  bio?: string;
  skills?: string[];
  socialLinks: SocialLinks;
  profilePic?: string;
  bgImage?: string;
  createdOn: Date;
  updatedOn: Date;
};
